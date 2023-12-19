import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Storage from "./pages/Storage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/storage" element={<Storage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
    </Routes>
  )
};

export default App;