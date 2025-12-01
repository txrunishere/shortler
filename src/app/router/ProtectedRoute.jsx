import { useNavigate } from "react-router";
import { useUser } from "../providers/user-provider";
import { useEffect } from "react";
import { Loader } from "@/components/common";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, userLoading, navigate]);

  if (userLoading) {
    return <Loader />;
  }

  return children;
};
