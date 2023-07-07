import React, { useState } from "react";
import PostProps from "../../components/PostList/PostProps";
import "./CommunityPage.css";
import Banner from "../../components/Banner/Banner";
import SearchBox from "../../components/SearchBox/SearchBox";
import TotalPosts from "../../components/Write/Write";
import { useNavigate } from "react-router-dom";
import { useGetCommunity } from "../../hooks/communityHooks";
import { useSearch } from "../../hooks/searchHooks";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";
import Comment from "../../components/Comment/Comment";
import CommentForm from "../../components/CommentForm/CommentForm";

type CommunityData = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  userId: any;
  createdAt: string;
};

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  const path = "community";

  const { data, isLoading, error } = useGetCommunity();
  const [keyword, setKeyWord] = useState("");
  const {
    data: searchResults,
    isLoading: isLoading1,
    error: error1,
  } = useSearch(path, keyword);

  const handleSearch = (keyword: string) => {
    setKeyWord(keyword);
  };

  if (isLoading1) {
    return <Loading />;
  }
  if (error1) {
    return <div>Error</div>;
  }
  return isLoading ? (
    <>
      <Loading />
    </>
  ) : error ? (
    <>
      <Error message="오류가 발생했습니다" />
    </>
  ) : (
    <div className="community-page">
      <Banner
        title="커뮤니티"
        subtitle="이곳에서 봉사를 함께할 친구를 찾아보세요!"
        image="./dog.png"
        color="#FFFFE8"
      ></Banner>

      <br />
      <br />
      <TotalPosts
        path={"community"}
        onWritePost={() => {
          navigate("/community/write");
        }}
      />
      <br />
      <br />
      <SearchBox onSearch={handleSearch} />

      <br />
      <br />
      <div className="post-list">
        {(searchResults && searchResults.length > 0
          ? searchResults
          : data || []
        ).map((post, index) => (
          <PostProps
            key={index}
            slug={post._id}
            path="community"
            title={post.title}
            content={post.content}
            author={post.userId.name}
            date={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
