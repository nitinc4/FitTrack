import cspConfig from '../../config/csp.js';

const generateCspString = (directives) => {
  return Object.entries(directives)
    .map(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        return `${key} ${value.join(' ')}`;
      }
      return null;
    })
    .filter(Boolean)
    .join('; ');
};

const cspMiddleware = (req, res, next) => {
  const cspString = generateCspString(cspConfig.directives);
  res.setHeader('Content-Security-Policy', cspString);
  next();
};

export default cspMiddleware;