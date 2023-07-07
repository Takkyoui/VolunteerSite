import Review from "../models/reviewModel.js";

const getAllContent = async () => {
  try {
    const content = await Review.find()
      .populate("userId", ["name"])
      .sort({ createdAt: -1 });
    return content;
  } catch (error) {
    throw new Error("Failed to fetch review content");
  }
};

const getSpecificContent = async (id) => {
  try {
    const content = await Review.findById(id).populate("userId", ["name"]);
    if (content) {
      return content;
    } else {
      throw new Error("Content not found");
    }
  } catch (error) {
    throw new Error("Failed to fetch specific review content");
  }
};

const createContent = async (title, content, image, userId) => {
  try {
    const newContent = await Review.create({
      title,
      content,
      image,
      userId,
    });
    return newContent;
  } catch (error) {
    throw new Error("Failed to create review content");
  }
};

const updateContent = async (id, title, image, content) => {
  try {
    const updatedContent = await Review.findByIdAndUpdate(
      { _id: id },
      { title, content, image },
      { new: true }
    );
    return updatedContent;
  } catch (error) {
    throw new Error("Failed to update review content");
  }
};

const deleteContent = async (id) => {
  try {
    const deletedContent = await Review.findByIdAndDelete(id);
    return deletedContent;
  } catch (error) {
    throw new Error("Failed to delete review content");
  }
};

const searchContent = async (keyword) => {
  try {
    const regex = new RegExp(keyword, "i");

    const searchResults = await Review.find({
      $or: [{ title: regex }, { content: regex }],
    });

    return searchResults;
  } catch (error) {
    image;
    throw new Error("Failed to search content");
  }
};
const getMyPosts = async (userId) => {
  try {
    const userPosts = await Review.find({ userId })
      .populate("userId", ["name"])
      .sort({ createdAt: -1 });
    return userPosts;
  } catch (error) {
    throw new Error("Failed to fetch user's review posts");
  }
};
const getCounts = async () => {
  try {
    return await Review.countDocuments();
  } catch (error) {
    throw new Error("Failed to fetch user's posts");
  }
};

const reviewService = {
  getAllContent,
  getSpecificContent,
  createContent,
  updateContent,
  deleteContent,
  searchContent,
  getMyPosts,
  getCounts,
};
export default reviewService;
