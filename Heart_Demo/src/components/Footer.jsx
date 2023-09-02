import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; {new Date().getFullYear()} Cardiovascular Disease Predictor. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '40px 20px',
    textAlign: 'center',
    bottom: 0,
    left: 0,
    width: '100%',
    marginTop: '40px'
  },
  text: {
    fontSize: '20px',
    margin: 0,
  },
};

export default Footer;
