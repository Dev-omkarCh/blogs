import mongoose from "mongoose";
/*
        id: 1,
        fullName: "Omkar Chikhale",
        username: "omkar",
        email: "omkar@gmail.com",
        password: "123",
        role : "ADMIN",
        gender: "male",
        bio : "Hello I am Omkar",
        profileImage : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*100)}.jpg`,
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString(),
*/
const userSchema = new mongoose.Schema({
    fullName: String,
    username: { type: String, unique: true, required: true },
    email : { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["ADMIN", "AUTHOR", "READER"],
        default: "READER",
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    bio: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    refreshTokens: [{
        tokenHash: String,
        expiresAt: Number,
    }],
}, { timestamps : true });

// Apply a transformation function to the schema
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();

    // 🚨 Remove the sensitive fields from the object copy
    delete userObject.password;
    delete userObject.refreshTokens; // <--- This line removes the array

    return userObject;
};
export const User = mongoose.model("Users", userSchema);