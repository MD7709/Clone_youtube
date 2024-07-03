import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    channelName: { type: String },
    channelId: { type: String },
    points: { type: Number, default: 0 },
    joinedOn: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

export default User;
