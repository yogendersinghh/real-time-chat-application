import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Chat from "./component/Chat/Chat";
import Join from "./component/Join/Join";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Join />} />
        <Route path="/chat" exact element={<Chat />} />
      </Routes>
    </Router>
  );
};
export default App;
