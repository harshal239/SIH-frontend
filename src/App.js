// import logo from './logo.svg';
import './App.css';
import IndexNavbar from "./Components/Navbars/IndexNavbar";
// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.5.0";
import "./assets/demo/demo.css?v=1.5.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.5.0";


// templates comp
import Index from './views/Index';

// views
import Images from "./views/index-sections/Images.js";
import BasicElements from "./views/index-sections/BasicElements.js";
import Navbars from "./views/index-sections/Navbars.js";
import Tabs from "./views/index-sections/Tabs.js";
import Pagination from "./views/index-sections/Pagination.js";
import Notifications from "./views/index-sections/Notifications.js";
import Typography from "./views/index-sections/Typography.js";
import Javascript from "./views/index-sections/Javascript.js";
import Carousel from "./views/index-sections/Carousel.js";
import NucleoIcons from "./views/index-sections/NucleoIcons.js";
import CompleteExamples from "./views/index-sections/CompleteExamples.js";
import SignUp from "./views/index-sections/SignUp.js";
import Examples from "./views/index-sections/Examples.js";
import Download from "./views/index-sections/Download.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <IndexNavbar/>
      <div className="wrapper">
        <Index/>
        {/* <IndexHeader /> */}
        {/* <div className="main">
          <Images />
          <BasicElements />
          <Navbars />
          <Tabs />
          <Pagination />
          <Notifications />
          <Typography />
          <Javascript />
          <Carousel />
          <NucleoIcons />
          <CompleteExamples />
          <SignUp />
          <Examples />
          <Download />
        </div> */}
        {/* <DarkFooter /> */}
      </div>


      <div style={{"height":"5000px"}}></div>
    </div>
  );
}

export default App;
