import { useEffect, ReactNode } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const { isExpired, decodedToken } = useJwt(token);
  console.log(decodedToken);
  useEffect(() => {
    if (isExpired) {
      navigate("/login");
    }
  }, [isExpired, navigate]);

  return !isExpired ? <>{children}</> : null;
};

export default PrivateRoute;
