import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

import RegisterAccount from "../features/authentication/RegisterAccount";

// Page is meant do be displayed after user confirms email
// To provide a additional data

function Register() {
  const { isLoading, is_registration_complete, isAuth } = useUser();
  const navigate = useNavigate();

 
 

  useEffect(() => {
    if (!isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth && is_registration_complete) {
      navigate("/profile", { replace: true });
    }
  }, [isAuth]);

  if (isAuth && !is_registration_complete) {
    return <RegisterAccount />;
  }
}

export default Register;
