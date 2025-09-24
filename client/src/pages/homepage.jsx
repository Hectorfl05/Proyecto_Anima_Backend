import './homepage.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFlash } from '../components/flash/FlashContext';

function Homepage() {
  const location = useLocation();
  const flash = useFlash();

  useEffect(() => {
    try {
      if (location && location.state && location.state.flash && flash && flash.show) {
        flash.show(location.state.flash, 'success', 4000);
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="homepage">
      <h1>Welcome to the Homepage</h1>
      <p>This is the main landing page of the application.</p>
    </div>
  );
}

export default Homepage;