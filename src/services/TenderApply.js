import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
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
import TenderService from "./TenderService";
import { getCurrentUserDetail } from "../storage";

const TenderApply = () => {
  const navigate = useNavigate();
  const { tenderId } = useParams();

  const [tenderDetails, setTenderDetails] = useState({
    email: "",
    details: "",
    amount: "",
    userId: "",
    tenderId: "",
  });

  const [error, setError] = useState({
    email: "",
    details: "",
    amount: "",
    userId: "",
    tenderId: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUserDetail();
    if (currentUser) {
      setTenderDetails((prevState) => ({
        ...prevState,
        email: currentUser.email || "",
        userId: currentUser.id || "",
        tenderId: tenderId || "",
      }));
    }
  }, [tenderId]);

  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "email":
        if (!value) errorMsg = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Email is invalid";
        break;
      case "details":
        if (!value) errorMsg = "Details are required";
        break;
      case "amount":
        if (!value) errorMsg = "Amount is required";
        else if (isNaN(value) || Number(value) <= 0)
          errorMsg = "Amount must be a positive number";
        break;
      case "userId":
        if (!value) errorMsg = "User ID is required";
        break;
      case "tenderId":
        if (!value) errorMsg = "Tender ID is required";
        break;
      default:
        break;
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setError((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    setTenderDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const isFormValid = () => {
    const newErrors = {};
    let isValid = true;
    Object.keys(tenderDetails).forEach((key) => {
      const errorMsg = validateField(key, tenderDetails[key]);
      newErrors[key] = errorMsg;
      if (errorMsg) isValid = false;
    });
    setError(newErrors);
    return isValid;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    const payload = {
      ...tenderDetails,
      user: { id: Number(tenderDetails.userId) },
      tender: { id: Number(tenderDetails.tenderId) },
    };

    TenderService.postTendersApplied(payload)
      .then((response) => {
        console.log(response);
        toast.success("Applied successfully!!");
        navigate("/user/dashboard");
        setTenderDetails({
          email: "",
          details: "",
          amount: "",
          userId: "",
          tenderId: "",
        });
      })
      .catch((error) => {
        console.error(
          "Error applying for tender:",
          error.response?.data || error.message
        );
        if (error.response?.status === 409) {
          toast.error("You have already applied for this Tender");
        } else {
          toast.error("Failed to apply for tender. Please try again.");
        }
      });
  };

  return (
    <div>
      <CustomNavbar />
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
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      value={tenderDetails.email}
                      onChange={handleChange}
                      invalid={!!error.email}
                      readOnly
                    />
                    <FormFeedback>{error.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="details">Details</Label>
                    <Input
                      type="textarea"
                      name="details"
                      id="details"
                      value={tenderDetails.details}
                      onChange={handleChange}
                      invalid={!!error.details}
                    />
                    <FormFeedback>{error.details}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input
                      type="number"
                      name="amount"
                      id="amount"
                      value={tenderDetails.amount}
                      onChange={handleChange}
                      invalid={!!error.amount}
                    />
                    <FormFeedback>{error.amount}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="userId">User ID</Label>
                    <Input
                      type="number"
                      name="userId"
                      id="userId"
                      value={tenderDetails.userId}
                      onChange={handleChange}
                      invalid={!!error.userId}
                      readOnly
                    />
                    <FormFeedback>{error.userId}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="tenderId">Tender ID</Label>
                    <Input
                      type="number"
                      name="tenderId"
                      id="tenderId"
                      value={tenderDetails.tenderId}
                      onChange={handleChange}
                      invalid={!!error.tenderId}
                      readOnly
                    />
                    <FormFeedback>{error.tenderId}</FormFeedback>
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

export default TenderApply;
