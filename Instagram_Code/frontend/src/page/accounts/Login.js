import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom"; //
import { axiosInstance } from "../../api";
import { Card, Alert, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import useLocalStorage from "../../utils/useLocalStorage"; //키와 초기값 지정가능, CustomHook이다.
import LoginRequiredRouter from "../../utils/LoginRequiredRouter";
import { parseErrorMessages } from "../../utils/forms";
// import { SaveUserInfo } from "../../utils/UpdateJWT";

function Login() {
  localStorage.removeItem("jwtToken");
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  //디폴트로 빈 공백 주고 키는 jwtToken, JWT 토큰을 Localstorage에 저장
  //CustomHook을 사용해 원하는 변수의 값을 LocalStorage에 저장하는게 핵심이다.
  //다른 방법으로는 useEffect를 활용하는 방법이 있다.
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});
  const location = useLocation(); //useLoacte로 어느 경로를 통해서 왔는지 확인 가능하다
  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      setFieldErrors({}); //초기화
      const data = { username, password };

      try {
        const response = await axiosInstance.post("/accounts/token/", data);
        //토큰을 response로 받아오고 이를 아래 처럼 값을 따로 저장한다.
        const {
          data: { token: jwtToken },
        } = response; //jwtToken=response.data.token의 또다른 표현식이다
        await setJwtToken(jwtToken); //할당이 된다

        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        console.log("location.state: ", location.state); //어느 경로로 Login에 접근했는지 출력

        window.location.replace(loginRedirectUrl.pathname); //TODO: 이동할 주소 추가 예정
      } catch (error) {
        //await는 항상 async안에서 사용한다.
        if (error.response) {
          notification.open({
            message: "로그인 실패",
            description: "아이디/암호를 확인해 주세요",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
          const { data: fieldsErrorMessages } = error.response;

          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
    fn();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card title="로그인">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            //더 다양한 Rule은 antd의 Form에서 제공해주는 docs를 참고해라
            {
              required: true,
              message: "Please input your username!",
            },
            { min: 5, message: "5글자 이상을 입력해 주세요" },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
export default Login;
