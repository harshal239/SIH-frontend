import React, { useRef, useState } from "react";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

import {
  PieData,
  BarData,
  Chart3dData,
  mapRegionData,
  LineData,
  hbarData,
} from "../dataset";

import DatamapsIndia from "react-datamaps-india";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import ScrollIntoView from "react-scroll-into-view";

import useIntersection from "Components/CustomHooks/useIntersection";
// core components
import CollegeHeader from "./CollegeHeader";
import DefaultFooter from "Components/Footers/DefaultFooter.js";
import IndexNavbar from "Components/Navbars/IndexNavbar";
import styles from "../profile.module.css";
import axios from "axios";
import { baseurl } from "Components/baseUrl";
// import { getstats } from "./GetData";
// import { useLocation } from 'react-router-dom';

function CollegeProfile() {
  const [filterModal, setfilterModal] = useState(false);
  const [stats, setstats] = useState({});

  const getstats = () => {
    let userid = localStorage.getItem("userid");
    let temp;
    axios.get(baseurl + "/chart/placedUnplacedGraph/" + userid).then((res) => {
      console.log(res.data);
      setstats(res.data);
    });
  };
  React.useEffect(() => {
    // console.log(location);
    // let userid = localStorage.getItem('userid');
    // console.log(userid);
    getstats();
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  ChartJS.register(
    Legend,
    Tooltip, // common
    ArcElement, // pie
    CategoryScale, // bar
    LinearScale,
    BarElement,
    Title,
    LineElement,
    PointElement
  );

  // dummy data for pie chart

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const pieRef = useRef();
  const barRef = useRef();
  const diversityBarRef = useRef();
  const mapRef = useRef();
  const pieInViewport = useIntersection(pieRef, "-300px");
  const barInViewport = useIntersection(barRef, "-300px");
  const diversityBarInViewport = useIntersection(diversityBarRef, "-300px");
  const statArray = [
    {
      label: "Total Institutions",
      value: 8999,
    },
    {
      label: "Total Students",
      value: 21,
    },
    {
      label: "Placed",
      value: 16,
    },
    {
      label: "Male",
      value: 17,
    },
    {
      label: "Female",
      value: 4,
    },
    {
      label: "Minority",
      value: 1,
    },
  ];
  const filterArray = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <div className="wrapper">
        <IndexNavbar isfixed={false} />
        <CollegeHeader />
        <div className={`section ${styles.profile_body}`}>
          <div className={`container ${styles.graph_container}`}>
            <Row>
              {
                // statistics cards
                // console.log(stats)
                // Object.entries(stats).map(([k, v]) => {
                  statArray.map(item=>{
                  return (
                    <div class="col-xxl-3 col-md-4">
                      <Card className={styles.stat_card}>
                        <CardBody>
                          <span className={styles.stat_header}>
                            {/* {k} */}
                            {/* 2534 */}
                            {item.label}
                             <span>| 2022</span>
                          </span>
                          <div
                            className="d-flex align-items-center"
                            style={{ height: "75px" }}
                          >
                            <div
                              className=" btn-icon btn-round btn btn-github "
                              style={{ background: "#f6f6fe" }}
                            >
                              <i className="now-ui-icons users_single-02"></i>
                            </div>
                            <div class="ps-3">
                              <span className={styles.stat_value}>
                                {/* {v} M */}
                                {item.value}
                                </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  );
                })
              }
            </Row>
          </div>

          <div className={`container ${styles.graph_container}`}>
            {/* main container for graph and charts */}
            <Row style={{ justifyContent: "center" }}>
              {/* graph nav index */}

              <Col md="9" className={styles.graphs_left}>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h3>Salary Based Pie Chart</h3>
                    </CardTitle>
                    <div ref={pieRef} className={styles.pie}>
                      <Pie data={PieData} />
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <div ref={barRef} id="barid">
                      <Line
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: "top",
                            },
                            title: {
                              display: true,
                              text: "Gender Based Placements",
                            },
                          },
                        }}
                        data={LineData}
                      />
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <div ref={diversityBarRef}>
                      <Bar
                        options={{
                          // type="column",
                          indexAxis: "y",
                          elements: {
                            bar: {
                              borderWidth: 2,
                            },
                          },
                          responsive: true,
                          plugins: {
                            legend: {
                              position: "right",
                            },
                            title: {
                              display: true,
                              text: "Top Hiring Companies",
                            },
                          },
                        }}
                        data={hbarData}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default CollegeProfile;
