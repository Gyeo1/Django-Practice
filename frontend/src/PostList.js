import React, { useEffect, useState } from "react";
import Axios from "axios";

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
      <h2>Post List</h2>
      {postList.map((post) => {
        const { id, caption, location, photo } = post;
        //    <div>{JSON.stringify(post)}</div> //object를 직렬화 해서 보여줘야된다.
        return (
          //key를 쓰는 이유 ==>map을 사용해서 전체를 순회? Element의 식별자가 필요로 하다
          <div key={id}>
            {caption}, {location}
            <img src={photo} alt={caption} style={{ width: "100px" }} />
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
