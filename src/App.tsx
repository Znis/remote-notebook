import { useState } from "react";
import Login from "./components/login";
import Home from "./pages/homepage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = (data: boolean) => {
    setIsAuthenticated(data);
  };
  return isAuthenticated ? <Home></Home> : <Login onLogin={handleLogin}></Login>;
}

export default App;
