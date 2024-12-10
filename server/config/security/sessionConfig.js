const isDevelopment = process.env.NODE_ENV !== 'production';

const sessionConfig = (mongoStore) => ({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: mongoStore,
  cookie: {
    secure: !isDevelopment,
    sameSite: isDevelopment ? 'lax' : 'none',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true
  }
});

export default sessionConfig;