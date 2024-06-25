import axios from "axios";
const TENDERS_API_BASE_URL = "http://tender.vinayhm.tech/api/v1/tender";
const TENDERS2_API_BASE_URL = "http://tender.vinayhm.tech/api/v1/signup";
const TENDERS3_API_BASE_URL = "http://tender.vinayhm.tech/api/v1/login";
const TENDERS4_API_BASE_URL =
  "http://tender.vinayhm.tech/api/v1/appliedtenders";
class TenderService {
  getTenders() {
    return axios.get(TENDERS_API_BASE_URL);
  }
  postSignup(signUp) {
    return axios.post(TENDERS2_API_BASE_URL, signUp, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  postLogin(Login) {
    return axios.post(TENDERS3_API_BASE_URL, Login, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  postTendersApplied(tender) {
    return axios.post(TENDERS4_API_BASE_URL, tender, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  getTendersApplied() {
    return axios.get(TENDERS4_API_BASE_URL);
  }
  postTendersCreate(tenders) {
    return axios.post(TENDERS_API_BASE_URL, tenders, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new TenderService();
