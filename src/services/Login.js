import React, { useState } from "react";
import { toast } from "react-toastify";
import { doLogin } from "../storage";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
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

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetails({ ...loginDetails, [field]: actualValue });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      loginDetails.email.trim() === "" ||
      loginDetails.password.trim() === ""
    ) {
      toast.error("Username and password are required!");
      return;
    }

    TenderService.postLogin(loginDetails)
      .then((response) => {
        const token = response?.data?.token;
        const user = response?.data?.user;

        if (token && user) {
          doLogin(user, () => {
            if (user.email === "admin@gmail") {
              navigate("/user/admin");
            } else {
              navigate("/user/dashboard");
            }
          });
          toast.success("Login successful!");
        } else if (response?.data?.error === "Invalid credentials") {
          toast.error("Invalid credentials");
        } else {
          toast.error("Please enter valid credentials");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Invalid credentials");
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
                <h3 className="mb-0">Login</h3>
              </CardHeader>
              <CardBody className="p-4">
                <form onSubmit={handleFormSubmit}>
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
                        value={loginDetails.email}
                        onChange={(e) => handleChange(e, "email")}
                        className="form-control-lg"
                      />
                    </div>
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
                        value={loginDetails.password}
                        onChange={(e) => handleChange(e, "password")}
                        className="form-control-lg"
                      />
                    </div>
                  </FormGroup>
                  <div className="d-grid">
                    <Button
                      color="primary"
                      size="lg"
                      type="submit"
                      className="mt-4"
                    >
                      Login
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

export default Login;
