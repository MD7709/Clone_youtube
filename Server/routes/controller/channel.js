import mongoose from 'mongoose';
import User from '../models/auth.js';

export const updateChannelData = async (req, res) => {
    const { id: _id } = req.params;
    const { channelName, channelId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User not found");
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { channelName, channelId },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updatePoints = async (req, res) => {
    const { id: _id } = req.params;
    const { points } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User not found");
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { $inc: { points } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
