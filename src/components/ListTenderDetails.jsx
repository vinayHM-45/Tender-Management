import React, { Component } from "react";
import TenderService from "../services/TenderService";
import CustomNavbar from "./CustomNavbar";
import { Link } from "react-router-dom";
import "../loggedin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListAlt,
  faFileAlt,
  faMoneyBillAlt,
  faUserCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

class ListTenderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenders: [],
    };
    this.deleteTender = this.deleteTender.bind(this);
  }

  componentDidMount() {
    TenderService.getTenders().then((res) => {
      this.setState({ tenders: res.data });
    });
  }

  deleteTender(id) {
    // Implement delete functionality here
    // For example:
    // TenderService.deleteTender(id).then((res) => {
    //   this.setState({
    //     tenders: this.state.tenders.filter((tender) => tender.id !== id),
    //   });
    // });
    console.log(`Delete tender with id: ${id}`);
  }

  render() {
    const tableStyle = {
      marginTop: "20px",
    };
    return (
      <div>
        <CustomNavbar />
        <div className="container">
          <h2 className="text-center">
            <FontAwesomeIcon icon={faListAlt} /> Tenders list
          </h2>
          <div className="row">
            <table
              className="table table-striped table-bordered"
              style={tableStyle}
            >
              <thead className="thead-dark">
                <tr>
                  <th>Tender ID</th>
                  <th>
                    <FontAwesomeIcon icon={faFileAlt} /> Tender Name
                  </th>
                  <th>Tender Details</th>
                  <th>
                    <FontAwesomeIcon icon={faMoneyBillAlt} /> Tender Amount
                  </th>
                  <th>Tender Expires By</th>
                  <th>
                    <FontAwesomeIcon icon={faUserCheck} /> STATUS
                  </th>
                  <th>
                    <FontAwesomeIcon icon={faUserCheck} /> Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.tenders.map((tender) => (
                  <tr
                    key={tender.id}
                    className={tender.id % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>{tender.id}</td>
                    <td>{tender.name}</td>
                    <td>{tender.details}</td>
                    <td>{tender.amount}</td>
                    <td>{tender.endsOn}</td>
                    <td>{tender.status}</td>
                    <td>
                      {tender.status === "EXPIRED" ? (
                        <button className="btn btn-secondary" disabled>
                          <FontAwesomeIcon icon={faTimes} /> CLOSED
                        </button>
                      ) : (
                        <Link
                          to={`/user/appliedtenders/${tender.id}`}
                          className="btn btn-primary"
                        >
                          <FontAwesomeIcon icon={faUserCheck} /> APPLY
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTenderDetails;
