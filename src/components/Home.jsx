import HomeImage from "../assets/Home.jpg";
import WomenImage from "../assets/women.jpg";
import "../style.css";
import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";
import "../footer.css";
import { useRef } from "react";

function Home() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <CustomNavbar scrollToSection={scrollToSection} />
      <div className="container2" id="RESUME">
        <header>
          <div className="header-text-box">
            <h1>Effortless Tender Management System for Your Business</h1>
            <p>
              Simplify your tendering process with our advanced Tender
              Management System. Our comprehensive solution is designed to meet
              the diverse needs of businesses in managing and responding to
              tenders seamlessly. Whether you're a government agency, a
              corporation, or a small business, our platform streamlines the
              entire tender lifecycle.
            </p>

            <a className="btn btn--big" href="/login" id="nextpage">
              Login
            </a>
          </div>
          <img className="imagef" src={HomeImage} alt="Photo" />
        </header>

        <section ref={sectionRef} id="RESUME">
          <h2>Why Choose Our Website</h2>
          <div className="grid-3-cols">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="feature-icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z"
                  clip-rule="evenodd"
                />
              </svg>

              <p className="features-title">
                <strong>Performance Analytics</strong>
              </p>
              <p className="features-text">
                Gain insights into your tendering process with detailed
                analytics. Track success rates, identify areas for improvement,
                and make data-driven decisions to enhance your tender strategy.
              </p>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="feature-icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                  clip-rule="evenodd"
                />
              </svg>

              <p className="features-title">
                <strong>Affordability</strong>
              </p>
              <p className="features-text">
                We offer competitive pricing plans, ensuring that professional
                is accessible to all job seekers, regardless of budget
                constraints.
              </p>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="feature-icon"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>

              <p className="features-title">
                <strong>User-Friendly Interface</strong>
              </p>
              <p className="features-text">
                Our website offers a user-friendly and intuitive interface,
                making it easy for anyone, regardless of technical expertise, to
                apply for tenders.
              </p>
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="grid-3-cols">
            <img
              src={WomenImage}
              alt="People sitting on resumes"
              class="res-img"
            />
            <div className="testimonial-box">
              <h2>
                "We Achieved Excellence in Tender Management with This Platform"
              </h2>
              <blockquote className="testimonial-text">
                "Navigating the complex world of tender management became a
                seamless journey thanks to this exceptional platform. It played
                a pivotal role in helping us craft winning proposals and
                streamline our tendering processes. Our success in securing
                valuable contracts is a testament to the effectiveness of this
                powerful tool."
              </blockquote>
              <p className="testimonial-author">
                &mdash; John and Emily Thompson, ABC Corporation
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
