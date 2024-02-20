import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

const TenderApply = () => {
  const navigate = useNavigate();
  const [tenderDetails, setTenderDetails] = useState({
    email: "",
    name: "",
    address: "",
    contact: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const handleChange = (e, field) => {
    const actualValue = e.target.value;
    setTenderDetails({ ...tenderDetails, [field]: actualValue });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    TenderService.postTendersApplied(tenderDetails)
      .then((response) => {
        console.log(response);
        toast.success("Applied successfull!!");
        navigate("/user/dashboard");
        setTenderDetails({
          email: "",
          name: "",
          address: "",
          contact: "",
        });
      })
      .catch((error) => {
        setError({
          errors: error,
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
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="address">Details</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter Here"
                      id="details"
                      onChange={(e) => handleChange(e, "details")}
                      value={tenderDetails.details}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="contact">Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter Here"
                      id="amount"
                      onChange={(e) => handleChange(e, "amount")}
                      value={tenderDetails.amount}
                    ></Input>
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
