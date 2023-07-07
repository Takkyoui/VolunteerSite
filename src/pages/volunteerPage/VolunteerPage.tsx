import React, { useState } from "react";
import Card from "../../components/CardComponents/Card";
import "./VolunteerPage.css";
import Banner from "../../components/Banner/Banner";
import SearchBox from "../../components/SearchBox/SearchBox";
import TotalPosts from "../../components/Write/Write";
import { useNavigate } from "react-router-dom";
import { useGetVolunteer } from "../../hooks/volunteerHooks";
import { useSearch } from "../../hooks/searchHooks";
import Loading from "../../components/Loading_Error/Loading";
import Error from "../../components/Loading_Error/Error";

const VolunteerPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetVolunteer();

  const path = "volunteer";
  const [keyword, setKeyWord] = useState("");
  const {
    data: searchResults,
    isLoading: isLoading1,
    error: error1,
  } = useSearch(path, keyword);

  console.log(searchResults);
  const handleSearch = (keyword: string) => {
    setKeyWord(keyword);
  };

  if (isLoading1) {
    return <Loading />;
  }
  if (error1) {
    return <Error message="오류가 발생했습니다" />;
  }
  return isLoading ? (
    <Loading />
  ) : error ? (
    <Error message="오류가 발생했습니다" />
  ) : (
    <div className="volunteer-page">
      <Banner
        title="모집중인 활동"
        subtitle="인증받은 단체에서 함께 봉사활동해요"
        image="./cardImage.png"
        color="#FFD4D4"
      ></Banner>

      <br></br>
      <br></br>
      <TotalPosts
        path={"volunteer"}
        onWritePost={() => {
          navigate("/volunteer/write");
        }}
      />
      <br></br>
      <br></br>
      <SearchBox onSearch={handleSearch} />

      <br></br>
      <br></br>
      <div className="card-list">
        {(searchResults!.length > 0 ? searchResults! : data!).map(
          (volunteer) => (
            <Card
              key={volunteer._id}
              id={volunteer._id}
              image={volunteer.image}
              title={volunteer.title}
              recruitmentStatus={volunteer.recruitmentStatus}
              author={volunteer.userId.name}
              createdAt={volunteer.createdAt}
              mypage={false}
            />
          )
        )}
      </div>
    </div>
  );
};

export default VolunteerPage;
