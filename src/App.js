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
import LandingPage from 'views/examples/LandingPage';

import AicteProfile from 'Components/AICTE Profile/Profile';
import CollegeProfile from 'Components/College Profile/CollegeProfile';
import Login from 'Components/Login/Login';

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
          <Route path="/login" element={<Login/>}/>
          <Route
            path="/nucleo-icons"
            element={<NucleoIcons/>}
          />
          <Route
            path="/landing-page"
            element={<LandingPage/>}
          />
          <Route
            path="/upload-record"
            element={<Login/>}
          />
          <Route path="/aicte-profile" element={<AicteProfile/>}/>
          <Route path="/college-profile" element={<CollegeProfile/>}/>
          <Route
            path="sign-in"
            element={<Login/>}
          />
        </Routes>
    </div>
  );
}

export default App;
