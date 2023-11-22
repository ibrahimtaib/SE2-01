// ErrorPage.js
import React from 'react';

// eslint-disable-next-line react/prop-types
const ErrorPage = ({ errorTitle, errorMessage }) => {
  return (
      <div style={styles.container}>
        <h1 style={styles.errorTitle}>{errorTitle}</h1>
        <p style={styles.errorMessage}>{errorMessage}</p>
        <p style={styles.backHome}>
          <a href="/">Back to Home</a>
        </p>
      </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  errorTitle: {
    fontSize: '100px',
    color: '#e74c3c',
    margin: '0',
  },
  errorMessage: {
    fontSize: '24px',
    color: '#34495e',
    margin: '10px 0',
  },
  backHome: {
    fontSize: '18px',
    color: '#3498db',
    margin: '20px 0',
  },
};

export default ErrorPage;
