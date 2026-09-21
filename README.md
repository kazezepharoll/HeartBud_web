# HeartBud

HeartBud is a personal medical assistant for monitoring cardiovascular disease. It combines:

- **`Heart_Demo/`** — React/Vite frontend (role-based patient, doctor and admin workspaces).
- **`backend_server/`** — Node/Express API (auth, appointments, prescriptions, diet plans, vitals and alerts) with a MySQL database and a Socket.IO real-time layer.
- **`backend/`** — Python/Flask ML service that predicts cardiovascular risk from an SVM model.

This originated as a 2023 university thesis project. The thesis explicitly scoped wearable vitals capture (heart rate, SpO2, blood pressure, temperature via Bluetooth) but could not acquire hardware at the time and shipped a manual-entry simulation instead. **Wearable vitals monitoring is now implemented** — see below.

## 1. Set up the database

```bash
mysql -u root -p < backend_server/db/schema.sql
```

This creates the `heartbud` database and every table the API needs, including `vitals_readings` and `alerts` for the monitoring feature.

## 2. Run the Node API

```bash
cd backend_server
npm install
cp .env.example .env   # fill in DB / JWT / SMTP values
npm start
```

Serves the REST API and the Socket.IO real-time layer on port **3000**.

## 3. Run the ML API

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Serves the risk-prediction model on port **5000**.

## 4. Run the frontend

```bash
cd Heart_Demo
npm install
cp .env.example .env   # optional, defaults to localhost:3000 / :5000
npm run dev
```

See `Heart_Demo/README_HEARTBUD_V2.md` for the V2 workspace redesign notes and Windows/Vite troubleshooting.

## Wearable vitals monitoring

Patients can connect a device from **Patient → Vitals monitor**:

- **Real Bluetooth wearable** — uses the browser's [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) to pair with any device broadcasting the standard BLE Heart Rate GATT service (`0x180D`), e.g. Polar/Wahoo chest straps and many fitness bands. Requires Chrome or Edge over HTTPS or `localhost`. Most smartwatches only expose vitals through their own companion app rather than a public GATT service, so a dedicated heart-rate strap/band is the most reliable option.
- **Simulated device** — streams realistic demo vitals (heart rate, SpO2, blood pressure, temperature) with occasional simulated events, so the monitoring and alerting flow can be demonstrated without hardware.
- **Manual entry** — a fallback form for logging a one-off reading.

Every reading is stored in `vitals_readings`, classified against clinical thresholds (`backend_server/lib/vitalsThresholds.js`, mirrored in the frontend), and broadcast live over Socket.IO to the patient's own dashboard. A reading outside the normal range creates a row in `alerts` and pushes a real-time notification to every doctor, visible on **Doctor → Live alerts** and the clinical overview dashboard, where it can be acknowledged.

This is decision-support tooling, not a diagnostic device — the thresholds are intentionally conservative heuristics, matching the "clinical decision support system" framing in the original thesis.

## Security

Database, JWT and SMTP credentials are read from environment variables (see `backend_server/.env.example`). Never commit real secrets.
