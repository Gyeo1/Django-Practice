import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Comment, Avatar, Tooltip, Input, Button } from "antd";
import moment from "moment";

export default function CommentList({ post }) {
  const [commentList, setCommentList] = useState([]);
  const apiURL = `http://localhost:8000/api/post/${post.id}/comments/`;
  const headers = {
    Authorization: ` JWT ${JSON.parse(localStorage.getItem("jwtToken"))}`,
  }; //인증 헤더에 JWT 올리기
  const [commnetContent, setCommnetContent] = useState("");

  useEffect(() => {
    Axios.get(apiURL, { headers })
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
  const handleCommentSave = () => {
    const apiURL = ``;
    Axios.post(apiURL);
    console.group("코멘트 save 핸들링중");
    console.log(commnetContent);
    console.groupEnd();
  };
  return (
    <div>
      <Comment
        author={"Gyeol"}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        atetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
      current comment content:{commnetContent}
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
