import './App.css';
import {Routes, Route} from 'react-router-dom';
import Homepage from './pages/homepage';
import Account from './pages/home/Account';
import Landingpage from './pages/landingpage';
import RequireAuth from './components/RequireAuth';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={
            <RequireAuth>
              <Homepage />
            </RequireAuth>
          }>
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
