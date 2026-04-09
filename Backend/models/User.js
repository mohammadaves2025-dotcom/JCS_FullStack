import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["super-admin", "counselor", "student"],
            default: "student"
        },
        // If the user is a student/parent, link them to their CRM profile
        clientProfileId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" }
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    // 🚨 THIS LINE IS THE FIX
    if (!this.isModified("password")) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// Method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);