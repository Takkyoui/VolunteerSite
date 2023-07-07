import React from "react";

import "./MyCommunityPost.css";
import Navbar from "../../components/Navbar/Navbar";
import PostProps from "../../components/PostList/PostProps";
import { useGetMyPost } from "../../hooks/mypostHook";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";

function MyCommunityPost() {
  const slug = "community";
  const { data, isLoading, error } = useGetMyPost(slug);
  if (isLoading) {
    return <Loading />;
  }
  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error message="오류가 발생했습니다" />
  ) : (
    <>
      <Navbar />
      <div className="my-community-post-container">
        <h1>내가 작성한 커뮤니티 게시글</h1>
        <div className="card-container">
          {data!.map((post) => (
            <PostProps
              key={post._id}
              title={post.title}
              content={post.content}
              author={post.userId.name}
              path="community"
              slug={post._id}
              date={post.createdAt}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyCommunityPost;
