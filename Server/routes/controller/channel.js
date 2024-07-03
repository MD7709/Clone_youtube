import mongoose from 'mongoose';
import users from '../models/auth.js';

export const updateChannelData = async (req, res) => {
    const { id: _id } = req.params;
    const { channelName, channelId } = req.body;

    console.log('Received ID:', _id);
    console.log('Received Data:', { channelName, channelId });

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Channel Unavailable");
    }

    try {
        const updateData = await users.findByIdAndUpdate(
            _id,
            {
                $set: {
                    'channelName': channelName,
                    'channelId': channelId
                }
            },
            { new: true }
        );

        if (!updateData) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(updateData);
    } catch (error) {
        console.log('Update Error:', error);
        res.status(500).json({ message: error.message });
    }
};
