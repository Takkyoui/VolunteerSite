// commentController.js

import commentService from "./commnetService.js";

const commentController = {
  async createComment(req, res) {
    try {
      const commentData = req.body;
      const userId = req.user._id;
      const comment = await commentService.createComment(commentData, userId);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;
      const commentType = req.query.commentType;
      await commentService.deleteComment(commentId, commentType);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getComments(req, res) {
    try {
      const id = req.query.id;
      const commentType = req.query.commentType;
      const comments = await commentService.getComments(commentType, id);

      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default commentController;
