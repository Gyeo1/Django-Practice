import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";

const apiURL = "http://localhost:8000/api/post/";
//이 경로로 바로 요청을 하면 거부 먹는다 Why?==>CORS 때문에 가장 편한거는 장고 header를 사용해 허가해주는것

function PostList() {
  //useState를 비워두면 undefined가 되기 때문에 빈 Array를 채워두자
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Axios.get(apiURL)
      .then((response) => {
        const { data } = response;
        console.log("loaded response:", response);
        setPostList(data);
      })
      .catch((error) => {
        //error.response;
      }); //then은 성공 catch는 실패시
    console.log("Mounted");
  }, []); //컴포넌트가 mount될시 1회만 호출됨(배열을 비워 놓으면)
  return (
    <div>
      {postList.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
}

export default PostList;
