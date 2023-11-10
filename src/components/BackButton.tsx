import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="back_button" onClick={() => navigate(-1)}>
      Go back
    </button>
  );
}
