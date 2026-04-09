import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const cleanReset = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    
    const email = "admin@jamiaconsultancy.com";
    const rawPass = "GodLevelPassword123";
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPass, salt);

    // We use findOneAndUpdate to bypass the .save() middleware just in case
    await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { 
            password: hashedPassword,
            role: 'super-admin'
        },
        { upsert: true, new: true }
    );

    console.log("🚀 DATABASE SYNCHRONIZED.");
    console.log("Email: admin@jamiaconsultancy.com");
    console.log("Password: GodLevelPassword123");
    process.exit();
};

cleanReset();