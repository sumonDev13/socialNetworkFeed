import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true,
  },
  desc: {
      type: String,
      required: true,
      min: 10,
      max: 100,
  },
  imageUrl: {
      type: String,
      required: true,
  },
  likes: {
      type: Array,
      default: []
  }
}, { timestamps: true });



const Post = mongoose.model("Post", PostSchema);

export default Post;
