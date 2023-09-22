import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Instagram } from "lucide-react";
import { signInWithGoogle } from "../../redux/slices/authSlice";

const GoogleSignInButton = () => {
  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };
  return (
    <Button
      className="w-full text-red-500"
      variant="secondary"
      onClick={handleGoogleSignIn}
    >
      <Instagram className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
