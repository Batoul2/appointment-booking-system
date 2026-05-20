import { Link } from "react-router-dom";
import doctorImage from "../assets/doctor.png";

function HomePage() {
  return (
    <section className="home">
      <div className="home-left">
        <h1>
          Achieve the best <br />
          version of your health
        </h1>

        <p className="description">
          Book appointments easily, check doctor availability, and manage clinic
          visits in a simple way.
        </p>

        <Link to="/booking" className="primary-btn">
          Book your appointment now
        </Link>
      </div>

      <div className="home-center">
        <img src={doctorImage} alt="Doctor" />
      </div>

      <div className="home-right">
        <p className="quote-mark">“</p>

        <p className="quote">
          Your health deserves organized care, clear appointments, and trusted
          doctors.
        </p>

        <p className="doctor-name">ClinicCare Team</p>
      </div>
    </section>
  );
}

export default HomePage;
