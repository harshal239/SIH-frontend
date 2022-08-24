
import './App.css';
import { Routes, Route} from 'react-router-dom';

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.5.0";
import "./assets/demo/demo.css?v=1.5.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

import NucleoIcons from 'views/NucleoIcons';

import Landing from 'Components/Landing Page/Landing';
import CoorporateProfile from 'Components/Coorporate Profile/CoorporateProfile';
import AicteProfile from 'Components/AICTE Profile/AicteProfile';
import CollegeProfile from 'Components/College Profile/CollegeProfile';
import AddReasons from 'Components/AddReasons';
import UploadCSV from 'Components/UploadCSV';
import Login from 'Components/Login/Login';
import Unemployability_reasons from 'Components/Unemployability_reasons';
import IndexNavbar from 'Components/Navbars/IndexNavbar';

function App() {
  return (
    <div className="App">
      {/* <IndexNavbar /> */}
      <Routes>
          <Route path="/" element={<Landing/>}/>

          <Route path='/a' element={<IndexNavbar isfixed={true}/>}/>
          <Route path='/b' element={<IndexNavbar isfixed={false}/>}/>


          <Route path="/sign-up" element={<Login/>}/>
          <Route path="/icons" element={<NucleoIcons/>}/>
          <Route path="/homepage" element={<Landing/>}/>
          <Route path="/upload-record" element={<UploadCSV/>}/>
          <Route path="/coorporate-profile" element={<CoorporateProfile/>}/>
          <Route path="/aicte-profile" element={<AicteProfile/>}/>
          <Route path="/college-profile" element={<CollegeProfile/>}/>
          <Route path="/add-reasons" element={<AddReasons/>}/>
          <Route path="/unemployability-reasons" element={<Unemployability_reasons/>}/>
          <Route path="sign-in" element={<Login/>}/>
        </Routes>
    </div>
  );
}

export default App;
