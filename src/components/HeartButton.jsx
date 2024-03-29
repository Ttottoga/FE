import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as HeartIcon } from "./../assets/images/heartIcon.svg";
import { LoginContext } from "../contexts/LoginContextProvider";

const HeartButton = ({ like, id, borderColor, w, h }) => {
  const { isLogin, token } = useContext(LoginContext);
  const [isLiked, setIsLiked] = useState(like); // 관심 상점 여부
  const [isCliked, setCliked] = useState(false); // 맨 처음에 useEffect 내에서 api 호출을 하지 않기 위해 사용

  /** 하트 버튼을 누를 때마다 실행되는 함수 */
  const handleLikeClick = (e) => {
    e.preventDefault(); // 이벤트 버블링 방지
    e.stopPropagation(); // 이벤트 전파 막기
    setIsLiked((prev) => !prev);
    setCliked(true);
  };

  /** isLiked가 변할 때마다 실행되는 useEffect */
  // TODO: 정확한 api 주소 연결
  useEffect(() => {
    const fetchData = async () => {
      if (!isCliked) return;
      // 하트 등록하는 경우
      if (isLiked) {
        axios
          .post(`/stores/${id}/heart`, null, {
            headers: {
              Authorization: token,
            },
          })
          .catch((error) => console.log("하트 등록 api 연결 실패!"));
      } else {
        // 하트 해제하는 경우
        axios
          .delete(`/stores/${id}/heart`, {
            headers: {
              Authorization: token,
            },
          })
          .catch((error) => console.log("하트 해제 api 연결 실패!"));
      }
    };
    fetchData();
  }, [isLiked]);

  return (
    <>
      {isLogin && (
        <button onClick={handleLikeClick}>
          <HeartIcon
            stroke={isLiked ? "#FF0069" : `${borderColor}`}
            fill={isLiked ? "#FF0069" : "none"}
            width={w}
            height={h}
          />
        </button>
      )}
    </>
  );
};

export default HeartButton;
