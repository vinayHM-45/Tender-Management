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
} from "reactstrap";
import TenderService from "./TenderService";
import { getCurrentUserDetail } from "../storage"; // Import the auth utility

const TenderApply = () => {
  const navigate = useNavigate();
  const { tenderId } = useParams(); // Assuming you're passing tenderId in the URL

  const [tenderDetails, setTenderDetails] = useState({
    email: "",
    details: "",
    amount: "",
    userId: "",
    tenderId: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  useEffect(() => {
    // Populate the fields when the component mounts
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

  const handleChange = (e, field) => {
    const actualValue = e.target.value;
    setTenderDetails({ ...tenderDetails, [field]: actualValue });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

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
        if (error.response.status == 409) {
          toast.error("You have alredy applied for this Tender");
        } else {
          toast.error("Failed to apply for tender. Please try again.");
        }
        setError({
          errors: error.response?.data || {},
          isError: true,
        });
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
                      placeholder="Enter Here"
                      id="email"
                      value={tenderDetails.email}
                      onChange={(e) => handleChange(e, "email")}
                      readOnly // Make it read-only since it's auto-populated
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="details">Details</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter Here"
                      id="details"
                      value={tenderDetails.details}
                      onChange={(e) => handleChange(e, "details")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter Here"
                      id="amount"
                      value={tenderDetails.amount}
                      onChange={(e) => handleChange(e, "amount")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userId">User ID</Label>
                    <Input
                      type="number"
                      placeholder="Enter User ID"
                      id="userId"
                      value={tenderDetails.userId}
                      onChange={(e) => handleChange(e, "userId")}
                      readOnly // Make it read-only since it's auto-populated
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="tenderId">Tender ID</Label>
                    <Input
                      type="number"
                      placeholder="Enter Tender ID"
                      id="tenderId"
                      value={tenderDetails.tenderId}
                      onChange={(e) => handleChange(e, "tenderId")}
                      readOnly // Make it read-only since it's auto-populated
                    />
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
