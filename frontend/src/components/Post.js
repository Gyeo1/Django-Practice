import React from "react";

function Post({ post }) {
  const { id, caption, location, photo } = post;
  //    <div>{JSON.stringify(post)}</div> //object를 직렬화 해서 보여줘야된다.
  return (
    //key를 쓰는 이유 ==>map을 사용해서 전체를 순회? Element의 식별자가 필요로 하다
    <div>
      {caption}, {location}
      <img src={photo} alt={caption} style={{ width: "100px" }} />
    </div>
  );
}

export default Post;
