import Community from "../models/communityModel.js";

const getAllContent = async () => {
  try {
    const content = await Community.find()
      .populate("userId", ["name"])
      .sort({ createdAt: -1 });
    return content;
  } catch (error) {
    throw new Error("Failed to fetch community content");
  }
};

const getSpecificContent = async (id) => {
  try {
    const content = await Community.findById(id).populate("userId", [
      "name",
      "_id",
    ]);
    if (content) {
      return content;
    } else {
      throw new Error("Content not found");
    }
  } catch (error) {
    throw new Error("Failed to fetch specific community content");
  }
};

const createContent = async (title, content, image, userId) => {
  try {
    const newContent = await Community.create({
      title,
      content,
      image,
      userId,
    });
    return newContent;
  } catch (error) {
    throw new Error("Failed to create community content");
  }
};

const updateContent = async (id, title, content, image) => {
  try {
    const updatedContent = await Community.findByIdAndUpdate(
      { _id: id },
      { title, content, image },
      { new: true }
    );
    return updatedContent;
  } catch (error) {
    throw new Error("Failed to update community content");
  }
};

const deleteContent = async (id) => {
  try {
    const deletedContent = await Community.findByIdAndDelete(id);
    return deletedContent;
  } catch (error) {
    throw new Error("Failed to delete community content");
  }
};

const searchContent = async (keyword) => {
  try {
    const regex = new RegExp(keyword, "i");

    const searchResults = await Community.find({
      $or: [{ title: regex }, { content: regex }],
    }).sort({ createdAt: -1 });

    return searchResults;
  } catch (error) {
    throw new Error("Failed to search content");
  }
};

const getMyPosts = async (userId) => {
  try {
    const myPosts = await Community.find({ userId })
      .populate("userId", ["name", "_id"])
      .sort({ createdAt: -1 });
    return myPosts;
  } catch (error) {
    throw new Error("Failed to fetch user's posts");
  }
};
const getCounts = async () => {
  try {
    return await Community.countDocuments();
  } catch (error) {
    throw new Error("Failed to fetch user's posts");
  }
};

const communityService = {
  getCounts,
  getAllContent,
  getSpecificContent,
  createContent,
  updateContent,
  deleteContent,
  searchContent,
  getMyPosts,
};

export default communityService;
