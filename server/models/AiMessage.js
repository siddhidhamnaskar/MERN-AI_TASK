import mongoose from "mongoose";

const aiMessageSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AiMessage", aiMessageSchema);
