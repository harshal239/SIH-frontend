// import logo from './logo.svg';
import './App.css';

import { Routes, Route, useNavigate} from 'react-router-dom';

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.5.0";
import "./assets/demo/demo.css?v=1.5.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

// import {useNavigate} from 'react-router-dom';
import Index from 'views/Index';
import NucleoIcons from 'views/NucleoIcons';
import LoginPage from 'views/examples/LoginPage';
import LandingPage from 'views/examples/LandingPage';
import ProfilePage from 'views/examples/ProfilePage';

import AicteProfile from 'Components/AICTE Profile/Profile';

import IndexNavbar from 'Components/Navbars/IndexNavbar';

function App() {
  const nav = useNavigate();
  return (
    <div className="App">
      <IndexNavbar />

      {/* <ul>
        <li onClick={()=>nav('/allIndex')}>All Index</li>
        <li onClick={()=>nav('/nucleo-icons')}>Nuclie Icons</li>
        <li onClick={()=>nav('/landing-page')}>Landing Page</li>
        <li onClick={()=>nav('profile-page')}>Profile Page</li>
        <li onClick={()=>nav('/login-page')}>Login Page</li>
      </ul> */}
      <Routes>
          <Route path="/allIndex" element={<Index/>} />
          <Route
            path="/nucleo-icons"
            element={<NucleoIcons/>}
          />
          <Route
            path="/landing-page"
            element={<LandingPage/>}
          />
          <Route
            path="/profile-page"
            element={<ProfilePage/>}
          />
          <Route path="/aicte-profile" element={<AicteProfile/>}/>
          <Route
            path="/login-page"
            element={<LoginPage/>}
          />
        </Routes>
    </div>
  );
}

export default App;
