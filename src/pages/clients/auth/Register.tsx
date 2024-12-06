import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { FormProps } from "antd";
import { Button, Divider, Form, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router";
import Paragraph from "antd/es/typography/Paragraph";
import { loginAPI } from "@/services/api";

type FieldType = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
};

export default function Register() {
  const [submit, isSubmit] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log(values);

    const res = await loginAPI("admin@gmail.com", "123456");
    console.log(res);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className='register'>
      <div className='form'>
        <h1>Register</h1>
        <Divider />

        <Form
          name='register'
          initialValues={{ remember: true }}
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType>
            name='fullName'
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              style={{
                height: "3rem",
                fontSize: "20px",
              }}
              size='large'
              prefix={<UserAddOutlined style={{ paddingRight: "10px" }} />}
              type='text'
              placeholder='Your name'
            />
          </Form.Item>
          <Form.Item<FieldType>
            name='phone'
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                min: 9,
                max: 13,
                message: "Invalid phone number!",
              },
            ]}
          >
            <Input
              type='number'
              style={{
                height: "3rem",
                fontSize: "20px",
              }}
              size='large'
              prefix={<PhoneOutlined style={{ paddingRight: "10px" }} />}
              placeholder='Phone'
            />
          </Form.Item>
          <Form.Item<FieldType>
            name='email'
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email pattern!" },
            ]}
          >
            <Input
              style={{
                height: "3rem",
                fontSize: "20px",
              }}
              size='large'
              prefix={<MailOutlined style={{ paddingRight: "10px" }} />}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item<FieldType>
            name='password'
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              style={{
                height: "3rem",
                fontSize: "20px",
              }}
              size='large'
              prefix={<LockOutlined style={{ paddingRight: "10px" }} />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              style={{ fontSize: "20px" }}
              block
              size='large'
              type='primary'
              htmlType='submit'
              loading={submit}
            >
              Register
            </Button>
            <Paragraph style={{ fontSize: "18px", marginTop: "0.5rem" }}>
              or <Link to='/login'>Login now!</Link>
            </Paragraph>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
