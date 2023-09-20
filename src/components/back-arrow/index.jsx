import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ num, children }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(num)}
      className="md:hidden flex items-center gap-x-2 hover:gap-x-3 transition-all duration-150 text-orange-400 group"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="">{children || "Go Back"}</span>
    </button>
  );
};
export default BackButton;
