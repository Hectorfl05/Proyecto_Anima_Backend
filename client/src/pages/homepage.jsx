import './homepage.css';
import Navbar from '../components/navbar';

function Homepage() {
  return (
    <div className="homepage">
      <Navbar />
      <h1>Welcome to the Homepage</h1>
      <p>This is the main landing page of the application.</p>
    </div>
  );
}

export default Homepage;