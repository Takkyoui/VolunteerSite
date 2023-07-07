import reviewService from "./reviewService.js";

const getAllContent = async (req, res) => {
  try {
    const content = await reviewService.getAllContent();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSpecificContent = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await reviewService.getSpecificContent(id);
    if (content) {
      res.status(200).json(content);
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createContent = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user._id;

  const files = req.files || [];
  const image = files.map((file) => {
    return `${file.path}`.replace("public/", "");
  });

  try {
    const newContent = await reviewService.createContent(
      title,
      content,
      image,
      userId
    );
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateContent = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const files = req.files || [];
  const image = files.map((file) => {
    return `${file.path}`.replace("public/", "");
  });

  try {
    const updatedContent = await reviewService.updateContent(
      id,
      title,
      image,
      content
    );
    if (updatedContent) {
      res.status(200).json(updatedContent);
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteContent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContent = await reviewService.deleteContent(id);
    if (deletedContent) {
      res.status(200).json({ message: "Content deleted" });
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const searchContent = async (req, res) => {
  try {
    const { keyword } = req.query;

    const searchResults = await reviewService.searchContent(keyword);

    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to search content" });
  }
};
const getMyPosts = async (req, res) => {
  const userId = req.user._id;

  try {
    const userPosts = await reviewService.getMyPosts(userId);
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const getCounts = async (req, res) => {
  try {
    const count = await reviewService.getCounts();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

const reviewController = {
  getAllContent,
  getSpecificContent,
  createContent,
  searchContent,
  updateContent,
  deleteContent,
  getMyPosts,
  getCounts,
};

export default reviewController;
