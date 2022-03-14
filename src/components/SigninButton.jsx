import { useNavigate } from "react-router-dom";

export default function SigninButton(props) {
  const navigate = useNavigate();

  return (
    <button
      className="text-gray-200 py-2 px-3 rounded"
      onClick={() => navigate("/signin")}
    >
      Sign In
    </button>
  );
}
