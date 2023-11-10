import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/peoples">peoples</Link>
        <Link to="/favorites">favorites</Link>
      </nav>
    </div>
  );
}

export default App;
