import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required: true,
            trim: true
        },
    description: {
      type: String,
      required: true,
      trim: true
    },
    researchField: {
        type: String,
        required: true,
        trim: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Project', projectSchema);