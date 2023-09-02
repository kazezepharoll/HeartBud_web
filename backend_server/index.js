import  express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors'
import  patientsRoutes from './routes/patients.js';
import  medicinesRoutes from './routes/medicine.js';

import connection from './db.js';
const app = express();

app.use(express.json());
app.use(cors());


    // Configure the SMTP transport for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
    auth: {
      user: 'kazezepharoll47@gmail.com',
      pass: 'yydfeosmamkbfhxq',
    },
  });
  

// Define the API endpoint for sending emails
app.post('/sendemail',  async (req, res) => {
  const { recipient, subject, content } = req.body;
  console.log(recipient)
  try{
  // Create the email payload
  const mailOptions = {
    from: 'kazezepharoll47@gmail.com', // Replace with your Gmail email address
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
				
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Perform the login query
  connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (err, results) => {
    console.log(results)
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Assuming the "role" field is returned in the results
    const { role } = results[0];
    console.log(role)
    // Redirect users based on their role
    if (role === 'doctor') {
      return res.status(200).json({ message: 'Welcome, Doctor!', user: role });
    } else if (role === 'patient') {
      return res.status(200).json({ message: 'Welcome, Patient!', user: role });
    } else {
      return res.status(403).json({ error: 'Unknown role' });
    }
  });
});

app.post('/register', (req, res) => {
  const { fullnames, email, role, password } = req.body;
  console.log(req.body);

  
  connection.query(
    'SELECT COUNT(*) AS count FROM user WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      const userExists = results[0].count > 0;

      if (userExists) {
        res.status(400).json({ success: false, message: 'User with this email already exists' });
        return;
      }

      //perform the insertion
  connection.query(
    `INSERT INTO user (fullnames, email, role, password) VALUES (?, ?, ?, ?)`,
    [fullnames, email, role, password],
    (error, result) => {
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        return;
      }

      if (result && result.affectedRows > 0) {
        res.status(200).json({ success: true, message: 'User is successfully registered' });
      } else {
        res.status(400).json({ success: false, error: 'Invalid user credentials' });
      }
    }
  );
    })
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
        from: 'kazezepharoll47@gmail.com',
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
  const {purpose, day, time, details}  = req.body;

  connection.query("SELECT COUNT(*) as appointments FROM appointment WHERE day = ? AND time = ?", [day, time], (err, results)=>{
    if(err){
      res.status(500).json({success: false, message: "Error executing the get request"})
    }

console.log(results[0].appointments)
  if(results[0].appointments === 0){
    connection.query("INSERT INTO appointment(purpose, day, time, details) values(?,?,?,?)", [purpose, day, time, details], (err, response)=>{
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
  const [patient_id] = req.params.id;

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

  const query = 'INSERT INTO prescriptions ( medicine, recommendation, patient_id) VALUES (?, ?, ?)';
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


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
