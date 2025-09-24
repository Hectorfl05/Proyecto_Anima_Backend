import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landingpage from './pages/landingpage';
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
