import mysql from 'mysql';
import bcrypt from 'bcrypt';

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'heartbud'
  });

  // const saltRounds = 10;
  // const plaintextPassword = '1234';

  // // Generate the salt and hash the password
  // bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
  //   if (err) {
  //     console.error('Error hashing password:', err);
  //   } else {
  //     console.log('Hashed Password:', hash);
  //   }
  // });

//   kazeze pharoll	kazeze@gmail.com #1234
// kazeze	kazezepharoll47@gmail.com #kaze1234
// kwakye	ozbee@gmail.com #ozee47
// james k	jk@gmail.com #jk1234

export default connection;
