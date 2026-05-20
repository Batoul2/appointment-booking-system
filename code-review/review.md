# Race Condition

Severity: Critical

The code first checks if the appointment time is available and then creates the appointment. In this case, if 2 patients try to book at the exact same time, both requests may pass the check before the appointment is inserted into the database, which can create double bookings for the same doctor and same time.

# Missing Input Validation

Severity: High

The code does not check if doctorId, patientId, start, or end are missing or invalid. It also does not verify if the doctor or patient actually exists in the database. This may allow wrong or incomplete data to be saved.

# Appointment Status Always BOOKED

Severity: Medium

The status is always set directly to BOOKED without handling other possible statuses like CANCELLED or COMPLETED. This makes the appointment logic less flexible.

# Missing Error Handling

Severity: High

There is no try-catch block. If the database or server fails, the API may crash or return unclear responses. Missing error handling makes debugging more difficult.

# Missing Time Validation

Severity: High

The code does not check if the start time is actually before the end time. This may allow invalid appointments where the appointment ends before it starts or both times are equal.

# Code Corrected

```js
app.post("/api/appointments", async (req, res) => {
  try {
    const { doctorId, patientId, start, end, status } = req.body;

    // Error 2: Missing Input Validation
    // Validate required fields
    if (!doctorId || !patientId || !start || !end) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // Error 2: Missing Input Validation
    // Validate date format
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate.getTime() || endDate.getTime()) {
      return res.status(400).json({
        error: "Invalid date format",
      });
    }

    // Error 5: Missing Time Validation
    // Check if start time is before end time
    if (startDate >= endDate) {
      return res.status(400).json({
        error: "Start time must be before end time",
      });
    }

    // Error 2: Missing Input Validation
    // Check if doctor and patient exist
    const doctor = await db.collection("doctors").findOne({
      _id: doctorId,
    });

    const patient = await db.collection("patients").findOne({
      _id: patientId,
    });

    if (!doctor || !patient) {
      return res.status(404).json({
        error: "Doctor or patient not found",
      });
    }

    // Error 1: Race Condition
    // Check if another appointment already exists
    const existing = await db.collection("appointments").findOne({
      doctorId: doctorId,
      status: "BOOKED",
      start: { $lt: endDate },
      end: { $gt: startDate },
    });

    if (existing) {
      return res.status(400).json({
        error: "Time slot not available",
      });
    }

    // Error 3: Appointment Status Always BOOKED
    // Allow handling status instead of always forcing BOOKED
    await db.collection("appointments").insertOne({
      doctorId,
      patientId,
      start: startDate,
      end: endDate,
      status: status || "BOOKED",
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
    });
  } catch (error) {
    // Error 4: Missing Error Handling
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});
```
