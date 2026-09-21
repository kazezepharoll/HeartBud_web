# HeartBud V2 redesign

This version keeps the original React/Vite + Node/Express + Python ML structure but replaces the old dashboard experience with a role-based healthcare workspace.

## New frontend workspaces
- Patient: overview, health assessment, appointments, prescriptions, diet plan, notifications.
- Doctor: clinical overview, patients, patient record, appointments, prescriptions, diet plans, assessments.
- Admin: system overview, user management, prediction activity, appointments, prescriptions, activity log, settings.

## Run the frontend
```bash
cd Heart_Demo
npm install
npm run dev
```

Optional environment file:
```text
VITE_API_BASE_URL=http://localhost:3000
VITE_ML_API_URL=http://localhost:5000
```

## Run the ML API
```bash
cd backend
python app.py
```
The ML service is now configured for port **5000**, matching the frontend V2 assessment client.

## Run the Node API
Set the environment variables shown in `backend_server/.env.example`, then start the Node server with your normal Node command.

## Important security note
The original project contained database, JWT and SMTP credentials directly in source code. V2 removes those credentials from the source and reads them from environment variables. Do not commit real secrets to Git.

## What is still a migration layer
The new UI is deliberately usable before every legacy endpoint has been migrated. Some V2 screens therefore show clear connection states/sample presentation instead of pretending that data is live. The next implementation phase should add authenticated role-based API access, patient-doctor relationships, persisted prediction records and full admin actions.

Wearable vitals monitoring and measurement history are implemented (see the root `README.md`): patients can connect a real Bluetooth heart-rate device or a simulator from **Vitals monitor**, and doctors get real-time alerts on **Live alerts**.


## Windows/Vite troubleshooting

If Vite reports `react-router-dom/dist/umd/react-router-dom.development is not exported`, the old project contained deep imports into React Router's UMD build. V2 uses the supported import `from 'react-router-dom'`.

If Vite reports a `rolldown` dependency scan or `Invalid input options ... jsx` warning, do a clean dependency install from this folder:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```

V2 pins Vite 4.4.2 and the React Vite plugin 4.0.3 to match the tested package-lock versions.
