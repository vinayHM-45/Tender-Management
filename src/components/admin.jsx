import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
import TenderService from "../services/TenderService";
import { isAdmin } from "../storage";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faInfoCircle,
  faDollarSign,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const AdminPage = () => {
  const navigate = useNavigate();
  const [tenderDetails, setTenderDetails] = useState({
    name: "",
    details: "",
    amount: "",
    endsOn: "",
  });

  const [error, setError] = useState({
    name: "",
    details: "",
    amount: "",
    endsOn: "",
  });

  const handleChange = (e, field) => {
    const { value } = e.target;
    if (field === "endsOn") {
      const selectedDate = new Date(value);
      const today = new Date();

      if (selectedDate < today) {
        setError((prevError) => ({
          ...prevError,
          endsOn: "Expiration date must be greater than or equal to today",
        }));
      } else {
        setError((prevError) => ({ ...prevError, endsOn: "" }));
      }
    }
    setTenderDetails({ ...tenderDetails, [field]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const isoDateString = new Date(tenderDetails.endsOn)
        .toISOString()
        .slice(0, 10);
      const updatedTenderDetails = {
        ...tenderDetails,
        endsOn: isoDateString,
      };

      TenderService.postTendersCreate(updatedTenderDetails)
        .then((response) => {
          console.log(response);
          navigate("/user/admin");
          setTenderDetails({
            name: "",
            details: "",
            amount: "",
            endsOn: "",
          });
        })
        .catch((error) => {
          console.error("Error applying:", error);
        });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const { name, details, amount, endsOn } = tenderDetails;

    if (!name) {
      setError((prevError) => ({ ...prevError, name: "Name is required" }));
      isValid = false;
    }

    if (!details) {
      setError((prevError) => ({
        ...prevError,
        details: "Details are required",
      }));
      isValid = false;
    }

    if (!amount) {
      setError((prevError) => ({
        ...prevError,
        amount: "Amount is required",
      }));
      isValid = false;
    }

    if (!endsOn) {
      setError((prevError) => ({
        ...prevError,
        endsOn: "Expiration date is required",
      }));
      isValid = false;
    }

    return isValid;
  };

  const userIsAdmin = isAdmin();

  return (
    <div className="bg-light min-vh-100">
      <CustomNavbar isAdmin={isAdmin} />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-primary text-white">
                <h3 className="mb-0">Enter Tender Details</h3>
              </CardHeader>
              <CardBody className="p-4">
                <form onSubmit={handleFormSubmit}>
                  <FormGroup className="mb-4">
                    <Label for="name" className="fw-bold">
                      Name
                    </Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <Input
                        type="text"
                        placeholder="Enter Name"
                        id="name"
                        value={tenderDetails.name}
                        onChange={(e) => handleChange(e, "name")}
                        invalid={error.name !== ""}
                        className="form-control-lg"
                      />
                    </div>
                    <FormFeedback>{error.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label for="details" className="fw-bold">
                      Details
                    </Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </span>
                      <Input
                        type="textarea"
                        placeholder="Enter Details"
                        id="details"
                        value={tenderDetails.details}
                        onChange={(e) => handleChange(e, "details")}
                        invalid={error.details !== ""}
                        className="form-control-lg"
                        rows="4"
                      />
                    </div>
                    <FormFeedback>{error.details}</FormFeedback>
                  </FormGroup>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label for="amount" className="fw-bold">
                          Amount
                        </Label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FontAwesomeIcon icon={faDollarSign} />
                          </span>
                          <Input
                            type="number"
                            placeholder="Enter Amount"
                            id="amount"
                            value={tenderDetails.amount}
                            onChange={(e) => handleChange(e, "amount")}
                            invalid={error.amount !== ""}
                            className="form-control-lg"
                          />
                        </div>
                        <FormFeedback>{error.amount}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-4">
                        <Label for="endsOn" className="fw-bold">
                          Expires By
                        </Label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                          <Input
                            type="date"
                            placeholder="Enter Date"
                            id="endsOn"
                            value={tenderDetails.endsOn}
                            onChange={(e) => handleChange(e, "endsOn")}
                            invalid={error.endsOn !== ""}
                            className="form-control-lg"
                          />
                        </div>
                        <FormFeedback>{error.endsOn}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="d-grid">
                    <Button
                      color="primary"
                      size="lg"
                      type="submit"
                      className="mt-4"
                    >
                      Submit Tender
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminPage;
