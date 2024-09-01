import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import TenderService from "../services/TenderService";
import CustomNavbar from "./CustomNavbar";

const AdminDashboard = () => {
  const [tenders, setTenders] = useState([]);
  const [stats, setStats] = useState({ live: 0, closed: 0 });
  const [modal, setModal] = useState(false);
  const [applicantsModal, setApplicantsModal] = useState(false);
  const [currentTender, setCurrentTender] = useState({});
  const [currentApplicants, setCurrentApplicants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      const response = await TenderService.getTenders();
      setTenders(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error("Error fetching tenders:", error);
      setErrorMessage("Failed to fetch tenders. Please try again later.");
    }
  };

  const calculateStats = (tenderData) => {
    const now = new Date();
    const live = tenderData.filter(
      (tender) => new Date(tender.endsOn) > now && !tender.awardedTo
    ).length;
    const closed = tenderData.length - live;
    setStats({ live, closed });
  };

  const toggleModal = () => setModal(!modal);
  const toggleApplicantsModal = () => setApplicantsModal(!applicantsModal);

  const handleUpdate = (tender) => {
    setCurrentTender(tender);
    toggleModal();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await TenderService.updateTender(currentTender.id, currentTender);
      toggleModal();
      setSuccessMessage("Tender updated successfully");
      fetchTenders();
    } catch (error) {
      console.error("Error updating tender:", error);
      setErrorMessage("Failed to update tender. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await TenderService.deleteTender(id);
      setSuccessMessage("Tender deleted successfully");
      fetchTenders();
    } catch (error) {
      console.error("Error deleting tender:", error);
      setErrorMessage(
        "Failed to delete tender. It may not exist or you may not have permission."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTender((prev) => ({ ...prev, [name]: value }));
  };

  const showApplicants = async (tenderId) => {
    try {
      const response = await TenderService.getTenderApplicants(tenderId);
      setCurrentApplicants(response.data);
      toggleApplicantsModal();
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setErrorMessage("Failed to fetch applicants. Please try again.");
    }
  };

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div>
      <CustomNavbar />
      <Container className="mt-4">
        {errorMessage && (
          <Alert color="danger" toggle={clearMessages}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert color="success" toggle={clearMessages}>
            {successMessage}
          </Alert>
        )}

        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <CardHeader className="bg-primary text-white">
                <h3>Tender Statistics</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <h4>Live Tenders: {stats.live}</h4>
                  </Col>
                  <Col>
                    <h4>Closed Tenders: {stats.closed}</h4>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Card>
          <CardHeader className="bg-primary text-white">
            <h3>All Tenders</h3>
          </CardHeader>
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Expires On</th>
                  <th>Status</th>
                  <th>Awarded To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenders.map((tender) => (
                  <tr key={tender.id}>
                    <td>{tender.name}</td>
                    <td>${tender.amount}</td>
                    <td>{new Date(tender.endsOn).toLocaleDateString()}</td>
                    <td>
                      {new Date(tender.endsOn) > new Date() && !tender.awardedTo
                        ? "Live"
                        : "Closed"}
                    </td>
                    <td>{tender.awardedTo || "Not awarded yet"}</td>
                    <td>
                      <Button
                        color="info"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleUpdate(tender)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Update
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleDelete(tender.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </Button>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => showApplicants(tender.id)}
                      >
                        <FontAwesomeIcon icon={faUsers} /> Applicants
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Update Tender</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleUpdateSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={currentTender.name || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  value={currentTender.amount || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="endsOn">Expires On</Label>
                <Input
                  type="date"
                  name="endsOn"
                  id="endsOn"
                  value={
                    currentTender.endsOn
                      ? currentTender.endsOn.split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="awardedTo">Awarded To</Label>
                <Input
                  type="text"
                  name="awardedTo"
                  id="awardedTo"
                  value={currentTender.awardedTo || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Update Tender
              </Button>
            </Form>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={applicantsModal}
          toggle={toggleApplicantsModal}
          size="lg"
        >
          <ModalHeader toggle={toggleApplicantsModal}>
            Tender Applicants
          </ModalHeader>
          <ModalBody>
            {currentApplicants.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Details</th>
                    <th>Amount</th>
                    <th>User ID</th>
                    <th>Status</th>
                    <th>Revoked</th>
                  </tr>
                </thead>
                <tbody>
                  {currentApplicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td>{applicant.id}</td>
                      <td>{applicant.email}</td>
                      <td>{applicant.details}</td>
                      <td>${applicant.amount.toFixed(2)}</td>
                      <td>{applicant.userId}</td>
                      <td>{applicant.status}</td>
                      <td>{applicant.revoked ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No applicants for this tender yet.</p>
            )}
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminDashboard;
