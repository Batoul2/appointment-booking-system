import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorApi";
import { getAvailability, createAppointment } from "../api/appointmentApi";
import { createPatient } from "../api/patientApi";

function BookingPage() {
  // Patient Inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  // Appointment Inputs
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Data
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorData, setSelectedDoctorData] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await getDoctors();

        setDoctors(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadDoctors();
  }, []);

  const fetchAvailability = async (doctorId, date) => {
    if (!doctorId || !date) return;

    try {
      const data = await getAvailability(doctorId, date);

      setAvailableSlots(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;

    setSelectedDoctor(doctorId);

    const doctorData = doctors.find((doctor) => doctor._id === doctorId);

    setSelectedDoctorData(doctorData);

    fetchAvailability(doctorId, selectedDate);
  };

  const handleDateChange = async (e) => {
    const date = e.target.value;

    setSelectedDate(date);

    fetchAvailability(selectedDoctor, date);
  };

  const handleBooking = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (
      !name ||
      !phone ||
      !email ||
      !selectedDoctor ||
      !selectedDate ||
      !selectedSlot ||
      !reason
    ) {
      setErrorMessage("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      const startDate = new Date(`${selectedDate}T${selectedSlot}`);

      const endDate = new Date(startDate);

      endDate.setMinutes(endDate.getMinutes() + 30);

      const patient = await createPatient({
        name,
        phone,
        email,
      });

      const appointmentData = {
        doctorId: selectedDoctor,
        patientId: patient._id,
        start: startDate,
        end: endDate,
        reason: reason,
      };

      await createAppointment(appointmentData);

      setSuccessMessage("Appointment booked successfully");

      setName("");
      setPhone("");
      setEmail("");
      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedSlot("");
      setReason("");

      setAvailableSlots([]);
    } catch (error) {
      console.log(error);

      setErrorMessage("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Medical Appointment Form</h1>

        <h2>Make An Appointment</h2>

        {/* Error Message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="booking-form">
          {/* LEFT SIDE */}
          <div className="form-column">
            <input
              type="text"
              placeholder="Patient Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Reason / Symptoms"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="form-column">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />

            <div>
              <select value={selectedDoctor} onChange={handleDoctorChange}>
                <option value="">Select Doctor</option>

                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>

              {/* Doctor info */}
              {selectedDoctorData && (
                <div className="doctor-small-info">
                  <p>{selectedDoctorData.speciality}</p>

                  <p>
                    Working Hours: {selectedDoctorData.workingHours.start}
                    {" - "}
                    {selectedDoctorData.workingHours.end}
                  </p>
                </div>
              )}
            </div>

            {/* Available slots */}
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="">Select Time</option>

              {availableSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="book-btn" onClick={handleBooking}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
