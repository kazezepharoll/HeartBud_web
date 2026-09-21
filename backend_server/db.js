// mysql2, not the legacy `mysql` package: MySQL 8+/9+ defaults new users to
// the caching_sha2_password auth plugin, which the unmaintained `mysql`
// package cannot speak at all (ER_NOT_SUPPORTED_AUTH_MODE on every connection).
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

// Accepts either a single connection URL (DATABASE_URL / MYSQL_URL — what
// Railway's MySQL plugin suggests, e.g. `${{MySQL.MYSQL_PRIVATE_URL}}`) or
// the four discrete DB_* variables used for local development.
const connectionUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

const connection = connectionUrl
  ? mysql.createConnection(connectionUrl)
  : mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'heartbud',
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
