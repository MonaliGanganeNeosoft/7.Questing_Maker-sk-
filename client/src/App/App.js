import "./App.css";
import React, { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

const Navb = lazy(() => import('../Components/Navbar/Navb'));
const Login = lazy(() => import('../Components/Login/Login'));
const Signup = lazy(() => import('../Components/Signup/Signup'));
const Dashboard = lazy(() => import('../Components/Dashboard/Dashboard'));
const Qmaker = lazy(() => import('../Components/Qmaker/Qmaker'));
const Papers = lazy(() => import('../Components/Paper/Papers'));
const PaperQue = lazy(() => import('../Components/Paper/PaperQue'));


// import Navb from "../Components/Navbar/Navb";
// import Login from "../Components/Login/Login";
// import Signup from "../Components/Signup/Signup";
// import Dashboard from "../Components/Dashboard/Dashboard";
// import Qmaker from "../Components/Qmaker/Qmaker";
// import Papers from "../Components/Paper/Papers";
// import PaperQue from "../Components/Paper/PaperQue";

function App() {
  const override = `
  display: block;
  margin: 230px auto;
  border-color: red;
`;
  return (
    <div className="App">
      <Router>
      <Suspense fallback={  <SyncLoader

          color={"rgb(147, 250, 165)"}
          // loading={loading}
          css={override}
          size={20}
        />}>
        <Navb />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/qmaker" element={<Qmaker />} />
          <Route path="/:subject" element={<Papers />} />
          <Route path="/:subject/:id" element={<PaperQue />} />
        </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
