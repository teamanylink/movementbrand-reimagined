import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SignInForm } from "./auth/SignInForm";
import { SignUpForm } from "./auth/SignUpForm";

const Auth = () => {
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (location.state?.showSignup) {
      setIsSignUp(true);
    }
  }, [location.state]);

  if (isSignUp) {
    return <SignUpForm onSignInClick={() => setIsSignUp(false)} />;
  }

  return <SignInForm onSignUpClick={() => setIsSignUp(true)} />;
};

export default Auth;