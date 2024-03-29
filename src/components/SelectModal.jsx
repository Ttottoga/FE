import { useContext } from "react";
import { Link } from "react-router-dom";

// 메뉴 아이콘
import menuBurger from "./../assets/images/menu-burger.png";
import menuChicken from "./../assets/images/menu-chicken.png";
import menuKorean from "./../assets/images/menu-korean.png";
import menuLunchbox from "./../assets/images/menu-lunchbox.png";
import menuSandwich from "./../assets/images/menu-sandwich.png";
import menuSnack from "./../assets/images/menu-snack.png";
import menuSushi from "./../assets/images/menu-sushi.png";
import menuJapanese from "./../assets/images/menu-japanese.png";
import menuAsian from "./../assets/images/menu-asian.png";
import menuChinese from "./../assets/images/menu-chinese.png";
import menuJokbal from "./../assets/images/menu-jokbal.png";
import menuCafe from "./../assets/images/menu-cafe.png";
import menuPizza from "./../assets/images/menu-pizza.png";
import menuSteamed from "./../assets/images/menu-steamed.png";
import menuMeat from "./../assets/images/menu-meat.png";

// context
import { ModalContext } from "../contexts/ModalContextProvider";

/**
 * 'SelectModal': '지역 별 상점', '메뉴 선택'을 눌렀을 때 화면에 나타나는 컴포넌트
 */
const SelectModal = () => {
  const { modalNumber, closeModal } = useContext(ModalContext);
  /** 모달 닫기 함수 */
  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      closeModal();
    }
    if (e.target.classList.contains("target")) {
      closeModal();
    }
  };
  return (
    <>
      {/* 모달이 가시적인 상태일 때만 렌더링 */}
      {!!modalNumber && (
        <div
          id="wrapper"
          className={
            "absolute inset-0 bg-custom-gray-300 bg-opacity-25 backdrop-blur-xl flex justify-center z-50 min-h-screen"
          }
          onClick={handleClose}
        >
          {/* 모달 내용 영역 */}
          <div className="absolute w-[44rem] bg-white top-28 shadow-custom-box-shadow rounded-xl">
            {/* 모달 종류를 어떤 것을 선택되었는지에 따라 다른 컴포넌트 렌더링 (1: 지역 선택, 2: 메뉴선택 */}
            {modalNumber === 1 ? (
              // 지역 선택
              <RegionSelector handleClose={handleClose} />
            ) : (
              // 메뉴 선택
              <MenuSelector handleClose={handleClose} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

/** 메뉴 선택 모달창 */
const MenuSelector = ({ handleClose }) => {
  // 메뉴 이름 리스트
  const menus = [
    { id: 1, label: "치킨", img: menuChicken },
    { id: 2, label: "버거", img: menuBurger },
    { id: 3, label: "한식", img: menuKorean },
    { id: 4, label: "일식/돈까스", img: menuJapanese },
    { id: 5, label: "족발/보쌈", img: menuJokbal },
    { id: 6, label: "중국집", img: menuChinese },
    { id: 7, label: "분식", img: menuSnack },
    { id: 8, label: "아시안", img: menuAsian },
    { id: 9, label: "피자/양식", img: menuPizza },
    { id: 10, label: "카페/디저트", img: menuCafe },
    { id: 11, label: "샐러드", img: menuChicken },
    { id: 12, label: "도시락/죽", img: menuLunchbox },
    { id: 13, label: "찜/탕", img: menuSteamed },
    { id: 14, label: "고기/구이", img: menuMeat },
    { id: 15, label: "회/초밥", img: menuSushi },
    { id: 16, label: "샌드위치", img: menuSandwich },
  ];
  return (
    <div className="p-8">
      <div className="flex justify-between px-3">
        <p className="text-xl text-[#000000B2] my-4">메뉴</p>
        <button className="text-sm text-custom-pink target">확인</button>
      </div>
      <div className="w-full h-0.5 bg-[#0000001A]"></div>

      {/* 메뉴 선택 리스트 */}
      <ul className="flex flex-wrap">
        {menus.map((menu) => (
          <li to="/menu" key={menu.id} className="w-1/4 px-8 py-5">
            <Link
              className="w-full target"
              to={`/menu/${menu.id}/${menu.label.replace(/\//g, "-")}`}
            >
              <figure
                className="pb-[100%] h-0 bg-center bg-no-repeat bg-cover shrink-0 target"
                style={{ backgroundImage: `url(${menu.img})` }}
              >
                {/* 높이를 0, 바닥 패딩을 100프로로 주어서 정사각형을 만듬 */}
              </figure>
              <p className="text-[#000000B2] text-center target">
                {menu.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

/** 지역 선택 모달창 */
const RegionSelector = ({ handleClose }) => {
  // 지역 이름 리스트
  const cities = [
    {
      id: 1,
      label: "서울",
      towns: [
        "전체",
        "강남/논현",
        "강동/천호",
        "강서/목동",
        "건대/왕십리",
        "관악/신림",
        "교대/사당",
        "노원/강북",
        "명동/이태원",
        "삼성/선릉",
        "송파/잠실",
        "수유/동대문",
        "신촌/이대",
        "압구정/신사",
        "여의도/영등포",
        "종로/대학로",
        "홍대/마포",
      ],
    },
    {
      id: 2,
      label: "경기-인천",
      towns: [
        "전체",
        "일산/파주",
        "용인/분당/수원",
        "인천/부천",
        "남양주/구리/하남",
        "안양/안산/광명",
      ],
    },
    {
      id: 3,
      label: "대전-충청",
      towns: ["전체", "대전", "춘천"],
    },
    {
      id: 4,
      label: "대구-경북",
      towns: ["전체", "대구", "경북"],
    },
    {
      id: 5,
      label: "부산-경남",
      towns: ["전체", "부산", "경남"],
    },
    {
      id: 6,
      label: "광주-전라",
      towns: ["전체", "광주", "전라"],
    },
    {
      id: 7,
      label: "다른지역",
      towns: ["전체", "강원", "제주"],
    },
  ];
  return (
    <div className="p-8">
      <div className="flex justify-between px-3">
        <p className="text-xl text-[#000000B2] my-4">전체 지역</p>
        <button
          onClick={handleClose}
          className="text-sm text-custom-pink target"
        >
          확인
        </button>
      </div>

      {/* 지역 선택 리스트 */}
      <ul className="flex flex-col">
        {cities.map((city) => (
          <div key={city.id}>
            <div className="w-full h-0.5 bg-[#0000001A]"></div>
            {/* 지역을 구분하기 위한 회색 구분선 */}
            <li className="flex p-3">
              <div className="w-1/5  text-base text-[#000000B2]">
                {city.label}
              </div>
              <ul className="flex flex-wrap w-4/5">
                {city.towns.map((town, id) => (
                  <li
                    key={id + 1}
                    to="/region"
                    className="w-1/4 p-2 text-sm text-[#00000080]"
                  >
                    <Link
                      className="target"
                      to={`/region/${city.id}/${city.label}/${
                        id + 1
                      }/${town.replace(/\//g, "-")}`}
                    >
                      {town}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SelectModal;
