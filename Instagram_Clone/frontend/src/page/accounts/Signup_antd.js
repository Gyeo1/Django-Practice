import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; //
import { axiosInstance } from "../../api";
import { Alert, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

function Signup() {
  //antd의 Form의 코드를 참조했다.
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      console.log("Success:", values);

      setFieldErrors({}); //초기화
      const data = { username, password };

      try {
        const response = await axiosInstance.post("/accounts/signup/", data);
        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        history.push("/accounts/login");
      } catch (error) {
        //await는 항상 async안에서 사용한다.
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
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
  );
}
export default Signup;
