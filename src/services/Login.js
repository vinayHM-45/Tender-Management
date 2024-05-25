import React, { useState } from "react";
import { toast } from "react-toastify";
import { doLogin } from "../storage";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"; // ... other imports ...
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
  // Example styles
  const containerStyle = {
    backgroundColor: "#f8f9fa",
    marginTop: "50px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
  };

  const headerStyle = {
    backgroundColor: "#343a40",
    color: "#fff",
  };

  const buttonStyle = {
    backgroundColor: "#343a40",
    color: "#fff",
    marginTop: "20px",
  };

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetails({ ...loginDetails, [field]: actualValue });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (loginDetails.email.trim() == "" || loginDetails.password.trim() == "") {
      console.log("user name and password required!!");
      toast.error("user name and password required!!");
    }
    TenderService.postLogin(loginDetails)
      .then((response) => {
        const token = response?.data?.token;
        const user = response?.data?.user;

        if (token && user) {
          console.log("User login successful!");
          doLogin(user, () => {
            if (user.email == "admin@gmail") {
              navigate("/user/tenders");
              return;
            } else {
              console.log("saved to localstorage");
              navigate("/user/dashboard");
            }
          });
          toast.success("User login successful!");
        } else if (response?.data?.error === "Invalid credentials") {
          console.log("Login error:", response.data.error);
          if (
            loginDetails.email.trim() !== "" ||
            loginDetails.password.trim() !== ""
          ) {
            toast.error("Invalid credentials");
          }
        } else {
          console.log("Unexpected response format");
          toast.error("Please Enter Valid Response");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Error:", error);
        if (error.response.status == 400) {
          console.log(error.response.data.messege);
        }
      });
  };
  return (
    <div>
      <CustomNavbar />
      <Container style={containerStyle}>
        <Row className="mt-5">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card style={cardStyle} outline>
              <CardHeader style={headerStyle}>
                <h3>ENTER LOGIN DETAILS</h3>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                      </div>
                      <Input
                        type="text"
                        placeholder="Enter Here"
                        id="email"
                        value={loginDetails.email}
                        onChange={(e) => handleChange(e, "email")}
                      ></Input>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                      </div>
                      <Input
                        type="password"
                        placeholder="Enter Here"
                        id="password"
                        value={loginDetails.password}
                        onChange={(e) => handleChange(e, "password")}
                      ></Input>
                    </div>
                  </FormGroup>
                  <Container>
                    <Button style={buttonStyle} type="submit">
                      Login
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

export default Login;
