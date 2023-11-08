import { useNavigate, useParams } from "react-router-dom";
import personStore from "../store/PersonStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const Person = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!id) {
      personStore.getPerson(id);
    } else {
      navigate("/peoples");
    }
  }, [id, navigate]);

  if (personStore.loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{personStore.person?.name}</h1>
      <p>{personStore.person?.gender}</p>
      <button onClick={() => navigate("/peoples")}>Go to Home</button>
    </div>
  );
});

export default Person;
