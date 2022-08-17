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

import Landing from 'Components/Landing Page/Landing';
import CoorporateProfile from 'Components/Coorporate Profile/CoorporateProfile';
import AicteProfile from 'Components/AICTE Profile/AicteProfile';
import CollegeProfile from 'Components/College Profile/CollegeProfile';
import Login from 'Components/Login/Login';

import IndexNavbar from 'Components/Navbars/IndexNavbar';

function App() {
  const nav = useNavigate();
  return (
    <div className="App">
      <IndexNavbar />

      <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/allIndex" element={<Index/>} />
          <Route path="/sign-up" element={<Login/>}/>
          <Route
            path="/icons"
            element={<NucleoIcons/>}
          />
          <Route path="/homepage" element={<Landing/>}/>
          <Route
            path="/upload-record"
            element={<Login/>}
          />
          <Route path="/coorporate-profile" element={<CoorporateProfile/>}/>
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
