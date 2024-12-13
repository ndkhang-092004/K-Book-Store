import { Button, Result } from "antd";
import { useAppContext } from "components/context/app.context";
import { Link, useLocation } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAppContext();
  const location = useLocation();

  const isAdminRoute = location.pathname.includes("admin");

  if (isAdminRoute && isAuthenticated) {
    const role = user?.role === "USER";
    if (role)
      return (
        <Result
          status='403'
          style={{
            width: "100%",
            position: "fixed",
            top: "20%",
            left: "0%",
          }}
          title='403'
          subTitle='Sorry, you are not authorized to access this page.'
          extra={
            <Button type='primary'>
              <Link to='/'>Back Home</Link>
            </Button>
          }
        />
      );
  }

  if (!isAuthenticated)
    return (
      <Result
        status='403'
        style={{
          width: "100%",
          position: "fixed",
          top: "20%",
          left: "0%",
        }}
        title='403'
        subTitle='Sorry, please login before access this page.'
        extra={
          <Button type='primary'>
            <Link to='/login'>Login</Link>
          </Button>
        }
      />
    );

  return <>{children}</>;
}
