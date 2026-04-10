// createAdmin.js
// Run with: node createAdmin.js
// PURPOSE: Creates or resets the super-admin account.
// The User model's pre('save') hook handles password hashing automatically.
// DO NOT manually bcrypt.hash() here — that causes double-hashing → login always fails.

import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
    if (!process.env.MONGO_URI) {
        console.error("❌ MONGO_URI is not defined in your .env file. Aborting.");
        process.exit(1);
    }

    if (!process.env.ADMIN_PASSWORD) {
        console.error("❌ ADMIN_PASSWORD is not defined in your .env file. Aborting.");
        console.error("   Add ADMIN_PASSWORD=YourSecurePassword to your .env file.");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("📡 Connected to MongoDB...");

        const adminEmail = process.env.ADMIN_EMAIL;
        const plainPassword = process.env.ADMIN_PASSWORD;

        const existingUser = await User.findOne({ email: adminEmail });

        if (existingUser) {
            console.log("⚠️  Admin already exists. Updating password and role...");
            // ✅ Assign plain password — pre('save') hook hashes it automatically
            existingUser.password = plainPassword;
            existingUser.role = "super-admin";
            await existingUser.save();
        } else {
            console.log("✨ Creating new Super Admin...");
            // ✅ Pass plain password — User.create() triggers pre('save') which hashes it
            await User.create({
                name: "Master Admin",
                email: adminEmail,
                password: plainPassword,
                role: "super-admin",
            });
        }

        console.log("✅ Admin access synchronized. You can now login.");
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Password: (as set in ADMIN_PASSWORD env var)`);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB.");
        process.exit(0);
    }
};

createAdmin();
