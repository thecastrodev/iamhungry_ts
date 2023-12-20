import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Main from "./components/Main";

function App() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-500">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
