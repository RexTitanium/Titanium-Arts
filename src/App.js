import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  const [user, setUser] = useState("");
  return (
    <Router>
      <div className="App">
        <Main user={user} setUser={setUser} />
      </div>
    </Router>
  );
}

export default App;
