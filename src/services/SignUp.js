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
  const containerStyle = {
    backgroundColor: "#f8f9fa",
    padding: "40px 0",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
  };

  const headerStyle = {
    backgroundColor: "#343a40",
    color: "#fff",
    textAlign: "center",
    marginBottom: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#343a40",
    color: "#fff",
    marginTop: "20px",
  };

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
        toast.success("Registartion successfull!!");
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
    <div>
      <CustomNavbar />
      <Container style={containerStyle}>
        <Row className="mt-2">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card style={cardStyle} outline>
              <CardHeader style={headerStyle}>
                <h3>Fill Information to Register</h3>
              </CardHeader>
              <CardBody>
                <form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">NAME</Label>
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                      </span>
                      <Input
                        type="text"
                        placeholder="Enter Here"
                        id="name"
                        onChange={(e) => handleChange(e, "name")}
                        value={data.name}
                        invalid={
                          error.errors?.response?.data?.name ? true : false
                        }
                        style={{ marginBottom: "10px" }}
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.name}
                      </FormFeedback>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Email</Label>
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                      </span>
                      <Input
                        type="text"
                        placeholder="Enter Here"
                        id="email"
                        onChange={(e) => handleChange(e, "email")}
                        value={data.email}
                        invalid={
                          error.errors?.response?.data?.email ? true : false
                        }
                        style={{ marginBottom: "10px" }}
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.email}
                      </FormFeedback>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label for="address">Address</Label>
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faAddressCard} />
                        </span>
                      </span>
                      <Input
                        type="textarea"
                        placeholder="Enter Here"
                        id="address"
                        onChange={(e) => handleChange(e, "address")}
                        value={data.address}
                      />
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label for="contact">Mobile Number</Label>
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faMobile} />
                        </span>
                      </span>
                      <Input
                        type="number"
                        placeholder="Enter Here"
                        id="contact"
                        onChange={(e) => handleChange(e, "contact")}
                        value={data.contact}
                        invalid={
                          error.errors?.response?.data?.contact ? true : false
                        }
                        style={{ marginBottom: "10px" }}
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.contact}
                      </FormFeedback>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <div className="input-group">
                      <span className="input-group-prepend">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                      </span>
                      <Input
                        type="password"
                        placeholder="Enter Here"
                        id="password"
                        onChange={(e) => handleChange(e, "password")}
                        value={data.password}
                        invalid={
                          error.errors?.response?.data?.password ? true : false
                        }
                        style={{ marginBottom: "10px" }}
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.password}
                      </FormFeedback>
                    </div>
                  </FormGroup>
                  <Container>
                    <Button color="dark" type="submit" style={buttonStyle}>
                      Register
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

export default SignUp;
