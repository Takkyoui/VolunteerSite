import React, { useState } from "react";
import "./ParticipantListPage.css";
import Navbar from "../../components/Navbar/Navbar";
import { useGetMyVolunteer } from "../../hooks/volunteerHooks";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";

interface Participant {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  participants: Participant[];
}

const ParticipantListPage: React.FC = () => {
  const { data: posts, isLoading, error } = useGetMyVolunteer();
  const [visibleListIds, setVisibleListIds] = useState<number[]>([]);

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error message="오류가 발생했습니다" />
  ) : (
    <>
      <Navbar />
      <div className="participant-list-page">
        <h1>참여자 목록 페이지</h1>
        {posts!.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <h3>
              참여 인원: {post.registeredUsers.length} / {post.recruitmentLimit}
            </h3>
            <ul>
              {post.registeredUsers.map((participant) => (
                <li key={participant._id}>{participant.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default ParticipantListPage;
