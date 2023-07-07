import React from "react";

import "./MyReviewPost.css";
import Navbar from "../../components/Navbar/Navbar";
import PostProps from "../../components/PostList/PostProps";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";
import { useGetMyPost } from "../../hooks/mypostHook";

function MyReviewPost() {
  const slug = "review";
  const { data, isLoading, error } = useGetMyPost(slug as string);

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error message="오류가 발생했습니다" />
  ) : (
    <>
      <Navbar />
      <div className="my-review-post-container">
        <h1>내가 작성한 리뷰 게시글</h1>
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

export default MyReviewPost;
