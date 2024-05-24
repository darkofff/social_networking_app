import AuthModal from "../features/authentication/AuthModal";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NonModalRow from "../ui/NonModalRow";

function Landing() {
  const { isAuth, is_registration_complete } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && is_registration_complete) {
      navigate("/profile", { replace: true });
    }
  }, [isAuth, is_registration_complete]);

  useEffect(() => {
    if (isAuth && !is_registration_complete)
      navigate("/register", { replace: true });
  }, [isAuth, is_registration_complete]);

  if (!isAuth) {
    return (
      <NonModalRow>
        <AuthModal />
      </NonModalRow>
    );
  }
}

export default Landing;
