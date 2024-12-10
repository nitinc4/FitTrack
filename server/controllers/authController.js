import { generateAuthenticationOptions, generateRegistrationOptions, verifyAuthenticationResponse, verifyRegistrationResponse } from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import User from '../models/User.js';
import { webAuthnConfig, authenticatorSelection } from '../config/webauthn.js';

export const generateRegistrationChallenge = async (req, res) => {
  try {
    const { googleId } = req.params;
    const user = await User.findOne({ googleId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const options = await generateRegistrationOptions({
      rpName: webAuthnConfig.rpName,
      rpID: webAuthnConfig.rpID,
      userID: googleId,
      userName: user.email,
      attestationType: 'none',
      authenticatorSelection,
    });

    // Store challenge in session
    req.session.currentChallenge = options.challenge;
    await req.session.save();

    res.json(options);
  } catch (error) {
    console.error('Error generating registration challenge:', error);
    res.status(500).json({ error: 'Failed to generate registration challenge' });
  }
};

export const verifyRegistration = async (req, res) => {
  try {
    const { googleId } = req.params;
    const { credential } = req.body;
    const expectedChallenge = req.session.currentChallenge;
    
    if (!expectedChallenge) {
      return res.status(400).json({ error: 'Challenge not found in session' });
    }

    const user = await User.findOne({ googleId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge,
      expectedOrigin: webAuthnConfig.expectedOrigin,
      expectedRPID: webAuthnConfig.rpID,
    });

    if (verification.verified) {
      const { credentialID, credentialPublicKey, counter } = verification.registrationInfo;

      user.authenticator = {
        credentialID: Buffer.from(credentialID),
        credentialPublicKey: Buffer.from(credentialPublicKey),
        counter,
        transports: credential.transports || [],
      };
      user.mfaEnabled = true;
      await user.save();

      // Clear the challenge from session
      req.session.currentChallenge = null;
      await req.session.save();

      res.json({ verified: true });
    } else {
      res.status(400).json({ error: 'Verification failed' });
    }
  } catch (error) {
    console.error('Error verifying registration:', error);
    res.status(500).json({ error: 'Failed to verify registration' });
  }
};

export const generateAuthenticationChallenge = async (req, res) => {
  try {
    const { googleId } = req.params;
    const user = await User.findOne({ googleId });

    if (!user?.authenticator?.credentialID) {
      return res.status(404).json({ error: 'No authenticator found for user' });
    }

    const options = await generateAuthenticationOptions({
      rpID: webAuthnConfig.rpID,
      allowCredentials: [{
        id: user.authenticator.credentialID,
        type: 'public-key',
        transports: user.authenticator.transports,
      }],
      userVerification: 'preferred',
    });

    // Store challenge in session
    req.session.currentChallenge = options.challenge;
    await req.session.save();

    res.json(options);
  } catch (error) {
    console.error('Error generating authentication challenge:', error);
    res.status(500).json({ error: 'Failed to generate authentication challenge' });
  }
};

export const verifyAuthentication = async (req, res) => {
  try {
    const { googleId } = req.params;
    const { credential } = req.body;
    const expectedChallenge = req.session.currentChallenge;

    if (!expectedChallenge) {
      return res.status(400).json({ error: 'Challenge not found in session' });
    }

    const user = await User.findOne({ googleId });
    if (!user?.authenticator) {
      return res.status(404).json({ error: 'No authenticator found for user' });
    }

    const verification = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge,
      expectedOrigin: webAuthnConfig.expectedOrigin,
      expectedRPID: webAuthnConfig.rpID,
      authenticator: {
        credentialID: user.authenticator.credentialID,
        credentialPublicKey: user.authenticator.credentialPublicKey,
        counter: user.authenticator.counter,
      },
    });

    if (verification.verified) {
      user.authenticator.counter = verification.authenticationInfo.newCounter;
      await user.save();

      // Clear the challenge from session
      req.session.currentChallenge = null;
      await req.session.save();

      res.json({ verified: true });
    } else {
      res.status(400).json({ error: 'Verification failed' });
    }
  } catch (error) {
    console.error('Error verifying authentication:', error);
    res.status(500).json({ error: 'Failed to verify authentication' });
  }
};