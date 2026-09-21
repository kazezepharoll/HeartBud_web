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

## Deploying to Railway

All three services plus MySQL can live in one Railway project. Each service points at this same GitHub repo/branch but with a different **Root Directory**, so create them one at a time from the Railway dashboard (railway.app → New Project):

### 1. Database
- **+ New → Database → Add MySQL.** Railway provisions it and exposes connection variables (`MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`) that other services in the project can reference.
- Load the schema once, from your machine, using the connection details shown on the MySQL service's **Connect** tab:
  ```bash
  mysql -h <MYSQLHOST> -P <MYSQLPORT> -u <MYSQLUSER> -p<MYSQLPASSWORD> < backend_server/db/schema.sql
  ```

### 2. Node API (`backend_server`)
- **+ New → GitHub Repo**, pick this repo, then in **Settings → Root Directory** set `backend_server`.
- **Variables** tab — add, referencing the MySQL service by name (Railway autocompletes these):
  ```
  DB_HOST=${{MySQL.MYSQLHOST}}
  DB_USER=${{MySQL.MYSQLUSER}}
  DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
  DB_NAME=${{MySQL.MYSQLDATABASE}}
  JWT_SECRET=<generate a random secret>
  SMTP_USER=<your Gmail address, or leave unset to disable email features>
  SMTP_PASS=<a Gmail app password>
  ```
  `PORT` is injected by Railway automatically — the server already reads it.
- **Settings → Networking → Generate Domain** to get a public URL, e.g. `https://heartbud-api.up.railway.app`.

### 3. ML API (`backend`)
- **+ New → GitHub Repo**, same repo, **Root Directory** = `backend`. Railway detects Python from `requirements.txt` and runs the `Procfile` (`gunicorn app:app`).
- No required variables; `PORT` is injected automatically.
- **Generate Domain** here too, e.g. `https://heartbud-ml.up.railway.app`.

### 4. Frontend (`Heart_Demo`)
- **+ New → GitHub Repo**, same repo, **Root Directory** = `Heart_Demo`. Railway runs `npm run build` then the `Procfile` (`vite preview`).
- **Variables** — set these to the two public URLs generated above (Vite bakes them in at build time, so set them *before* the first deploy, or trigger a redeploy after adding them):
  ```
  VITE_API_BASE_URL=https://heartbud-api.up.railway.app
  VITE_ML_API_URL=https://heartbud-ml.up.railway.app
  ```
- **Generate Domain** for the frontend — that URL is the live app.

Because Web Bluetooth requires a secure context, the Bluetooth wearable connection works on the Railway HTTPS domain the same way it does on `localhost`.

