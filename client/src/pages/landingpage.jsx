import './landingpage.css';
import Navbar from '../components/navbar';

function Landingpage() {
  return (
    <div className="landingpage">
      <Navbar />
      <h1>Welcome to the Landing Page</h1>
      <p>This is the main landing page of the application.</p>
    </div>
  );
}

export default Landingpage;
