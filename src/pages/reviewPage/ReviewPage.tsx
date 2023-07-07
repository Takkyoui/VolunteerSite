import React, { useState } from "react";
import PostProps from "../../components/PostList/PostProps";
import "./ReviewPage.css";
import Banner from "../../components/Banner/Banner";
import SearchBox from "../../components/SearchBox/SearchBox";
import TotalPosts from "../../components/Write/Write";
import { useNavigate } from "react-router-dom";
import { useGetReview } from "../../hooks/reviewHooks";
import { useSearch } from "../../hooks/searchHooks";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetReview();
  const path = "review";
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
    return (
      <>
        <Loading />
      </>
    );
  }
  if (error1) {
    return (
      <>
        <Error message="오류가 발생했습니다" />
      </>
    );
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
    <div className="review-page">
      <Banner
        title="봉사후기"
        subtitle="봉사후기를 작성하고 공유해요"
        image="./volunteer1.png"
        color="#CDE990"
      ></Banner>
      <br></br>
      <br></br>
      <TotalPosts
        path={"review"}
        onWritePost={() => {
          navigate("/review/write");
        }}
      />
      <br></br>
      <br></br>
      <SearchBox onSearch={handleSearch} />

      <br></br>
      <br></br>
      <div className="review-list">
        {(searchResults!.length > 0 ? searchResults! : data!).map(
          (review, index) => (
            <PostProps
              key={index}
              path="review"
              title={review.title}
              slug={review._id}
              content={review.content}
              author={review.userId.name}
              // profileImage={review.profileImage}
              date={review.createdAt}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
