# Architectural Decision Record (ADR)

## Decision

I decided to calculate appointment availability using overlap checking between appointment start and end times before creating a new appointment, instead of using fixed predefined slots.

## Context

The main problem was preventing two patients from booking the same doctor at overlapping times. I needed a simple and flexible way to check if a doctor already has an appointment during the requested time before saving a new booking.

## Alternatives Considered

### 1. Fixed predefined slots

I considered creating predefined slots such as:

- 09:00 - 09:30
- 09:30 - 10:00
- 10:00 - 10:30

### 2. Dynamic overlap checking

I chose to compare the new appointment start and end times with existing appointments in the database to detect overlaps before creating the booking.

## Consequences

### Advantages

- More flexible appointment scheduling
- Supports dynamic doctor schedules
- Easier to handle different appointment durations
- Better scalability for future features

### Trade-offs

- Overlap query logic becomes more complex
- Additional validation is required
- Race conditions may still happen if multiple users book at the exact same time without transactions
