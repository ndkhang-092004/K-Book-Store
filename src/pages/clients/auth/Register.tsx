import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { FormProps } from "antd";
import { App, Button, Divider, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerAPI } from "@/services/api";
import Paragraph from "antd/es/typography/Paragraph";

type FieldType = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [submit, isSubmit] = useState(false);
  const { message } = App.useApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    isSubmit(true);
    const res = await registerAPI(values);
    if (res.error) {
      message.error(res.message);
    }
    if (res.data) {
      message.success("Register success");
      navigate("/login");
    }

    isSubmit(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
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
                type='text'
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
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
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
    </>
  );
}
