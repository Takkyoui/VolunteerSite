import Volunteer from "../models/volunteerModel.js";

const volunteerService = {
  getAllVolunteers: async () => {
    return await Volunteer.find()
      .populate("userId", ["name", "email"])
      .sort({ createdAt: -1 });
  },
  getMyRegisterPosts: async (userId) => {
    const volunteerPots = await Volunteer.find({ userId })
      .populate("userId", ["name"])
      .populate("registeredUsers")
      .sort({ createdAt: -1 });
    return volunteerPots;
  },

  getVolunteerById: async (volunteerId) => {
    return await Volunteer.findById(volunteerId).populate("userId", [
      "name",
      "selfIntro",
    ]);
  },

  createVolunteer: async ({
    title,
    content,
    category,
    recruitmentPeriod,
    volunteerStartDate,
    volunteerEndDate,
    recruitmentLimit,
    location,
    userId,
    image,
  }) => {
    recruitmentLimit = Number(recruitmentLimit);
    return await Volunteer.create({
      title,
      content,
      category,
      recruitmentPeriod,
      volunteerStartDate,
      volunteerEndDate,
      recruitmentLimit,
      location,
      userId,
      image,
    });
  },

  updateVolunteer: async (volunteerId, updatedData) => {
    return await Volunteer.findByIdAndUpdate(volunteerId, updatedData, {
      new: true,
    });
  },

  deleteVolunteer: async (volunteerId) => {
    return await Volunteer.findByIdAndDelete(volunteerId);
  },
  searchContent: async (keyword) => {
    try {
      const regex = new RegExp(keyword, "i");
      const searchResults = await Volunteer.find({
        $or: [{ title: regex }, { content: regex }],
      })
        .sort({ createdAt: -1 })
        .populate("userId");

      return searchResults;
    } catch (error) {
      throw new Error("Failed to search content");
    }
  },
  getCounts: async () => {
    try {
      return await Volunteer.countDocuments();
    } catch (error) {
      throw new Error("Failed to fetch user's posts");
    }
  },
  updateVolunteer: async (volunteerId, updatedVolunteer) => {
    try {
      const volunteer = await Volunteer.findByIdAndUpdate(
        { _id: volunteerId },
        updatedVolunteer,
        { new: true }
      );

      return volunteer;
    } catch (error) {
      throw new Error("Failed to update volunteer");
    }
  },

  getVolunteerById: async (volunteerId) => {
    try {
      const volunteer = await Volunteer.findById(volunteerId)
        .populate("userId", ["name"])
        .sort({ createdAt: -1 });

      return volunteer;
    } catch (error) {
      throw new Error("Failed to get volunteer");
    }
  },
  getParticipate: async (userId) => {
    try {
      const volunteerPots = await Volunteer.find({ registeredUsers: userId })
        .populate("userId", ["name"])
        .populate("registeredUsers")
        .sort({ createdAt: -1 });

      return volunteerPots;
    } catch (error) {
      throw new Error("Failed to get volunteer");
    }
  },
};

export default volunteerService;
