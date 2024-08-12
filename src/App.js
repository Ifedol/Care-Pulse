import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Appointment from "./pages/Appointment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/onboarding" element={<Onboarding />}></Route>
        <Route path="/appointment" element={<Appointment />}>
          {" "}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
