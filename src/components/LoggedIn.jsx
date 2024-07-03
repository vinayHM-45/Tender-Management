import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TenderService from "../services/TenderService";
import { getCurrentUserDetail } from "../storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faMoneyBillAlt,
  faCheckCircle,
  faEdit,
  faTrash,
  faSearch,
  faChartLine,
  faPercentage,
} from "@fortawesome/free-solid-svg-icons";

const LoggedIn = () => {
  const [tenders, setTenders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [successRate, setSuccessRate] = useState(0);
  const [averageBidAmount, setAverageBidAmount] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [amountByStatus, setAmountByStatus] = useState([]);

  useEffect(() => {
    const loggedInUser = getCurrentUserDetail();

    if (loggedInUser) {
      const userId = loggedInUser.id;

      TenderService.getTendersApplied().then((res) => {
        const allTenders = res.data;
        const tendersForUser = allTenders.filter(
          (tender) => tender.userId === userId
        );
        setTenders(tendersForUser);
        performAnalysis(tendersForUser);
      });
    } else {
      console.log("User not logged in");
    }
  }, []);

  const performAnalysis = (tenders) => {
    // Total Amount
    const total = tenders.reduce((sum, tender) => sum + tender.amount, 0);
    setTotalAmount(total);

    // Success Rate
    const successfulTenders = tenders.filter(
      (tender) => tender.status === "ACCEPTED"
    );
    const rate = (successfulTenders.length / tenders.length) * 100 || 0;
    setSuccessRate(rate.toFixed(2));

    // Average Bid Amount
    const avg = tenders.length > 0 ? total / tenders.length : 0;
    setAverageBidAmount(avg.toFixed(2));

    // Status Distribution
    const distribution = tenders.reduce((acc, tender) => {
      acc[tender.status] = (acc[tender.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(
      Object.entries(distribution).map(([name, value]) => ({ name, value }))
    );

    // Amount by Status
    const amountByStatusData = tenders.reduce((acc, tender) => {
      if (!acc[tender.status]) {
        acc[tender.status] = 0;
      }
      acc[tender.status] += tender.amount;
      return acc;
    }, {});
    setAmountByStatus(
      Object.entries(amountByStatusData).map(([status, amount]) => ({
        status,
        amount,
      }))
    );
  };

  const deleteTender = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this tender? This action cannot be undone."
    );

    if (isConfirmed) {
      TenderService.deleteAppliedTender(id)
        .then(() => {
          const updatedTenders = tenders.filter((tender) => tender.id !== id);
          setTenders(updatedTenders);
          performAnalysis(updatedTenders);
        })
        .catch((error) => {
          console.error("Error deleting tender:", error);
        });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTenders = tenders.filter((tender) =>
    tender.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="container">
      <h1 className="text-center dash">YOUR TENDER DASHBOARD</h1>

      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search tenders..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faMoneyBillAlt} /> Total Bid Amount
              </h5>
              <p className="card-text">${totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faPercentage} /> Success Rate
              </h5>
              <p className="card-text">{successRate}%</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faChartLine} /> Avg. Bid Amount
              </h5>
              <p className="card-text">${averageBidAmount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faClipboardList} /> Total Tenders
              </h5>
              <p className="card-text">{tenders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h4>Tender Status Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="col-md-6">
          <h4>Total Amount by Tender Status</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={amountByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tender Table */}
      <h4>Your Tenders</h4>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>
              <FontAwesomeIcon icon={faClipboardList} /> Tender ID
            </th>
            <th>Tender Details</th>
            <th>
              <FontAwesomeIcon icon={faMoneyBillAlt} /> Amount
            </th>
            <th>
              <FontAwesomeIcon icon={faCheckCircle} /> Status
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTenders.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.tenderId}</td>
              <td>{tender.details}</td>
              <td>${tender.amount.toLocaleString()}</td>
              <td>{tender.status}</td>
              <td>
                {tender.status === "OPEN" || tender.status === "PENDING" ? (
                  <>
                    <Link
                      to={`/user/update-tender/${tender.id}`}
                      className="btn btn-info btn-sm mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Update
                    </Link>
                    <button
                      onClick={() => deleteTender(tender.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </>
                ) : (
                  <span>No actions available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoggedIn;
