import mongoose from "mongoose";

const { Schema } = mongoose;

const communitySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      maxlength: 400,
    },
    image: {
      type: Array,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
