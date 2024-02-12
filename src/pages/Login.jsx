import React from "react";
import NaverLogin from "react-naver-login";
import KakaoLogin from "react-kakao-login";
import LoginImage from "../assets/loginimage.png";

export const Login = () => {
  const naverClientId = "NAVER_CLIENT_ID";
  const naverCallbackUrl = "NAVER_CALLBACK_URL";
  const kakaoClientId = "KAKAO_CLIENT_ID";
  // const kakaoCallbackUrl = "KAKAO_CALLBACK_URL";

  const onSuccessNaverLogin = (naverUser) => {
    // 네이버 로그인 성공 시
    console.log("네이버 로그인 성공!", naverUser);
  };

  const onFailureNaverLogin = (result) => {
    // 네이버 로그인 실패 시
    console.error("네이버 로그인 실패!", result);
  };

  const onSuccessKakaoLogin = (kakaoUser) => {
    // 카카오 로그인 성공 시
    console.log("KakaoTalk login success!", kakaoUser);
  };

  const onFailureKakaoLogin = (result) => {
    // 카카오 로그인 실패 시
    console.error("KakaoTalk login failure!", result);
  };

  return (
    <div className="flex items-center h-screen ">
      <div className="hidden sm:block mr-[7.69rem] ml-[15.81rem]">
        <img
          src={LoginImage}
          alt="로그인 이미지"
          className="w-[44.375rem] h-[32.4375rem]"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      <div className="mx-auto p-4 sm:p-0 ">
        <div className=" mr-[31.75rem] sm:text-[2.1875rem] text-[1.5rem] font-semibold mb-4">
          간편 로그인 후 <br />
          이용 가능합니다.
        </div>

        <div className="mr-[19.38rem] whitespace-nowrap w-[32.125rem] h-[1.3125rem] sm:text-[1.125rem] text-[0.9rem] text-gray-700 mb-[3.245rem] opacity-50">
          간편 로그인 정보는 또또가에 연동되어 더 빠르게 이용할 수 있어요!
        </div>

        <NaverLogin
          clientId={naverClientId}
          callbackUrl={naverCallbackUrl}
          onSuccess={onSuccessNaverLogin}
          onFailure={onFailureNaverLogin}
          render={(props) => (
            <button
              className=" mb-[1.19rem]  flex items-center bg-[#57BC63] rounded-md sm:h-[4.125rem] sm:w-[32.0625rem] w-[28rem] h-[3rem]"
              onClick={props.onClick}
            >
              <svg
                style={{ marginRight: "5.44rem" }}
                className="ml-[3rem]"
                width="42"
                height="41"
                viewBox="0 0 42 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.693 7.6875V20.7172L16.307 7.6875H6.23438V33.3125H16.307V20.5L25.693 33.3125H35.7656V7.6875H25.693Z"
                  fill="white"
                />
              </svg>

              <span className="sm:text-[1.5625rem]  font-medium flex items-center justify-center font=['Inter']  text-[#FFF]">
                네이버 로그인
              </span>
            </button>
          )}
        />
        <KakaoLogin
          token={kakaoClientId}
          onSuccess={onSuccessKakaoLogin}
          onFail={onFailureKakaoLogin}
          render={(props) => (
            <button
              className="flex items-center bg-[#FFD600] rounded-md  sm:h-[4.125rem] sm:w-[32.0625rem] w-[28rem] h-[3rem]"
              onClick={props.onClick}
            >
              <svg
                style={{ marginRight: "5.44rem" }}
                className="ml-[3rem]"
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.9594 7C13.7059 7 7 12.425 7 19.075C7 23.275 9.75115 26.95 13.7059 29.225L12.6742 35L19.0363 30.8C19.896 30.975 20.9277 30.975 21.7874 30.975C30.0408 30.975 36.7468 25.55 36.7468 18.9C36.9187 12.425 30.2128 7 21.9594 7Z"
                  fill="#341C15"
                />
              </svg>

              <span className="sm:text-[1.5625rem] font-medium flex items-center justify-center font=['Inter'] text-[#341C15]">
                카카오톡 로그인
              </span>
            </button>
          )}
        />
      </div>
    </div>
  );
};
