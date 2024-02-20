import "../loggedin.css";
import tender from "../assets/tender.jpg";
import React, { Component } from "react";
import TenderService from "../services/TenderService";
import { getCurrentUserDetail } from "../storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faMoneyBillAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenders: [],
      totalAmount: 0,
    };
  }

  componentDidMount() {
    const loggedInUser = getCurrentUserDetail();

    if (loggedInUser) {
      const email = loggedInUser.email;

      TenderService.getTendersApplied().then((res) => {
        const allTenders = res.data;

        const tendersForUser = allTenders.filter(
          (tender) => tender.email === email
        );

        // Calculate total amount
        const totalAmount = tendersForUser.reduce(
          (total, tender) => total + tender.amount,
          0
        );

        this.setState({ tenders: tendersForUser, totalAmount });
      });
    } else {
      console.log("User not logged in");
    }
  }

  render() {
    const tableStyle = {
      width: "100%",
      margin: "20px 0",
    };
    const totalAmountStyle = {
      color: "red",
      fontSize: "20px",
      fontWeight: "bold",
    };
    return (
      <div className="container">
        <h1 className="text-center" class="dash">
          YOUR DASHBOARD
        </h1>
        <div className="text-center">
          <img class="img" src={tender} alt="image" />
        </div>
        <h4 className="text-center">
          Look at what all tenders you have applied for
        </h4>
        <div className="row">
          <table
            className="table table-striped table-bordered tborder"
            style={tableStyle}
          >
            <thead>
              <tr>
                <th>
                  <FontAwesomeIcon icon={faClipboardList} /> Tender ID
                </th>
                <th>Tender Details</th>
                <th>
                  <FontAwesomeIcon icon={faMoneyBillAlt} /> Tender Amount
                </th>
                <th>
                  <FontAwesomeIcon icon={faCheckCircle} /> Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.tenders.map((tender) => (
                <tr key={tender.id}>
                  <td>{tender.id}</td>
                  <td>{tender.details}</td>
                  <td>{tender.amount}</td>
                  <td>APPLIED</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <div className="text-center" style={totalAmountStyle}>
            <h4 class="total">Total Amount: {this.state.totalAmount}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default LoggedIn;