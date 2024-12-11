import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, FormProps, Input, App } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { Link, useNavigate } from "react-router";
import "./authStyle.scss";
import { useState } from "react";
import { loginAPI } from "@/services/api";
import { useAppContext } from "@/components/context/app.context";

type FieldType = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [submit, isSubmit] = useState(false);
  const { setUser, setIsAuthenticated } = useAppContext();
  const { notification, message } = App.useApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, password } = values;
    isSubmit(true);
    const res = await loginAPI(username, password);
    if (res.error) {
      notification.error({
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        message: "Đăng nhập thất bại",
        placement: "topRight",
      });
    }
    if (res.data) {
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      message.success("Login success!");
      navigate("/");
    }

    isSubmit(false);
  };

  return (
    <div className='container'>
      <div className='form'>
        <h1>Login</h1>
        <Divider />

        <Form
          name='register'
          initialValues={{ remember: true }}
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            name='username'
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
              prefix={<UserOutlined style={{ paddingRight: "10px" }} />}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item<FieldType>
            name='password'
            rules={[{ required: true, message: "Please input your password!" }]}
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
              Login
            </Button>
            <Paragraph style={{ fontSize: "18px", marginTop: "0.5rem" }}>
              or <Link to='/register'>register now!</Link>
            </Paragraph>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
