import React, { useState, useEffect, useMemo } from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import Axios from "axios";
import useAxios from "axios-hook"; //왜 안되는지 모르겠네;

export default function SuggestionList({ style }) {
  // const apiUrl = "http://localhost:8000/accounts/suggestions/";
  // const headers = {
  //   Authorization: ` JWT ${JSON.parse(localStorage.getItem("jwtToken"))}`,
  // }; //인증 헤더에 JWT 올리기
  // const [{ data: userList, loading, error }, refetch] = useAxios({
  //   url: apiUrl,
  //   headers,
  // }); //useAxios가 모든 요청을 보내고 값을 받는다
  const [userList, setUserList] = useState(); //userList가 오기 때문에 리스트로 초기화
  const [userList_2, setUserList_2] = useState([]);
  const headers = {
    Authorization: ` JWT ${JSON.parse(localStorage.getItem("jwtToken"))}`,
  }; //인증 헤더에 JWT 올리기

  useEffect(() => {
    async function fetchUserList() {
      const apiUrl = "http://localhost:8000/accounts/suggestions/";

      try {
        const { data } = await Axios.get(apiUrl, { headers });
        setUserList(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, []);

  useEffect(() => {
    if (!userList) {
      setUserList_2([]);
    } else
      setUserList_2(userList.map((user) => ({ ...user, is_follow: false })));
  }, [userList]); //,뒤에는 의존성 넣는곳

  const onFollowUser = (username) => {
    // setUserList_2((prevUserList) => {
    //   return prevUserList.map((user) => {
    //     if (user.usernmae === username) {
    //       return { ...user, is_follow: true };
    //     } else return user;
    //   });
    // });
    Axios.post(
      "http://localhost:8000/accounts/follow/",
      { username },
      { headers }
    )
      .then((response) => {
        setUserList_2((prevUserList) => {
          return prevUserList.map((user) =>
            user.username !== username ? user : { ...user, is_follow: true }
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div style={style}>
      {/* {loading && <div>Loading ...</div>}
      {error && <div>로딩중 에러 발생!</div>}
      <button onClick={() => refetch()}>Reload </button> */}
      <Card title="Suggestions for You" size="small">
        {userList_2.map((suggestionUser) => (
          <Suggestion
            key={suggestionUser.username}
            suggestionUser={suggestionUser}
            onFollowUser={onFollowUser}
          />
          //항상 생각할것 ==>map으로 순회를 돌면 유니크한 key값이 필요로 하다는 것이다.
        ))}
      </Card>
    </div>
  );
}
