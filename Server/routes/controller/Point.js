import mongoose from "mongoose";
import users from '../models/auth.js';

export const updatePoints = async (req, res) => {
    const { id: _id } = req.params;
    const { points } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User not found");
    }

    try {
        const updatedUser = await users.findByIdAndUpdate(
            _id,
            { $inc: { points } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
