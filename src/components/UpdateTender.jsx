import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TenderService from "../services/TenderService";
import CustomNavbar from "./CustomNavbar";
function UpdateTender() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    TenderService.getAppliedTenderById(id).then((res) => {
      setAmount(res.data.amount);
    });
  }, [id]);

  const updateTender = (e) => {
    e.preventDefault();
    let tender = { amount: amount };
    TenderService.updateAppliedTender(id, tender)
      .then(() => {
        navigate("/user/dashboard");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred while updating the tender.");
        }
      });
  };

  const changeAmountHandler = (event) => {
    setAmount(event.target.value);
  };

  const cancel = () => {
    navigate("/user/dashboard");
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Update Tender</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Amount:</label>
                  <input
                    placeholder="Amount"
                    name="amount"
                    className="form-control"
                    value={amount}
                    onChange={changeAmountHandler}
                  />
                </div>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <button className="btn btn-success" onClick={updateTender}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTender;
