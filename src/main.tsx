import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import Homepage from "./pages/homePage/Homepage.tsx";
import CommunityPage from "./pages/communityPage/CommunityPage.tsx";
import ReviewPage from "./pages/reviewPage/ReviewPage.tsx";
import VolunteerPage from "./pages/volunteerPage/VolunteerPage.tsx";
import SignUpPage from "./pages/userPage/SignupPage.tsx";
import SigninPage from "./pages/userPage/Signin.tsx";
import VolunteerDetailPage from "./pages/volunteerPage/VolunteerDetailPage.tsx";
import { StateProvider } from "./State.tsx";
import Mypage from "./pages/myPage/Mypage.tsx";
import WithdrawPage from "./pages/myPage/WithdrawPage.tsx";
import VolunteerWritePage from "./pages/volunteerPage/WriteVolunteerPage.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import WriteCommunityPage from "./pages/communityPage/WriteCommunityPage.tsx";
import WriteReviewPage from "./pages/reviewPage/WriteReviewPage.tsx";
import ReviewDetailPage from "./pages/reviewPage/ReviewDetailPage.tsx";
import CommunityDetailPage from "./pages/communityPage/ComunityDetailPage.tsx";
import ProtectedRoute from "./components/ProtectRoute.tsx";
import MyPost from "./pages/myPage/MyPost.tsx";
import MyCommunityPost from "./pages/myPage/MyCommunityPost.tsx";
import MyReviewPost from "./pages/myPage/MyReviewPost.tsx";
import ParticipantListPage from "./pages/ParticipantListPage/ParticipantListPage.tsx";
import MyParticipate from "./pages/myPage/MyParticipate/MyParticipate.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import WriteReviewEditPage from "./pages/reviewPage/WriteReviewEditPage.tsx";
import WriteCommunityEditPage from "./pages/communityPage/WriteCommunityEditPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/community" element={<CommunityPage />}></Route>
      <Route path="/review" element={<ReviewPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/signin" element={<SigninPage />}></Route>{" "}
      <Route path="/volunteer" element={<VolunteerPage />}></Route>
      <Route path="/volunteer/:slug" element={<VolunteerDetailPage />}></Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/volunteer/write" element={<VolunteerWritePage />}></Route>
        <Route path="/community/write" element={<WriteCommunityPage />}></Route>
        <Route path="/review/write" element={<WriteReviewPage />}></Route>
        <Route path="/withdraw" element={<WithdrawPage />}></Route>
        <Route path="/myvolunteerpost" element={<MyPost />}></Route>
        <Route path="/mycommunitypost" element={<MyCommunityPost />}></Route>
        <Route path="/myreviewpost" element={<MyReviewPost />}></Route>
        <Route path="/participate" element={<ParticipantListPage />}></Route>
        <Route path="/myparticipate" element={<MyParticipate />}></Route>
        <Route
          path="/review/edit/:slug"
          element={<WriteReviewEditPage />}
        ></Route>
        <Route
          path="/community/edit/:slug"
          element={<WriteCommunityEditPage />}
        ></Route>
      </Route>
      <Route path="/review/:slug" element={<ReviewDetailPage />}></Route>
      <Route path="/community/:slug" element={<CommunityDetailPage />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <StateProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StateProvider>
  // </React.StrictMode>
);
