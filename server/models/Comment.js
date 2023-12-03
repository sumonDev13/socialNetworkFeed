import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    }
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema)
export default Comment;