import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";
import { Alert } from "antd";

function PostList() {
  // const value = localStorage.getItem("jwtToken");
  //useState를 비워두면 undefined가 되기 때문에 빈 Array를 채워두자
  const [postList, setPostList] = useState([]);
  const [postLikeList, setPostLikeList] = useState([]);
  const apiURL = "http://localhost:8000/api/post/";
  //이 경로로 바로 요청을 하면 거부 먹는다 Why?==>CORS 때문에 가장 편한거는 장고 header를 사용해 허가해주는것
  const headers = {
    Authorization: ` JWT ${JSON.parse(localStorage.getItem("jwtToken"))}`,
  }; //인증 헤더에 JWT 올리기
  useEffect(() => {
    Axios.get(apiURL, { headers })
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

  // useEffect(() => {
  //   setPostLikeList(setPostList);
  // }, [setPostList]);

  const handleLike = async ({ post, is_like }) => {
    //좋아요 기능 구성
    const apiURL = `http://localhost:8000/api/post/${post.id}/like/`;
    const method = is_like ? "POST" : "DELETE"; //좋아요를 누르면 Post즉 등록, 아니면 삭제

    try {
      const response = await Axios({
        url: apiURL,
        method,
        headers,
      });
      //여기에 새로고침해서 다시 페이지 받아오는 코드 추가
      // setPostLikeList((prevList) => {

      //   return prevList.map((currentPost) =>
      //     currentPost === post
      //       ? { ...currentPost, is_like: is_like }
      //       : currentPost
      //   );
      // });
      console.log("Response", response);
      window.location.replace("/");
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <div>
      {postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다." />
      )}
      {postList.map((post) => {
        return <Post post={post} key={post.id} handleLike={handleLike} />;
      })}
    </div>
  );
}

export default PostList;
