# Problem Solving

## 1. How do you detect overlaps correctly? Provide examples of edge cases.

I detect overlaps by checking if an existing appointment starts before the new appointment ends, and ends after the new appointment starts (existing.start < newEnd AND existing.end > newStart).

This prevents two appointments from using the same time range for the same doctor.

Some edge cases:

- appointments touching exactly at end/start times (booking ends at 10 and other booking start at 10)
- appointments inside another appointment
- appointments with invalid start/end times
- race condition (2 patients books same available slot and same doctor)

## 2. How do you prevent race conditions in MongoDB for appointment booking?

To reduce race conditions, the system first checks for overlapping appointments before creating a new booking.

For better protection, MongoDB transactions and replica sets should be used so overlap checking and appointment creation happen safely together.

## 3. How would your approach change if the clinic had multiple locations and time zones?

I would store all appointment dates in UTC format and convert them depending on the clinic location or user timezone.

I would also separate doctors and appointments by location to make scheduling easier to manage.

## 4. Security: What are potential security risks in an appointment system?

Some possible risks are:

- unauthorized access to patient data
- invalid or malicious requests
- injection attacks
- exposing sensitive information in logs
- weak authentication or authorization

## 5. Trade-offs: Should appointment slots be pre-generated or calculated dynamically?

I chose dynamic slot calculation because it is more flexible and works better with different doctor schedules.

Pre-generated slots are simpler, but they are harder to maintain and less flexible if schedules change.

## 6. Learning Task: MongoDB findOneAndUpdate with arrayFilters

`findOneAndUpdate` with `arrayFilters` can be used to update a specific item inside an array.

For example, if a waiting list contains multiple patients, we can update only one patient status.

Example:

```js
await Appointment.findOneAndUpdate(
  { _id: appointmentId },
  {
    $set: {
      "waitingList.$[p].status": "notified",
    },
  },
  {
    arrayFilters: [{ "p._id": patientId }],
  },
);
```

This updates only the selected patient inside the waiting list.
