import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // 🚨 This is where it was crashing because 'res' was undefined
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,           // 🟢 REQUIRED for Vercel (forces HTTPS)
    sameSite: 'none',       // 🟢 REQUIRED for Cross-Domain cookies
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
};

export default generateToken;