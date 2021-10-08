import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";
import { Alert } from "antd";

const apiURL = "http://localhost:8000/api/post/";
//이 경로로 바로 요청을 하면 거부 먹는다 Why?==>CORS 때문에 가장 편한거는 장고 header를 사용해 허가해주는것

function PostList() {
  // const value = localStorage.getItem("jwtToken");
  //useState를 비워두면 undefined가 되기 때문에 빈 Array를 채워두자
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: ` JWT ${JSON.parse(localStorage.getItem("jwtToken"))}`,
    }; //인증 헤더에 JWT 올리기
    Axios.get(apiURL, { headers })
      .then((response) => {
        const { data } = response;
        console.log("loaded response:", response);
        setPostList(data);
      })
      .catch((error) => {
        //error.response;
      }); //then은 성공 catch는 실패시
    // Axios({ method: "GET", url: apiURL, headers })
    //   .then((response) => {
    //     const { data } = response;
    //     console.log("loaded response:", response);
    //     setPostList(data);
    //   })
    //   .catch((error) => {
    //     console.log("에러 발생");
    //   }); //then은 성공 catch는 실패시
    console.log("Mounted");
  }, []); //컴포넌트가 mount될시 1회만 호출됨(배열을 비워 놓으면)
  return (
    <div>
      {postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다." />
      )}
      {postList.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
}

export default PostList;
