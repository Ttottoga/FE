import React, { useEffect, useState } from "react";
import Modal from "./Modal"; // Modal 컴포넌트 import
import DownloadIcon from "./DownloadIcon"; // DownloadIcon 컴포넌트 import
import CheckIcon from "./CheckIcon";
import EmployeeVerificationIcon from "../assets/employeeVerification.svg";
// import QrCodeIcon from "../assets/qr-code-line.svg";
import { ReactComponent as HorizontalCircleIcon } from "../assets/horizontalCircle.svg";
import { ReactComponent as PhoneDownloadIcon } from "../assets/phone_downloadIcon.svg";

// 쿠폰 데이터, 쿠폰사용여부, 모달창 열기, 모달창 닫기, 모달 관리
const CouponCard = ({
  couponData,
  isModalOpen,
  handleOpenModal,
  handleCloseModal,
  handleCouponUsed,
}) => {
  // 쿠폰 발급 동의 여부
  const [isCheck, setIsCheck] = useState(false);

  // 초기 상태 설정 예시
  const [modalsOpen, setModalsOpen] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });

  // 특정 모달을 제외하고 모두 닫는 함수
  const openSpecificModal = (modalName) => {
    setModalsOpen({
      modal1: false,
      modal2: false,
      modal3: false,
      [modalName]: true,
    });
  };

  const closeAllModals = () => {
    setModalsOpen({
      modal1: false,
      modal2: false,
      modal3: false,
    });
    handleCloseModal();
    setIsCheck(false);
  };

  // 이거 때문에 화면이 작아질때 쿠폰이 다시 보이는 버그 발생함 -> 어떻게
  useEffect(() => {
    if (isModalOpen) {
      // isModalOpen이 true일 경우 modal1을 true로 설정
      setModalsOpen((prevModals) => ({
        ...prevModals, // 기존의 모달 상태를 유지
        modal1: true, // modal1만 true로 설정
      }));
    }
  }, [isModalOpen]);

  // console.log(modalsOpen);

  return (
    <>
      {/* 모바일 쿠폰 영역 */}
      <main className="flex flex-row h-40 mb-6 break-words rounded-l-lg shadow-lg ml-7 md:hidden font-inter">
        {/* 쿠폰 왼쪽 다운로드 영역*/}
        <div className="relative z-0">
          <div
            className={`rounded-l-lg h-full w-16 flex flex-col items-center justify-center pl-4 pr-[18px] basis-1/4 ${
              couponData.useYn === "N" ? "bg-custom-gray-300" : "bg-custom-pink"
            }`}
          >
            <button
              className="text-[8px]"
              onClick={() => {
                handleOpenModal();
              }}
              disabled={couponData.useYn === "N"}
            >
              <div className="w-9 h-9 bg-white rounded-full mb-1.5 flex justify-center items-center">
                <PhoneDownloadIcon
                  fill={`${couponData.useYn === "N" ? "#B3B3B3" : "#FF0068"}`}
                  stroke={`${couponData.useYn === "N" ? "#B3B3B3" : "#FF0068"}`}
                />
              </div>
              <p className="text-white">다운로드</p>
            </button>
            <HorizontalCircleIcon
              fill={couponData.useYn === "N" ? "white" : "#FFF2F2"}
              className="absolute top-3 right-[-6px]"
            />
          </div>
        </div>

        {/* 쿠폰 오른쪽 내용 영역 */}
        <div
          className={`py-6 pl-6 pr-2  w-full ${
            couponData.useYn === "N" ? "bg-white" : "bg-[#FFF2F2]"
          }`}
        >
          <div className="flex flex-col justify-around h-full">
            {/* <h1>[성수] 베리베리 스트로베리 케이크 전문점</h1> */}
            <h1>{couponData.name}</h1>
            <p
              className={`text-[10px]  ${
                couponData.useYn === "N"
                  ? "text-custom-gray-200"
                  : "text-custom-pink"
              }`}
            >
              {/* 닐라닐라바닐라 조각케이크 무료증정 */}
              {couponData.subtitle}
            </p>
            <div className="flex flex-row items-center">
              <p
                className={`text-[8px] rounded-lg text-white px-2 py-0.5 mr-2 ${
                  couponData.useYn === "N"
                    ? "bg-custom-gray-300"
                    : "bg-custom-pink"
                }`}
              >
                {couponData.useYn === "N" ? "사용완료" : "사용가능"}
              </p>
              <p
                className={`text-[10px]  ${
                  couponData.useYn === "N" ? "text-custom-gray-200" : null
                }`}
              >
                {`${couponData.startDate} ~ ${couponData.endDate}`}
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* //모바일 쿠폰 영역 끝 */}

      {/* 모바일 모달 */}
      <div className="md:hidden">
        {/* 1번째 모달 */}
        <Modal
          isOpen={modalsOpen.modal1}
          onClose={closeAllModals}
          isCoupon={true}
        >
          <div className="px-6 py-5 w-[278px] h-full">
            <div className="h-[200px]">
              <div className="mb-3 text-center text-custom-gray-200">
                쿠폰 정보
              </div>
              <img
                src={couponData.storeImage}
                alt="상점 이미지"
                className="mb-8 w-[228px] h-[141px] rounded-lg object-cover"
              />
            </div>

            {/* 쿠폰 디자인 양쪽 원으로 파인 부분  */}
            {/* 흰색 아래 흰색을 덮어서 그위에 블러처리하면 안될려나? */}
            <CouponSemicircleUIMobile />

            {/* 쿠폰 실선 밑 영역 */}
            <div className="text-center border-t-2 border-dashed border-custom-pink">
              <h2 className="text-xs mt-8 mb-2.5">{couponData.name}</h2>
              <h3 className="text-[10px] mb-2.5 text-custom-orange">
                {couponData.subtitle}
              </h3>
              <h4 className="text-[9px] mb-1">
                기한: {`${couponData.startDate} ~ ${couponData.endDate}`}
              </h4>
              <button
                className="w-full h-8 text-xs text-white rounded bg-custom-pink"
                onClick={() => {
                  openSpecificModal("modal2");
                }}
              >
                직원확인
              </button>
            </div>
          </div>
        </Modal>

        {/* 2번째 모달 */}
        <Modal
          isOpen={modalsOpen.modal2}
          onClose={closeAllModals}
          isCoupon={true}
        >
          <div className="px-6 py-5 w-[278px] h-full">
            <div className="h-[200px]">
              <div className="text-center text-custom-gray-200">직원 확인</div>
              <div className="flex items-center justify-center h-5/6">
                <img
                  className={`${isCheck ? "w-40 h-40" : "w-28 h-28"}`}
                  src={isCheck ? couponData.qrCode : EmployeeVerificationIcon}
                  alt="QR코드 이미지"
                />
              </div>
            </div>

            {/* 쿠폰 디자인 양쪽 원으로 파인 부분  */}
            <CouponSemicircleUIMobile />

            <div className="border-t-2 border-dashed border-custom-pink">
              {/* 대쉬바 밑에 내용 전체 div */}
              <div className="pt-3 h-[133px] flex flex-col justify-between">
                <div className="flex items-center mb-1">
                  <button
                    className="mr-1 "
                    onClick={() => {
                      setIsCheck(!isCheck);
                    }}
                  >
                    <CheckIcon isCheck={isCheck} />
                  </button>
                  <p className="text-[9px] text-black">
                    해당 쿠폰의 상점 직원이 맞습니다. (필수)
                  </p>
                </div>
                <div className="text-[#FF0000] text-[9px] mb-3">
                  <p>※ 발급 정보는 마이페이지에서 수정가능합니다.</p>
                  <p>※ 쿠폰 발급 이후 발급 정보 수정이 불가합니다.</p>
                  <p>※ 본인 이외에 쿠폰 발급은 불가합니다.</p>
                </div>
                <button
                  className={`w-full h-8 rounded  text-white text-xs ${
                    isCheck
                      ? "bg-custom-pink"
                      : "bg-[#B2B2B2] cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (isCheck) {
                      openSpecificModal("modal3");
                    }
                  }}
                  disabled={!isCheck}
                >
                  사용하기
                </button>
              </div>
            </div>
          </div>
        </Modal>

        {/* 3번째 모달창 */}
        <Modal
          isOpen={modalsOpen.modal3}
          onClose={closeAllModals}
          isCoupon={true}
          isLast={true}
        >
          <div className="px-6 py-5 w-[278px] h-full">
            <div className="h-[200px]">
              <div className="mb-3 text-center text-custom-gray-200">
                쿠폰 정보
              </div>
              <img
                src={couponData.storeImage}
                alt="상점 이미지"
                className="mb-8 w-[228px] h-[141px] grayscale rounded-lg object-cover"
              />
              <div className="w-[115px] h-[115px] text-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-custom-pink rounded-full flex flex-col items-center justify-center bg-white/75">
                <p className="text-2xl font-semibold text-custom-pink">
                  사용
                  <br />
                  완료
                </p>
              </div>
            </div>

            {/* 쿠폰 디자인 양쪽 원으로 파인 부분  */}
            {/* 흰색 아래 흰색을 덮어서 그위에 블러처리하면 안될려나? */}

            <CouponSemicircleUIMobile isLast={true} />

            {/* 쿠폰 실선 밑 영역 */}
            <div className="border-dashed border-t-2 border-[#B2B2B2] text-center">
              <h2 className="text-xs mt-8 mb-2.5">{couponData.name}</h2>
              <h3 className="text-[10px] mb-2.5 text-custom-orange">
                {couponData.subtitle}
              </h3>
              <h4 className="text-[9px] mb-1">
                기한: {`${couponData.startDate} ~ ${couponData.endDate}`}
              </h4>
              <button
                className="h-8 w-full rounded bg-[#B2B2B2] text-white text-xs"
                onClick={() => {
                  closeAllModals();
                  handleCouponUsed(couponData.id);
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {/* 데스크탑 쿠폰 */}
      <main className="hidden w-full mb-8 rounded-lg h-72 shadow-custom-box-shadow md:flex">
        {/* 쿠폰 이미지 및 상세 내용 */}
        <div className="flex h-full py-6 basis-3/4 pl-7">
          {/* 이미지 */}
          <img
            src={couponData.storeImage}
            alt="상점 이미지"
            className="mr-12 rounded-lg w-96 object-cover shrink-0"
          />
          {/* 내용 전체 크기 설정 */}
          <div className="truncate  pt-11 pb-7">
            <h2 className="mb-4 overflow-hidden text-3xl font-medium text-ellipsis">
              {couponData.name}
            </h2>
            <h3 className="text-[#FF7A00] mb-14 text-ellipsis overflow-hidden">
              {couponData.subtitle}
            </h3>
            <div className="flex items-center">
              <p
                className={`px-5 py-2.5 rounded-3xl	text-white mr-5 ${
                  couponData.useYn === "N"
                    ? "bg-custom-gray-200"
                    : "bg-custom-pink"
                }`}
              >
                {couponData.useYn === "N" ? "사용완료" : "사용가능"}
              </p>
              <p className="overflow-hidden text-ellipsis">
                기한: {`${couponData.startDate} ~ ${couponData.endDate}`}
              </p>
            </div>
          </div>
        </div>
        {/* 쿠픈 다운로드 */}
        <div
          className={`relative basis-1/4 rounded-r-lg h-full overflow-hidden ${
            couponData.useYn === "N"
              ? "bg-custom-gray-200"
              : "bg-custom-gradation-180"
          }`}
        >
          {/* 쿠폰 디자인 */}
          {/* %로 하고싶은데 맞추기 번거로움 */}
          <div className="absolute top-[15px] left-[-20px] h-10 w-10 bg-white rounded-full"></div>
          <div className="absolute top-[69px] left-[-20px] h-10 w-10 bg-white rounded-full"></div>
          <div className="absolute top-[123px] left-[-20px] h-10 w-10 bg-white rounded-full"></div>
          <div className="absolute top-[177px] left-[-20px] h-10 w-10 bg-white rounded-full"></div>
          <div className="absolute top-[231px] left-[-20px] h-10 w-10 bg-white rounded-full"></div>

          {/* 다운로드 */}
          <div className="flex flex-col items-center justify-center h-full ml-5">
            <div className="flex items-center justify-center mb-3.5">
              <button
                className="flex items-center justify-center w-40 h-40 bg-white rounded-full"
                onClick={() => {
                  handleOpenModal();
                }}
                disabled={couponData.useYn === "N"}
              >
                <DownloadIcon isCoupon={couponData.useYn === "N"} />
              </button>
            </div>
            <button
              className="text-white"
              onClick={() => {
                handleOpenModal();
              }}
              disabled={couponData.useYn === "N"}
            >
              Download
            </button>
          </div>
        </div>
      </main>

      {/* 데스크탑 모달 */}
      <div className="hidden md:block">
        {/* <div className=""> */}
        <Modal
          isOpen={modalsOpen.modal1}
          onClose={closeAllModals}
          isCoupon={true}
        >
          <div className="px-9 py-8 w-[408px] h-full">
            <div className="h-[300px] flex flex-col ">
              <div className="text-center text-custom-gray-200">쿠폰 정보</div>
              <img
                src={couponData.storeImage}
                alt="상점 이미지"
                className="mt-5 mb-11 rounded-xl h-52 object-cover"
              />
            </div>

            {/* 쿠폰 디자인 양쪽 원으로 파인 부분  */}
            {/* 흰색 아래 흰색을 덮어서 그위에 블러처리하면 안될려나? */}

            <CouponSemicircleUIDesktop />

            <section className="flex flex-col items-center">
              <div className="w-11/12 text-center border-t-2 border-dashed border-custom-pink">
                <h2 className="text-base mt-12 mb-2.5">{couponData.name}</h2>
                <h3 className="text-sm mb-2.5 text-custom-orange">
                  {couponData.subtitle}
                </h3>
                <h4 className="mb-5 text-xs">
                  기한: {`${couponData.startDate} ~ ${couponData.endDate}`}
                </h4>
                <button
                  className="w-full text-xs text-white rounded h-9 bg-custom-pink"
                  onClick={() => {
                    openSpecificModal("modal2"); // 'modal2' 문자열을 인자로 전달
                  }}
                >
                  직원확인
                </button>
              </div>
            </section>
          </div>
        </Modal>

        <Modal
          isOpen={modalsOpen.modal2}
          onClose={closeAllModals}
          isCoupon={true}
        >
          <div className="px-9 py-8 w-[408px] h-full">
            <div className="h-[300px]">
              <div className="text-center text-custom-gray-200">직원 확인</div>
              <div className="flex items-center justify-center h-5/6">
                <img
                  className={isCheck ? "w-64" : null}
                  src={isCheck ? couponData.qrCode : EmployeeVerificationIcon}
                  alt="QR코드 이미지"
                />
              </div>
            </div>

            {/* 쿠폰 디자인 양쪽 원으로 파인 부분  */}
            <CouponSemicircleUIDesktop />

            <section className="flex flex-col items-center">
              <div className="w-11/12 border-t-2 border-dashed border-custom-pink ">
                {/* 대쉬바 밑에 내용 전체 div */}
                <div className="mb-7">
                  <div className="flex items-center mb-2 mt-9">
                    <button
                      className="mr-1"
                      onClick={() => {
                        setIsCheck(!isCheck);
                      }}
                    >
                      <CheckIcon isCheck={isCheck} />
                    </button>
                    <p className="text-[11px] text-black">
                      해당 쿠폰의 상점 직원이 맞습니다. (필수)
                    </p>
                  </div>
                  <div className="text-[#FF0000] text-xs">
                    <p>※ 발급 정보는 마이페이지에서 수정가능합니다.</p>
                    <p>※ 쿠폰 발급 이후 발급 정보 수정이 불가합니다.</p>
                    <p>※ 본인 이외에 쿠폰 발급은 불가합니다.</p>
                  </div>
                </div>

                <button
                  className={`w-full h-9 rounded  text-white text-xs ${
                    isCheck
                      ? "bg-custom-pink"
                      : "bg-[#B2B2B2] cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (isCheck) {
                      openSpecificModal("modal3");
                    }
                  }}
                  disabled={!isCheck}
                >
                  사용하기
                </button>
              </div>
            </section>
          </div>
        </Modal>

        <Modal
          isOpen={modalsOpen.modal3}
          onClose={closeAllModals}
          isCoupon={true}
          isLast={true}
        >
          <div className="px-9 py-8 w-[408px] h-full">
            <div className="h-[300px]">
              <div className="text-center text-custom-gray-200">쿠폰 정보</div>
              <img
                src={couponData.storeImage}
                alt="상점 이미지"
                className="mt-5 mb-11 grayscale rounded-xl h-52 w-full object-cover"
              />
              <div className="w-[160px] h-[160px] text-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-custom-pink rounded-full flex flex-col items-center justify-center bg-white/75">
                <p className="text-4xl font-bold text-custom-pink">
                  사용
                  <br />
                  완료
                </p>
              </div>
            </div>

            <CouponSemicircleUIDesktop isLast={true} />

            <section className="flex flex-col items-center">
              <div className="w-11/12 border-dashed border-t-2 border-[#B2B2B2] text-center">
                <h2 className="text-base mt-12 mb-2.5">{couponData.name}</h2>
                <h3 className="text-sm mb-2.5 text-custom-orange">
                  {couponData.subtitle}
                </h3>
                <h4 className="mb-5 text-xs">
                  기한: {`${couponData.startDate} ~ ${couponData.endDate}`}
                </h4>
                <button
                  className="w-full h-9 rounded bg-[#B2B2B2] text-white text-xs"
                  onClick={() => {
                    closeAllModals();
                    handleCouponUsed(couponData.id);
                  }}
                >
                  닫기
                </button>
              </div>
            </section>
          </div>
        </Modal>
      </div>
      {/* //모달 */}
    </>
  );
};

const CouponSemicircleUIDesktop = ({ isLast }) => {
  return (
    <>
      <div
        className={`absolute w-14 h-14 bg-white rounded-full top-[308px] left-[-20px] border-4 ${
          isLast ? "border-gray-300" : "border-custom-pink"
        }`}
      ></div>
      <div
        className={`absolute w-14 h-14 bg-white rounded-full top-[308px] right-[-20px] border-4 ${
          isLast ? "border-gray-300" : "border-custom-pink"
        }`}
      ></div>
    </>
  );
};
const CouponSemicircleUIMobile = ({ isLast }) => {
  return (
    <>
      <div
        className={`absolute w-10 h-10 bg-white rounded-full top-[204px] left-[-15px] border-4 ${
          isLast ? "border-gray-300" : "border-custom-pink"
        }`}
      ></div>
      <div
        className={`absolute w-10 h-10 bg-white rounded-full top-[204px] right-[-15px] border-4 ${
          isLast ? "border-gray-300" : "border-custom-pink"
        }`}
      ></div>
    </>
  );
};

export default CouponCard;
