# Database Troubleshooting

Appointment bookings are occasionally creating overlapping appointments despite the overlap prevention logic.

## 1. Initial Investigation

First, I would check the database records for overlapping appointments for the same doctor and compare their start and end times.

In addition I would also examine:

- application logs
- request timestamps
- booking requests happening at the same time
- appointment status values
- overlap query logic

This would help identify the source of the issue whether the issue comes from validation, database timing, or concurrent requests.

## 2. Common Causes

1. Two users trying to book the same appointment at the same time (concurrent booking)
2. The overlap check and booking are not happening together safely
3. A mistake in the overlap query logic (condition may not be 100% correct)
4. Different timezone handling between requests
5. Missing validation for appointment times (invalid start/end)

## 3. Resolution Steps

1. Use transactions to make booking safer (mongodb transactions)
2. Make overlap checking and appointment creation happen together
3. Correct the overlap query conditions (existing.start < newEnd AND existing.end > newStart)
4. Store dates using one timezone format
5. Validate appointment times before saving (working hours, start< end)

## 4. Prevention

To catch problems early I would monitor:

- failed booking requests
- overlap errors in logs
- API errors
- database performance
