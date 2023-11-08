import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <Link to="peoples">peoples</Link>
      </div>
      <div>
        <Link to="favorites">favorites</Link>
      </div>
    </div>
  );
}

export default App;
