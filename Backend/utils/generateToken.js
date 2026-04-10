import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set secure cookie (works for same-domain)
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,        // Required for HTTPS (Vercel)
    sameSite: 'none',    // Required for cross-domain cookies
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Return token so the controller can send it in the JSON response
  // (frontend stores it for Authorization: Bearer fallback)
  return token;
};

export default generateToken;