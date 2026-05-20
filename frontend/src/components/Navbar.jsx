import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">ClinicCare</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/appointments">Appointments</Link>
      </div>
    </nav>
  );
}

export default Navbar;
