import { useEffect, useState } from "react";

import { getDoctors } from "../api/doctorApi";

import { getAppointments, cancelAppointment } from "../api/appointmentApi";

function AppointmentsPage() {
  const [doctors, setDoctors] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [selectedDoctorData, setSelectedDoctorData] = useState(null);

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  // Load doctors on page open
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

  // Handle doctor selection
  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;

    setSelectedDoctor(doctorId);

    // Find selected doctor info
    const doctorData = doctors.find((doctor) => doctor._id === doctorId);

    setSelectedDoctorData(doctorData);

    // If no doctor selected
    if (!doctorId) {
      setAppointments([]);
      return;
    }

    try {
      setLoading(true);

      // Fetch appointments for selected doctor
      const data = await getAppointments(doctorId);

      setAppointments(data);
    } catch (error) {
      console.log(error);

      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  // Cancel appointment
  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);

      alert("Appointment cancelled");

      // Refresh appointments after cancel
      const updatedAppointments = await getAppointments(selectedDoctor);

      setAppointments(updatedAppointments);
    } catch (error) {
      console.log(error);

      alert("Cancellation failed");
    }
  };

  return (
    <div className="appointments-page">
      <h1>Appointments List</h1>

      {/* Filters */}
      <div className="filters">
        <select value={selectedDoctor} onChange={handleDoctorChange}>
          <option value="">Select Doctor</option>

          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor Info */}
      {selectedDoctorData && (
        <div className="doctor-info">
          <h3>{selectedDoctorData.name}</h3>

          <p>Specialty: {selectedDoctorData.speciality}</p>

          <p>
            Working Hours: {selectedDoctorData.workingHours.start} -{" "}
            {selectedDoctorData.workingHours.end}
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && <p className="loading-text">Loading appointments...</p>}

      {/* Empty State */}
      {!loading && selectedDoctor && appointments.length === 0 && (
        <p className="empty-text">No appointments found</p>
      )}

      {/* Table */}
      {!loading && appointments.length > 0 && (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.patientId.name}</td>

                <td>{new Date(appointment.start).toLocaleDateString()}</td>

                <td>
                  {new Date(appointment.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td>
                  {new Date(appointment.end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td>{appointment.reason}</td>

                <td>
                  <span
                    className={
                      appointment.status === "Booked"
                        ? "status-booked"
                        : "status-cancelled"
                    }
                  >
                    {appointment.status}
                  </span>
                </td>

                <td>
                  {appointment.status === "Booked" && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(appointment._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AppointmentsPage;
