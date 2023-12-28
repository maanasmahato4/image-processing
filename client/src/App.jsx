import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Convert from "./pages/Convert";
import Custom from "./pages/Custom";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />}>
        <Route index element={<Convert />} />
        <Route path="custom" element={<Custom />} />
      </Route>
    </Routes>
  )
};

export default App;