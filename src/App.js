import { BrowserRouter, Route, Routes } from "react-router-dom";

// PAGES
import Store from "./pages/Store";
import Main from "./pages/Home/Main/Main";
import SelectStore from "./pages/Home/SelectStore";
import UserGuide from "./pages/Home/UserGuide";
import Header from "./pages/Header";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import SelectModal from "./components/SelectModal";
import { useState } from "react";
import Coupon from "./pages/Coupon";
import Heart from "./pages/Home/Heart";
import MyPage from "./pages/MyPage";
import { Login } from "./pages/Login";

function App() {
  // 모달 선택창 상태를 관리하는 상태 변수
  const [selectModal, setSelectModal] = useState(0);
  return (
    <BrowserRouter>
      <Header />
      <Navbar setSelectModal={setSelectModal} />
      <div className="relative min-h-screen">
        {/* 라우트를 정의한 부분 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/store" element={<Store />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route
            path="/region"
            element={
              <SelectStore
                title={"지역"}
                selectModal={selectModal}
                setSelectModal={setSelectModal}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <SelectStore
                title={"메뉴"}
                selectModal={selectModal}
                setSelectModal={setSelectModal}
              />
            }
          />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/heart" element={<Heart />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          {/* 추가하는 모든 페이지는 여기에 넣어주세요! */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
