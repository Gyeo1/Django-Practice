import React, { useState, useEffect } from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import Axios from "axios";

const SuggestionList = ({ style }) => {
  const [userList, setUserList] = useState([]); //userList가 오기 때문에 리스트로 초기화
  useEffect(() => {
    async function fetchUserList() {
      const apiUrl = "http://localhost:8000/accounts/suggestions/";
      const headers = {
        Authorization: ` JWT ${JSON.parse(localStorage.getItem("jwtToken"))}`,
      }; //인증 헤더에 JWT 올리기
      try {
        const { data } = await Axios.get(apiUrl, { headers });
        setUserList(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, []);
  return (
    <div style={style}>
      <Card title="Suggestions for You" size="small">
        {userList.map((suggestionUser) => (
          <Suggestion
            key={suggestionUser.username}
            suggestionUser={suggestionUser}
          />
          //항상 생각할것 ==>map으로 순회를 돌면 유니크한 key값이 필요로 하다는 것이다.
        ))}
      </Card>
    </div>
  );
};

export default SuggestionList;
