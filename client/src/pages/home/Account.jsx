import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFlash } from '../../components/flash/FlashContext';

export default function Account() {
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
    <div className="account-page" style={{padding: '2rem'}}>
      <h1>Account</h1>
      <p>This is a placeholder for account settings. Implement profile, password change, and preferences here.</p>
    </div>
  );
}
