import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    // ✅ Guard: crash loudly if JWT_SECRET is missing rather than issuing an insecure token
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not defined.");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // Set secure cookie (same-domain)
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // ✅ Allow non-HTTPS in local dev
        sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Return token so controller can send it as Bearer fallback
    return token;
};

export default generateToken;
