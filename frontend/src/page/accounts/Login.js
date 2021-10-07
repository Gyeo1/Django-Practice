import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; //
import Axios from "axios";
import { Card, Alert, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import useLocalStorage from "../../utils/useLocalStorage"; //키와 초기값 지정가능, CustomHook이다.

function Login() {
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  //디폴트로 빈 공백 주고 키는 jwtToken, JWT 토큰을 Localstorage에 저장
  //CustomHook을 사용해 원하는 변수의 값을 LocalStorage에 저장하는게 핵심이다.
  //다른 방법으로는 useEffect를 활용하는 방법이 있다.

  const history = useHistory();

  //useLoacl Storage로 jwt 토큰을 jwtToken이란 곳에 담과 localstorage에 저장한다.
  // const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", ""); //디폴트로 빈 공백 주고 키는 jwtToken

  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;

      setFieldErrors({}); //초기화
      const data = { username, password };

      try {
        const response = await Axios.post(
          "http://localhost:8000/accounts/token/",
          data
        ); //토큰을 response로 받아오고 이를 아래 처럼 값을 따로 저장한다.
        const {
          data: { token: jwtToken },
        } = response; //jwtToken=response.data.token의 또다른 표현식이다
        setJwtToken(jwtToken);

        console.log("jwtToken:", jwtToken);
        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        // history.push("/"); //TODO: 이동할 주소 추가 예정
      } catch (error) {
        //await는 항상 async안에서 사용한다.
        if (error.response) {
          notification.open({
            message: "로그인 실패",
            description: "아이디/암호를 확인해 주세요",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
          const { data: fieldsErrorMessages } = error.response;
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {}
            ) //reduce로 누적해 가면서 에러 값들을 합친다
          );
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
