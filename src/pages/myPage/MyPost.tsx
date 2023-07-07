import React from "react";
import Card from "../../components/CardComponents/Card";
import "./MyPost.css";
import Navbar from "../../components/Navbar/Navbar";
import { useGetMyPost } from "../../hooks/mypostHook";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";

function MyPost() {
  const slug = "volunteer";
  const { data, isLoading, error } = useGetMyPost(slug);
  console.log(data);
  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error message="오류가 발생했습니다" />
  ) : (
    <>
      <Navbar />
      <div className="mypost-container">
        <h1 className="mypost-title">내가 작성한 게시글</h1>
        <div className="mypost-card-container">
          {data!.map((post) => (
            <Card
              key={post._id}
              id={post._id}
              title={post.title}
              image={post.image as string}
              recruitmentStatus={post.recruitmentStatus}
              author={post.userId.name}
              createdAt={post.createdAt}
              mypage={false}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyPost;
