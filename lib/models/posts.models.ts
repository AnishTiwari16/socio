import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: String,
    },

    //this is recursion
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts',
        },
    ],
});

const Posts = mongoose.models.Posts || mongoose.model('Posts', postsSchema);

export default Posts;
