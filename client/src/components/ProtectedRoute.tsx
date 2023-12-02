import { useEffect, ReactNode } from "react";
import { useJwt, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const { isExpired } = useJwt(token);
  useEffect(() => {
    if (isExpired) {
      navigate("/login");
    }
  }, [isExpired, navigate]);

  return !isExpired ? <>{children}</> : null;
};

export default PrivateRoute;
