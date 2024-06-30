import React from "react";
import "./App.css";
import AdminPage from "./components/admin";
import ListTenderDetails from "./components/ListTenderDetails";
import { ToastContainer } from "react-toastify";
import SignUp from "./services/SignUp";
import Login from "./services/Login";
import PrivateUser from "./components/PrivateUser";
import UserDashBoard from "./components/UserDashBoard";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdateTender from "./components/UpdateTender";
import TenderApply from "./services/TenderApply";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/user" exact element={<PrivateUser />}>
          <Route path="dashboard" exact element={<UserDashBoard />} />
          <Route path="tender" exact element={<ListTenderDetails />} />
          <Route path="tenders" exact element={<AdminPage />} />

          <Route
            path="appliedtenders/:tenderId"
            exact
            element={<TenderApply />}
          />
          <Route path="update-tender/:id" exact element={<UpdateTender />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
