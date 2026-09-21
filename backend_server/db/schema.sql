-- HeartBud database schema (MySQL)
-- Create the database and load this file to set up a fresh environment:
--   mysql -u root -p < backend_server/db/schema.sql

CREATE DATABASE IF NOT EXISTS heartbud CHARACTER SET utf8mb4;
USE heartbud;

CREATE TABLE IF NOT EXISTS user (
  idpatients INT AUTO_INCREMENT PRIMARY KEY,
  fullnames VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  role ENUM('patient', 'doctor', 'admin') NOT NULL DEFAULT 'patient',
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS passcodes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  passcode INT NOT NULL,
  expiry_time DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS appointment (
  idappointment INT AUTO_INCREMENT PRIMARY KEY,
  purpose VARCHAR(255),
  date DATETIME NOT NULL,
  details TEXT,
  idpatient INT NOT NULL,
  FOREIGN KEY (idpatient) REFERENCES user(idpatients) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medicine (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS prescriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  medicine JSON,
  recommendation TEXT,
  id_patient INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_patient) REFERENCES user(idpatients) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS diet_plan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  dietary_restrictions VARCHAR(255),
  meal_plan JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES user(idpatients) ON DELETE CASCADE
);

-- Wearable / manual vitals readings feeding the monitoring dashboard.
CREATE TABLE IF NOT EXISTS vitals_readings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  heart_rate INT NULL,
  spo2 DECIMAL(5,2) NULL,
  systolic INT NULL,
  diastolic INT NULL,
  temperature DECIMAL(4,1) NULL,
  source ENUM('wearable', 'simulated', 'manual') NOT NULL DEFAULT 'manual',
  severity ENUM('normal', 'attention', 'critical') NOT NULL DEFAULT 'normal',
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES user(idpatients) ON DELETE CASCADE,
  INDEX idx_vitals_patient_time (patient_id, recorded_at)
);

-- Alerts raised automatically when a vitals reading crosses a critical/attention threshold.
CREATE TABLE IF NOT EXISTS alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  reading_id INT NULL,
  severity ENUM('attention', 'critical') NOT NULL,
  message VARCHAR(255) NOT NULL,
  acknowledged TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  acknowledged_at TIMESTAMP NULL,
  FOREIGN KEY (patient_id) REFERENCES user(idpatients) ON DELETE CASCADE,
  FOREIGN KEY (reading_id) REFERENCES vitals_readings(id) ON DELETE SET NULL,
  INDEX idx_alerts_patient_time (patient_id, created_at)
);
