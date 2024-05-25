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
          navigate("/user/tender");
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
    <div>
      <CustomNavbar isAdmin={isAdmin} />
      <Container>
        <Row className="mt-2">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" outline>
              <CardHeader>
                <h3>ENTER DETAILS</h3>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter Name"
                      id="name"
                      value={tenderDetails.name}
                      onChange={(e) => handleChange(e, "name")}
                      invalid={error.name !== ""}
                    />
                    <FormFeedback>{error.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="details">Details</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter Details"
                      id="details"
                      value={tenderDetails.details}
                      onChange={(e) => handleChange(e, "details")}
                      invalid={error.details !== ""}
                    />
                    <FormFeedback>{error.details}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter Amount"
                      id="amount"
                      value={tenderDetails.amount}
                      onChange={(e) => handleChange(e, "amount")}
                      invalid={error.amount !== ""}
                    />
                    <FormFeedback>{error.amount}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="endsOn">Expires By</Label>
                    <Input
                      type="date"
                      placeholder="Enter Date"
                      id="endsOn"
                      value={tenderDetails.endsOn}
                      onChange={(e) => handleChange(e, "endsOn")}
                      invalid={error.endsOn !== ""}
                    />
                    <FormFeedback>{error.endsOn}</FormFeedback>
                  </FormGroup>
                  <Container>
                    <Button color="dark" type="submit">
                      Apply
                    </Button>
                  </Container>
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
