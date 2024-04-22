import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserAuthentication from "./pages/UserAuthentication";
import HomePage from "./pages/HomePage";
import Files from "./pages/Files";
import Test from "./pages/Test";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/user-authentication" Component={UserAuthentication} />
        <Route path="/files" Component={Files} />
        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
