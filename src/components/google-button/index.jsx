import { Button } from "../ui/button";
import { Instagram } from "lucide-react";

const GoogleSignInButton = () => {
  return (
    <Button
      className="w-full text-red-500"
      variant="secondary"
      onClick={() => {}}
    >
      <Instagram className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
