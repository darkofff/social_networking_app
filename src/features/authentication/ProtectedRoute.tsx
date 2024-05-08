import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";
import { useEffect } from "react";

import { ChildrenProp } from "../../types/ChildrenProp";
import { H1 } from "../../ui/Typography";

function ProtectedRoute({ children }: ChildrenProp) {
  const { error, user, isLoading, isAuth } = useUser();

  const navigate = useNavigate();
  const isRegistered = user?.is_registration_complete;

  // If user not authenticated, navigate to landing page
  useEffect(() => {
    if (!isAuth && !isLoading) navigate("/", { replace: true });
  }, [isAuth, isLoading, navigate]);

  // If user is authenticated but has not registered acount, navigate to register page
  useEffect(() => {
    if (!isRegistered && isAuth) {
      navigate("register", { replace: true });
    }
  }, [isRegistered, isAuth]);

  // If user is both authenticated and finished creating account

  if (isAuth && isRegistered) {
    return children;
  }
}

export default ProtectedRoute;

/* 

// If for some reason something is wrong then this
  if (isLoading) return <H1>Loading...</H1>;
*/
