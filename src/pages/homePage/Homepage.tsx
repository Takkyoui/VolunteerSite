import React from "react";
import "./Homepage.css";
import NewsCard from "../../components/NewsCard/NewsCard";
import { Link } from "react-router-dom";

interface News {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Homepage: React.FC = () => {
  const newsList: News[] = [
    {
      id: 1,
      title: "마음이음에서 처음으로 해외봉사활동을 합니다!",
      description:
        "안녕하세요!! 여러분, 이번 뉴스내용은 마음이음에서 처음으로 주최하는 해외 봉사 이벤트 입니다! 아프리카 어린이들에게 한국인들의 도움을 손길을 내주어요!",
      imageUrl:
        "http://eduict.org/_new3/files/2019/01/27/f24a043f5131824693fd726a56a43951235701.jpg",
    },
    {
      id: 2,
      title: "이번달 봉사왕!!",
      description:
        "이번달에 봉사 점수에서 달려라치킨 님! 이 최고 등급을 받으셨습니다! 달려라치킨님은 평소 봉사활동을 좋아하시고 이번에 마음이음에서 주최하는 상장이벤트를 개최하려고 합니다! 많은 여러분의 관심을 부탁드립니다!",
      imageUrl: "http://cjjb.kr/images/client/volunteer.png",
    },
    {
      id: 3,
      title: "마음이음 봉사 횟수 10만회 돌파!",
      description:
        "모든 회원 여러분 감사합니다~! 여러분들의 따뜻한 봉사에 드디어 총 봉사 횟수 10만회를 돌파하였습니다. 여러분들이 있어서 아직 세상을 살만합니다",
      imageUrl:
        "https://cphoto.asiae.co.kr/listimglink/1/2021082516333591699_1629876816.jpg",
    },
  ];

  return (
    <div className="homepage-container">
      <div className="homepage-banner">
        <h2 className="homepage-banner-title">마음이음</h2>
        <div className="homepage-banner-description">
          나누는 즐거움, 함께 만드는 가치
        </div>
      </div>

      <div className="homepage-features">
        <div className="homepage-feature">
          <h3 className="homepage-feature-title">봉사해요</h3>
          <div className="homepage-feature-description">
            다양한 봉사활동을 찾아볼 수 있는 공간입니다!
          </div>
        </div>
        <div className="homepage-feature">
          <h3 className="homepage-feature-title">커뮤니티</h3>
          <div className="homepage-feature-description">
            다양한 주제로 새로운 뉴스와 정보를 공유하세요.
          </div>
        </div>
        <div className="homepage-feature">
          <h3 className="homepage-feature-title">봉사후기</h3>
          <div className="homepage-feature-description">
            다양한 후기를 보면서 다른 사람들과 소통하세요!
          </div>
        </div>
      </div>
      <div className="homepage-news-list">
        <h2 className="homepage-news-list-title">마음이음 뉴스</h2>
        <div className="homepage-news-card-container">
          {newsList.map((news, index) => (
            <NewsCard
              key={news.id}
              title={news.title}
              description={news.description}
              imageUrl={news.imageUrl}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
