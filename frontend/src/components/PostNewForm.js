import React, { useState } from "react";
import { Form, Button, Input } from "antd";

export default function PostNewForm() {
  const [fieldErrors, setFieldErrors] = useState({});
  const handleFinish = () => {};

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
      onFinish={handleFinish}
      autoComplete={"false"}
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
  );
}
