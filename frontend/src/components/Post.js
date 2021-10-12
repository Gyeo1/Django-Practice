import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card, Avatar, Comment, Tooltip } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import CommentList from "./CommentList";

function Post({ post, handleLike }) {
  const { id, caption, location, photo, tag_set, is_like, author } = post;
  const { username, avatar_url, name } = author;
  //    <div>{JSON.stringify(post)}</div> //object를 직렬화 해서 보여줘야된다.
  return (
    //key를 쓰는 이유 ==>map을 사용해서 전체를 순회? Element의 식별자가 필요로 하다
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} style={{ width: "100px" }} />}
        actions={[
          is_like ? (
            <HeartFilled onClick={() => handleLike({ post, is_like: false })} />
          ) : (
            <HeartOutlined
              onClick={() => handleLike({ post, is_like: true })}
            />
          ),
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={
                <img
                  src={`http://localhost:8000` + avatar_url}
                  alt={username}
                />
              }
            />
          }
          title={location}
          description={caption}
          style={{ marginBottom: "0.5em" }}
        />
        <CommentList post={post} />
      </Card>
      {/* {caption}, {location}
      <img src={photo} alt={caption} style={{ width: "100px" }} /> */}
    </div>
  );
}

export default Post;
