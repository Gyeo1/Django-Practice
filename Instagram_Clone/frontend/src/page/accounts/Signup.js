import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; //
import { axiosInstance } from "../../api";
import { Alert, Form, Input } from "antd";

function SignupNon() {
  const [inputs, setInputs] = useState({ username: "", password: "" }); //useEffect에서 사용하기 위해 초기화
  const [errors, setErrors] = useState({});
  const [formDisable, setFormDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  //inputs값이 변할때 마다 호출
  useEffect(() => {
    const isEnable = Object.values(inputs).every((s) => s.length > 0); //문자열이 전부다 0보다 커야됨
    // const isEnable = inputs.username.length > 0 && inputs.password.length > 0;
    setFormDisable(!isEnable);
  }, [inputs]);

  //인자값 변경함수
  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs, //이전 inputs 값을 받아와서 이어써주기 위해 사용한다
      [name]: value, //여기서 []은 리스트 ,array가 아니라 이 식을 평가하라는 뜻이다(in javascript)
    });
  };

  //제출시 호출되는 함수
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({}); //요청 보내기전 초기화 해주기
    //Axios 호출 함수
    axiosInstance
      .post("/accounts/signup/", inputs)
      .then((response) => {
        console.log("response:", response);
        history.push("accounts/login");
      })
      .catch((error) => {
        console.log("error:", error);
        if (error.response) {
          setErrors({
            username: (error.response.data.username || []).join(" "),
            password: (error.response.data.password || []).join(" "),
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" name="username" onChange={onChange} />
          {errors.username && <Alert type="error" message={errors.username} />}
        </div>
        <div>
          <input type="password" name="password" onChange={onChange} />
          {errors.password && <Alert type="error" message={errors.username} />}
        </div>
        <input
          type="submit"
          value="회원 가입"
          disabled={loading || formDisable}
        />
      </form>
    </div>
  );
}
export default SignupNon;
