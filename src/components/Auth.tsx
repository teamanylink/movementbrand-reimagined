import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SignInForm } from "./auth/SignInForm";
import { SignUpForm } from "./auth/SignUpForm";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (location.state?.showSignup) {
      setIsSignUp(true);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="relative w-full">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBack}
        className="absolute left-4 top-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back to homepage</span>
      </Button>
      
      {isSignUp ? (
        <SignUpForm onSignInClick={() => setIsSignUp(false)} />
      ) : (
        <SignInForm onSignUpClick={() => setIsSignUp(true)} />
      )}
    </div>
  );
};

export default Auth;