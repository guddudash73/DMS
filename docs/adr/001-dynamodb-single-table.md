# ADR 001: DynamoDB Single-Table Design for DMS

## Status

Accepted — Week 1 / Day 3

## Context

We need a scalable, cost-efficient store for Patients, Visits, Xrays, Prescriptions, Users, and Audit events with low-latency queue lookups and daily reports. DynamoDB single-table optimizes for access patterns with explicit PK/SK layouts and a small set of GSIs.

## Entities

- Patient (patientId ULID)
- Visit (visitId ULID, patientId, doctorId, reason, status)
- Xray (xrayId ULID, visitId, contentKey)
- Prescription (rxId ULID, visitId, jsonKey)
- User (userId ULID, role)
- AuditEvent (auditId ULID, actorUserId, action, ts)

## Keys

- Patient profile:
  - PK = `PATIENT#{patientId}`, SK = `PROFILE`
- Patient visit index (under patient):
  - PK = `PATIENT#{patientId}`, SK = `VISIT#{visitId}`
- Visit scope:
  - PK = `VISIT#{visitId}`, SK ∈ {`META`, `XRAY#{xrayId}`, `RX#{rxId}`}
- User profile:
  - PK = `USER#{userId}`, SK = `PROFILE`
- Audit:
  - PK = `AUDIT#{auditId}`, SK = `EVENT#{ts}`

## GSIs

- GSI1 (patient recent visits):
  - GSI1PK = `PATIENT#{patientId}`
  - GSI1SK = `VISIT_DATE#{yyyy-mm-dd}#VISIT#{visitId}`
- GSI2 (doctor queue for a day):
  - GSI2PK = `DOCTOR#{doctorId}#DATE#{yyyy-mm-dd}`
  - GSI2SK = `STATUS#{status}#TS#{epoch}`
- GSI3 (daily reporting):
  - GSI3PK = `DATE#{yyyy-mm-dd}`
  - GSI3SK = `TYPE#{type}#ID#{entityId}`

## Example Items

- Patient profile

{ "PK":"PATIENT#01HX..", "SK":"PROFILE", "name":"Asha Rao", "phone":"+91...", "dob":"1990-05-11" }

- Patient visit under patient

{ "PK":"PATIENT#01HX..", "SK":"VISIT#01HY..", "visitDate":"2025-11-08", "GSI1PK":"PATIENT#01HX..", "GSI1SK":"VISIT_DATE#2025-11-08#VISIT#01HY.." }

- Visit scope (meta)

{ "PK":"VISIT#01HY..", "SK":"META", "doctorId":"DOC#01D..", "status":"QUEUED",
"GSI2PK":"DOCTOR#DOC#01D..#DATE#2025-11-08", "GSI2SK":"STATUS#QUEUED#TS#1731043200",
"GSI3PK":"DATE#2025-11-08", "GSI3SK":"TYPE#VISIT#ID#01HY.." }
