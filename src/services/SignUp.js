import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faAddressCard,
  faMobile,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
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
import CustomNavbar from "../components/CustomNavbar";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    password: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();

    TenderService.postSignup(data)
      .then((response) => {
        console.log(response);
        toast.success("Registration successful!");
        navigate("/login");
        setData({
          name: "",
          email: "",
          address: "",
          contact: "",
          password: "",
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
    <div className="bg-light min-vh-100">
      <CustomNavbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-primary text-white text-center py-4">
                <h3 className="mb-0">Sign Up</h3>
              </CardHeader>
              <CardBody className="p-4">
                <form onSubmit={submitForm}>
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
                        placeholder="Enter your name"
                        id="name"
                        onChange={(e) => handleChange(e, "name")}
                        value={data.name}
                        invalid={
                          error.errors?.response?.data?.name ? true : false
                        }
                        className="form-control-lg"
                      />
                    </div>
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <Label for="email" className="fw-bold">
                      Email
                    </Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        onChange={(e) => handleChange(e, "email")}
                        value={data.email}
                        invalid={
                          error.errors?.response?.data?.email ? true : false
                        }
                        className="form-control-lg"
                      />
                    </div>
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <Label for="address" className="fw-bold">
                      Address
                    </Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FontAwesomeIcon icon={faAddressCard} />
                      </span>
                      <Input
                        type="textarea"
                        placeholder="Enter your address"
                        id="address"
                        onChange={(e) => handleChange(e, "address")}
                        value={data.address}
                        className="form-control-lg"
                        rows="3"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <Label for="contact" className="fw-bold">
                      Mobile Number
                    </Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FontAwesomeIcon icon={faMobile} />
                      </span>
                      <Input
                        type="tel"
                        placeholder="Enter your mobile number"
                        id="contact"
                        onChange={(e) => handleChange(e, "contact")}
                        value={data.contact}
                        invalid={
                          error.errors?.response?.data?.contact ? true : false
                        }
                        className="form-control-lg"
                      />
                    </div>
                    <FormFeedback>
                      {error.errors?.response?.data?.contact}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <Label for="password" className="fw-bold">
                      Password
                    </Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        onChange={(e) => handleChange(e, "password")}
                        value={data.password}
                        invalid={
                          error.errors?.response?.data?.password ? true : false
                        }
                        className="form-control-lg"
                      />
                    </div>
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>

                  <div className="d-grid">
                    <Button
                      color="primary"
                      size="lg"
                      type="submit"
                      className="mt-4"
                    >
                      Register
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

export default SignUp;
