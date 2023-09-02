import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',       // MySQL host (e.g., 'localhost' or IP address)
    user: 'root',        // MySQL username
    password: 'password',    // MySQL password
    database: 'test_model'     // MySQL database name
  });

export default connection;
