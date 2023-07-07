import volunteerService from "./volunteerService.js";

const volunteerController = {
  _getAllVolunteers: async (req, res) => {
    try {
      const volunteers = await volunteerService.getAllVolunteers();
      res.json(volunteers);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  get getAllVolunteers() {
    return this._getAllVolunteers;
  },
  set getAllVolunteers(value) {
    this._getAllVolunteers = value;
  },

  getVolunteerById: async (req, res) => {
    try {
      const { volunteer_id } = req.params;
      const volunteer = await volunteerService.getVolunteerById(volunteer_id);
      res.json(volunteer);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createVolunteer: async (req, res) => {
    try {
      const {
        title,
        content,
        category,
        recruitmentPeriod,
        volunteerStartDate,
        volunteerEndDate,
        recruitmentLimit,
        location,
      } = req.body;
      const userId = req.user._id;

      const files = req.files || [];
      const image = files.map((file) => {
        return `${file.path}`.replace("public/", "");
      });

      const createdVolunteer = await volunteerService.createVolunteer({
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

      res.json(createdVolunteer);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateVolunteer: async (req, res) => {
    try {
      const { volunteer_id } = req.params;
      const updatedVolunteer = await volunteerService.updateVolunteer(
        volunteer_id,
        req.body
      );
      res.json(updatedVolunteer);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteVolunteer: async (req, res) => {
    try {
      const { volunteer_id } = req.params;
      await volunteerService.deleteVolunteer(volunteer_id);
      res.json({ message: "Volunteer deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  searchContent: async (req, res) => {
    try {
      const { keyword } = req.query;
      const searchResults = await volunteerService.searchContent(keyword);
      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ error: "Failed to search content" });
    }
  },
  getCounts: async (req, res) => {
    try {
      const count = await volunteerService.getCounts();
      res.status(200).json(count);
    } catch (error) {
      res.status(500).json({ message: "Error" });
    }
  },
  getMypost: async (req, res) => {
    const userId = req.user._id;
    const myPosts = await volunteerService.getMyRegisterPosts(userId);
    res.status(200).json(myPosts);
  },
  participate: async (req, res) => {
    const { postId, action } = req.body;
    const participantId = req.user._id;

    try {
      // postId로 게시물 찾기
      const post = await volunteerService.getVolunteerById(postId);

      if (!post) {
        return res.status(404).json({ error: "게시물을 찾을 수 없습니다" });
      }

      if (action === "참여하기") {
        // 참가자가 이미 참여 중인지 확인
        const isParticipant = post.registeredUsers.includes(participantId);
        if (isParticipant) {
          return res.status(400).json({ error: "이미 참여한 게시물입니다" });
        }

        if (post.recruitmentLimit < post.registeredUsers.length) {
          return res.status(400).json({ error: "인원이 초과되었습니다" });
        }

        // 참가자를 게시물의 참가자 목록에 추가
        post.registeredUsers.push(participantId);
      }
      // 참여취소 액션 처리
      else if (action === "참여취소") {
        // 참가자를 게시물의 참가자 목록에서 제거
        const participantIndex = post.registeredUsers.indexOf(participantId);
        if (participantIndex !== -1) {
          post.registeredUsers.splice(participantIndex, 1);
        }
      }
      // 유효하지 않은 액션 처리
      else {
        return res.status(400).json({ error: "유효하지 않은 액션입니다" });
      }

      // 게시물 업데이트
      const updatedPost = await volunteerService.updateVolunteer(postId, post);

      res.json({ message: "참여완료!" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getparticipate: async (req, res) => {
    try {
      const userId = req.user._id;
      console.log(userId);
      const participatedPosts = await volunteerService.getParticipate(userId);
      res.status(200).json(participatedPosts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default volunteerController;
