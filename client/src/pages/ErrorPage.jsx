// ErrorPage.js
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ErrorPage = ({ errorTitle, errorMessage }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <div style={styles.container}>
        <h1 style={styles.errorTitle}>{errorTitle}</h1>
        <p style={styles.errorMessage}>{errorMessage}</p>
        <p style={styles.backHome}>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </p>
      </div>
    </Card>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  errorTitle: {
    fontSize: '40px',
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
