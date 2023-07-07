import { CommunityComment } from "../models/communityCommentModel.js";
import { ReviewComment } from "../models/reviewCommentModel.js";
import { VolunteerComment } from "../models/volunteerCommentModel.js";

const commentService = {
  async createComment(commentData, userId) {
    let commentModel;

    switch (commentData.path) {
      case "volunteer":
        commentModel = VolunteerComment;
        break;
      case "review":
        commentModel = ReviewComment;
        break;
      case "community":
        commentModel = CommunityComment;
        break;
      default:
        throw new Error("Invalid comment type");
    }
    const { comment, id } = commentData;
    return await commentModel.create({
      content: comment,
      userId,
      postId: id,
    });
  },

  async deleteComment(commentId, commentType) {
    let commentModel;
    switch (commentType) {
      case "volunteer":
        commentModel = VolunteerComment;
        break;
      case "review":
        commentModel = ReviewComment;
        break;
      case "community":
        commentModel = CommunityComment;
        break;
      default:
        throw new Error("Invalid comment type");
    }

    return commentModel.findByIdAndDelete(commentId);
  },

  async getComments(commentType, id) {
    let commentModel;
    switch (commentType) {
      case "volunteer":
        commentModel = VolunteerComment;
        break;
      case "review":
        commentModel = ReviewComment;
        break;
      case "community":
        commentModel = CommunityComment;
        break;
      default:
        throw new Error("Invalid comment type");
    }

    return commentModel
      .find({ postId: id })
      .populate("userId", ["name"])
      .sort({ createdAt: -1 });
  },
};

export default commentService;
