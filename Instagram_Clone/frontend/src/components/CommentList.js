import React, { useEffect, useState } from "react";
// import Axios from "axios";
import { axiosInstance } from "../api";
import { Input, Button } from "antd";
import Comment from "./Comment";
export default function CommentList({ post }) {
  const [commentList, setCommentList] = useState([]);

  const apiURL = `/api/post/${post.id}/comments/`;
  const headers = {
    Authorization: ` JWT ${JSON.parse(localStorage.getItem("jwtToken"))}`,
  }; //인증 헤더에 JWT 올리기
  const [commnetContent, setCommnetContent] = useState("");

  useEffect(() => {
    axiosInstance
      .get(apiURL, { headers })
      .then((response) => {
        const { data } = response;
        console.log("loaded response:", response);
        setCommentList(data);
      })
      .catch((error) => {
        //error.response;
      }); //then은 성공 catch는 실패시
    console.log("Mounted");
  }, []);
  const handleCommentSave = async () => {
    const apiURL = `/api/post/${post.id}/comments/`;

    console.group("코멘트 save 핸들링중");
    try {
      const response = await axiosInstance.post(
        apiURL,
        { message: commnetContent },
        { headers }
      );
      console.log(response);
      setCommnetContent("");
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }

    console.groupEnd();
  };
  return (
    <div>
      {commentList &&
        commentList.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

      <Input.TextArea
        style={{ marginBottom: ".5em" }}
        value={commnetContent}
        onChange={(e) => setCommnetContent(e.target.value)}
      />
      <Button
        block
        type="primary"
        disabled={commnetContent.length === 0}
        onClick={handleCommentSave}
      >
        댓글 작성
      </Button>
    </div>
  );
}
