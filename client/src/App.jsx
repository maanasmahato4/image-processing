import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Storage from "./pages/Storage";
import Convert from "./pages/Convert";
import Custom from "./pages/Custom";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />}>
        <Route index element={<Convert />} />
        <Route path="custom" element={<Custom />} />
      </Route>
      <Route path="/storage" element={<Storage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
    </Routes>
  )
};

export default App;