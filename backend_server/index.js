import  express from 'express';
import nodemailer from 'nodemailer';
import CircularJSON from 'circular-json'
import cors from 'cors'
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator'
import http from 'http';
import { Server } from 'socket.io';

import connection from './db.js';
import { classifyReading } from './lib/vitalsThresholds.js';
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

// Patients and simulators push live readings into their own `patient:<id>`
// room; a doctor joins that room while viewing the patient and/or the shared
// `doctors` room to receive every alert raised across the practice.
io.on('connection', (socket) => {
  socket.on('join', ({ role, patientId }) => {
    if (role === 'doctor') socket.join('doctors');
    if (patientId) socket.join(`patient:${patientId}`);
  });
  socket.on('watchPatient', (patientId) => {
    if (patientId) socket.join(`patient:${patientId}`);
  });
  socket.on('unwatchPatient', (patientId) => {
    if (patientId) socket.leave(`patient:${patientId}`);
  });
});


    // Configure the SMTP transport for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  

// Define the API endpoint for sending emails
app.post('/sendemail',  async (req, res) => {
  const { recipient, subject, content } = req.body;
  console.log(req.body)
  try{
  // Create the email payload
  const mailOptions = {
    from: process.env.SMTP_USER, // Replace with your Gmail email address
    to: recipient,
    subject: subject,
    text: content
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info);

  res.json({ message: 'Email sent successfully' });
}catch(error) {
  console.error('Error sending email:', error);
  res.status(500).json({ error: 'Failed to send email' });
}
  
});




app.get('/', (req, res)=>{
  connection.query('SELECT * FROM user', (error, results)=>{
    if(error){
      console.log(error);
      res.json(error)
    }else{
      console.log('Query Results: '+ results)
      res.json(results)
    }
  })
})

// 1	kazeze	kazezepharoll47@gmail.com	doctor	kaze1234
// 2	kwakye	ozbee@gmail.com	admin	ozee47
// 3	james k	jk@gmail.com	patient	jk1224
				
// Secret key for JWT
const secretKey = process.env.JWT_SECRET || 'change-this-secret-in-production';

// Endpoint for user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Query the database for the user
  connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log(results)
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    // Compare the hashed password
    bcrypt.compare(password, user.password, (bcryptErr, passwordMatch) => {
      if (bcryptErr) {
        console.error('Error comparing passwords:', bcryptErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Create a JWT token for authentication
      const token = Jwt.sign({ userId: user.idpatients, role: user.role }, secretKey, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      // Return the token, user role and id so the client knows which patient/doctor is signed in
      res.status(200).json({ token, userRole: user.role, fullnames: user.fullnames, userId: user.idpatients });
    });
  });
});


// Endpoint for user registration
app.post('/register', (req, res) => {
  const { fullnames, email, role, password } = req.body;

  // Validate input
  if (!fullnames || !email || !role || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Check if the user already exists
  connection.query(
    'SELECT COUNT(*) AS count FROM user WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        console.error('Error querying the database:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      const userExists = results[0].count > 0;

      if (userExists) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }

      // Hash the password before insertion
      bcrypt.hash(password, 10, (hashError, hashedPassword) => {
        if (hashError) {
          console.error('Error hashing the password:', hashError);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // Insert the user into the database
        connection.query(
          'INSERT INTO user (fullnames, email, role, password) VALUES (?, ?, ?, ?)',
          [fullnames, email, role, hashedPassword],
          (insertError, result) => {
            if (insertError) {
              console.error('Error inserting data:', insertError);
              return res.status(500).json({ success: false, message: 'Internal server error' });
            }

            if (result && result.affectedRows > 0) {
              return res.status(200).json({ success: true, message: 'User is successfully registered' });
            } else {
              return res.status(400).json({ success: false, message: 'Registration failed' });
            }
          }
        );
      });
    }
  );
});

app.post('/getcode', async (req, res) => {
  const { recipient, subject, content } = req.body;

  try {
    // Generate a random passcode
    const passcode = Math.floor(Math.random() * (999999 - 1000 + 1)) + 1000;
    console.log(passcode)


    const content = `Dear user, \n You requested a password reset. Below is the passcode:\n\n ${passcode}\n\n Good Luck!. \n kazeze P. Admin.`;
    // Store the passcode and its expiration time in the database for the user
    // You need to add your database logic here to store the hashed passcode

    const passcodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // Passcode expires in 15 minutes

    const insertQuery = 'INSERT INTO passcodes (email, passcode, expiry_time) VALUES (?, ?, ?)';
    connection.query(insertQuery, [recipient, passcode, passcodeExpiry], (insertError, insertResult) => {
      if (insertError) {
        console.error('Error inserting passcode to database:', insertError);
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }
  
      console.log('Passcode saved to the database!');
  
      // Send the passcode to the user's email
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: recipient,
        subject,
        text: content,
      };
      
      console.log("\n\n"+mailOptions.text)

      transporter.sendMail(mailOptions, (mailError, info) => {
        if (mailError) {
          console.error('Error sending email:', mailError);
          return res.status(500).json({ success: false, error: 'Internal server error' });
        }
  
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Passcode sent to the user' });
      });
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


app.post('/reset-password', (req, res) => {

  const { email, password, passcode} = req.body;

    // Update the user's password in the database (you need to implement this)
    const updatePasswordQuery = 'UPDATE user SET password = ? WHERE email = ?';
    connection.query(updatePasswordQuery, [password, email], (updateError, updateResult) => {
      if (updateError) {
        console.error('Error updating password in the database:', updateError);
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }

      if(updateResult.length>0){
      // Password reset successful, delete the used passcode from the passcodes table (optional)
      const deletePasscodeQuery = 'DELETE FROM passcodes WHERE email = ? AND passcode = ?';
      connection.query(deletePasscodeQuery, [email, passcode], (deleteError, deleteResult) => {
        if (deleteError) {
          console.error('Error deleting passcode from the database:', deleteError);
        }

        console.log('Password reset successful');
        res.status(200).json({ success: true, message: 'Password reset successful' });
      });
    }else{
      console.log(`Error: The User with email ${email} does not exist in our database`)
      res.status(400).json({success: false, message: ` with emaUseril ${email} does not exist in our database`})
    }
    });
  
  });


app.post('/verify-passcode', (req, res)=>{
  const {email, passcode} = req.body;

  console.log(email + " and code: "+ passcode)

  const Query = "SELECT * FROM passcodes WHERE email = ? AND passcode = ? AND expiry_time > DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s')";


  connection.query(Query, [email, passcode], (error, results)=>{
    console.log(results)

    if(error){
      res.status(500).json({success: false, message:'Error verifying the passcodel!'});

    }else if(results.length > 0){
      res.status(200).json({success: true, message:" The passcode is valid", passcode: passcode});
    }else{
      res.status(400).json({success: false, message: "Invalid or expired code!"})
    }
  })
})

app.post('/appointment', (req, res)=>{
  const {purpose, date, details, patientId}  = req.body;

  console.log(req.body)
  connection.query("SELECT COUNT(*) as appointment FROM appointment WHERE date = ? AND idpatient= ?", [date, patientId], (err, results)=>{
    if(err){
      res.status(500).json({success: false, message: "Error executing the get request"})
    }

console.log(results)
  if(results[0].appointment === 0){
    connection.query("INSERT INTO appointment(purpose, date, details, idpatient) values(?,?,?,?)", [purpose, date, details, patientId], (err, response)=>{
      if(err){
        res.status(500).json({success: false, message: 'Error occured while registering the appointment'})
      }
      console.log(response)
      if(response.affectedRows> 0){
        res.status(200).json({success: true, message: 'Appointment has been scheduled successfully'})
      }else{
        res.status(400).json({success: false, message: 'Invalid credentials'})
      }
    })
  }else{
    console.log("this appointment already exist")
    res.status(400).json({subject: false, message: "This appointment already exist!"})
  }
})
})

app.get('/doctor/appointments', (req, res)=>{
  connection.query("SELECT * FROM appointment", (err, results)=>{
    if(err){
      res.status(500).json({success: false, message: "Error executing get request"})
    }

    res.status(200).json({success: true, message: "Success", data: results })
  })
})

app.delete('/deleteappointment/:id', (req, res)=>{
  const idappointment = req.params.id;

  connection.query('DELETE FROM appointment WHERE idappointment = ?', [idappointment], (err, result)=>{
    if(err){
      res.status(500).json({success: false, message: "Error executing delete request"})
    }
    if(result.affectedRows ===1){
      res.status(204).json({success: true, message: "User has been removed successfully"})
    }else{
      res.status(400).json({success: false, message: 'User Not found'})
    }
  })
})

// Admin-safe user list. Never return password hashes or other credentials.
app.get('/admin/users', (req, res) => {
  const query = 'SELECT idpatients, fullnames, email, role FROM user ORDER BY idpatients DESC';
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Error fetching users' });
    }
    return res.json({ success: true, data: results });
  });
});

app.get('/admin/stats', (req, res) => {
  const query = `SELECT role, COUNT(*) AS count FROM user GROUP BY role`;
  connection.query(query, (error, results) => {
    if (error) return res.status(500).json({ success: false, error: 'Error fetching stats' });
    return res.json({ success: true, data: results });
  });
});

app.get('/patients', (req, res) => {
  const query = 'SELECT * FROM user where role = "patient"';
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching patients' });
    } else {
      res.json(results);
    }
  });
});

app.get('/patients/:id', (req, res) => {
  const patient_id = req.params.id;

  const query = `SELECT * FROM user where idpatients = ?`;
  connection.query(query,[patient_id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching patients' });
    } else {
      res.json(results);
    }
  });
});

app.get('/medicines', (req, res) => {
  const query = 'SELECT * FROM medicine';
 connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching medicines' });
    } else {
      res.json(results);
    }
  });
});

app.post('/prescriptions', (req, res) => {
  const { medicine, details, patient_id} = req.body;
  const Id = parseInt(patient_id);

  const query = 'INSERT INTO prescriptions ( medicine, recommendation, id_patient) VALUES (?, ?, ?)';
  connection.query(query, [JSON.stringify(medicine), details, Id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating prescription' });
    } else {
      res.json({ message: 'Prescription created successfully' });
    }
  });
});

app.get('/prescriptionList', (req, res)=>{
  connection.query("SELECT * FROM prescriptions", (err, results)=>{
    if(err){
      res.status(500).json({success: false, message: "Error executing get request"})
    }

    res.status(200).json({success: true, message: "Success", data: results })
  })

})


const validateInputs = [
  body('patientId').isInt(),
  body('dietaryRestrictions').isString().trim(),
  body('mealPlan').isObject(),
];

// Secure route to save diet data
app.post('/setmealplan',
  validateInputs,
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract validated data
    const { patientId, dietaryRestrictions, mealPlan } = req.body;

    // Ensure user is authenticated and authorized here (e.g., using JWT)

    // Perform database insert with parameterized query
    const insertQuery = 'INSERT INTO diet_plan (patient_id, dietary_restrictions, meal_plan) VALUES (?, ?, ?)';

    connection.query(insertQuery, [patientId, dietaryRestrictions, JSON.stringify(mealPlan)], (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      return res.status(200).json({ success: true, message: 'Diet data successfully saved' });
    });
  }
);

// Create a new API endpoint to fetch meal plans
app.get('/meal-plans', (req, res) => {
    // Perform a database query to retrieve meal plans
    const query = `
      SELECT user.fullnames, diet_plan.dietary_restrictions, diet_plan.meal_plan
      FROM user
      LEFT JOIN diet_plan ON user.idpatients = diet_plan.patient_id
    `;

    // Use await to execute the query and get the result
     connection.query(query,(error, response)=>{
      
      if(error){
        console.error('Error fetching meal plans:', error);
        res.status(500).json({success: false, message: 'Internal server error'})
      }
      // const mealPlans = response.map((row) => ({
      //   fullnames: row.fullnames,
      //   dietary_restrictions: row.dietary_restrictions,
      //   meal_plan: JSON.parse(row.meal_plan), // Assuming meal_plan is stored as a JSON string in the database
      // }));
  
      res.status(200).json({ success: true, mealPlans: response });
    });

    // Extract and format meal plans data
});






// ---------------------------------------------------------------------------
// Wearable / manual vitals monitoring
// ---------------------------------------------------------------------------

const ALERT_MESSAGES = {
  attention: 'One or more vitals are outside the normal range and should be reviewed.',
  critical: 'Critical vitals detected — the patient may need immediate attention.',
};

// Ingests one vitals reading (from a Bluetooth wearable, the simulator, or a
// manually entered value), stores it, classifies its severity and — when it
// is not normal — raises an alert that is pushed live to the patient's own
// dashboard and to every doctor watching.
// Coerces missing/blank form fields (e.g. an empty manual-entry input) to
// null so they never reach MySQL as an empty string, which numeric columns reject.
const toNullableNumber = (v) => (v === '' || v === undefined || v === null ? null : Number(v));

app.post('/vitals', (req, res) => {
  const { patientId } = req.body;
  const heartRate = toNullableNumber(req.body.heartRate);
  const spo2 = toNullableNumber(req.body.spo2);
  const systolic = toNullableNumber(req.body.systolic);
  const diastolic = toNullableNumber(req.body.diastolic);
  const temperature = toNullableNumber(req.body.temperature);
  const { source } = req.body;

  if (!patientId) {
    return res.status(400).json({ success: false, message: 'patientId is required' });
  }

  const reading = { heartRate, spo2, systolic, diastolic, temperature };
  const { severity, reasons } = classifyReading(reading);
  const readingSource = ['wearable', 'simulated', 'manual'].includes(source) ? source : 'manual';

  const insertQuery = `INSERT INTO vitals_readings
    (patient_id, heart_rate, spo2, systolic, diastolic, temperature, source, severity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    insertQuery,
    [patientId, heartRate ?? null, spo2 ?? null, systolic ?? null, diastolic ?? null, temperature ?? null, readingSource, severity],
    (error, result) => {
      if (error) {
        console.error('Error saving vitals reading:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      const savedReading = {
        id: result.insertId,
        patientId: Number(patientId),
        heartRate: heartRate ?? null,
        spo2: spo2 ?? null,
        systolic: systolic ?? null,
        diastolic: diastolic ?? null,
        temperature: temperature ?? null,
        source: readingSource,
        severity,
        recordedAt: new Date().toISOString(),
      };

      io.to(`patient:${patientId}`).emit('vitals:new', savedReading);

      if (severity === 'normal') {
        return res.status(200).json({ success: true, reading: savedReading });
      }

      const message = `${ALERT_MESSAGES[severity]} (${reasons.join(', ')})`;
      connection.query(
        'INSERT INTO alerts (patient_id, reading_id, severity, message) VALUES (?, ?, ?, ?)',
        [patientId, savedReading.id, severity, message],
        (alertError, alertResult) => {
          if (alertError) {
            console.error('Error saving alert:', alertError);
            return res.status(200).json({ success: true, reading: savedReading });
          }

          const alert = {
            id: alertResult.insertId,
            patientId: Number(patientId),
            readingId: savedReading.id,
            severity,
            message,
            acknowledged: false,
            createdAt: new Date().toISOString(),
          };

          io.to(`patient:${patientId}`).emit('alert:new', alert);
          io.to('doctors').emit('alert:new', alert);

          return res.status(200).json({ success: true, reading: savedReading, alert });
        }
      );
    }
  );
});

// Recent history for a patient's vitals chart.
app.get('/vitals/:patientId', (req, res) => {
  const { patientId } = req.params;
  const limit = Math.min(parseInt(req.query.limit, 10) || 50, 500);

  const query = `SELECT id, patient_id AS patientId, heart_rate AS heartRate, spo2, systolic, diastolic,
      temperature, source, severity, recorded_at AS recordedAt
    FROM vitals_readings WHERE patient_id = ? ORDER BY recorded_at DESC LIMIT ?`;

  connection.query(query, [patientId, limit], (error, results) => {
    if (error) {
      console.error('Error fetching vitals history:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    return res.status(200).json({ success: true, data: results.reverse() });
  });
});

// Alerts, most recent first. Without a patientId this returns alerts across
// every patient (the doctor-facing feed); with one it is scoped to a patient.
app.get('/alerts', (req, res) => {
  const { patientId, status } = req.query;
  const clauses = [];
  const params = [];

  if (patientId) {
    clauses.push('alerts.patient_id = ?');
    params.push(patientId);
  }
  if (status === 'unacknowledged') clauses.push('alerts.acknowledged = 0');

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const query = `SELECT alerts.id, alerts.patient_id AS patientId, user.fullnames AS patientName,
      alerts.severity, alerts.message, alerts.acknowledged, alerts.created_at AS createdAt
    FROM alerts JOIN user ON user.idpatients = alerts.patient_id
    ${where} ORDER BY alerts.created_at DESC LIMIT 100`;

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error('Error fetching alerts:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    return res.status(200).json({ success: true, data: results });
  });
});

app.post('/alerts/:id/acknowledge', (req, res) => {
  const { id } = req.params;
  connection.query(
    'UPDATE alerts SET acknowledged = 1, acknowledged_at = NOW() WHERE id = ?',
    [id],
    (error, result) => {
      if (error) {
        console.error('Error acknowledging alert:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Alert not found' });
      return res.status(200).json({ success: true });
    }
  );
});

// Start the server (HTTP + WebSocket share the same port). Hosts like
// Railway assign the port dynamically via $PORT.
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
