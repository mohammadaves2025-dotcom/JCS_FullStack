// createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js'; // Ensure this path is correct
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("📡 Connected to MongoDB...");

        const adminEmail = "admin@jamiaconsultancy.com";
        const plainPassword = "GodLevelPassword123";

        // Check if user exists
        const existingUser = await User.findOne({ email: adminEmail });

        if (existingUser) {
            console.log("⚠️ Admin already exists. Updating password and role...");
            const salt = await bcrypt.genSalt(10);
            existingUser.password = await bcrypt.hash(plainPassword, salt);
            existingUser.role = "super-admin"; // Matching your Enum
            await existingUser.save();
        } else {
            console.log("✨ Creating new God-Level Admin...");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(plainPassword, salt);

            await User.create({
                name: "Master Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "super-admin"
            });
        }

        console.log("✅ Admin access synchronized. You can now login.");
        process.exit();
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

createAdmin();