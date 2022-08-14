import React, {useRef} from "react";

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
  UncontrolledTooltip
} from "reactstrap";

import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { Pie, Bar } from 'react-chartjs-2';

import { PieData, BarData} from "./dataset";


import DatamapsIndia from 'react-datamaps-india'

import ScrollIntoView from 'react-scroll-into-view'

import useIntersection from "Components/CustomHooks/useIntersection";
// core components
import AicteHeader from "./AicteHeader";
import DefaultFooter from "Components/Footers/DefaultFooter.js";

import styles from './profile.module.css';

function AicteProfile() {
  React.useEffect(() => {
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
    Legend, Tooltip, // common
    ArcElement, // pie
    CategoryScale, // bar
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);
  
  // dummy data for pie chart
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      },
    },
  };


  const pieRef = useRef();
  const barRef = useRef();
  const mapRef = useRef();
  const pieInViewport = useIntersection(pieRef, '-300px');
  const barInViewport = useIntersection(barRef, '-300px');
  const mapInViewport = useIntersection(mapRef, '-300px');
  const statArray = [1,2,3,4,5,6];
  const filterArray = [1,2,3,4,5,6,7];

  return (
    <>
      <div className="wrapper">
        <AicteHeader/>
        <div className="section">
          <Container>
            <Row style={{marginTop:-106}}>

              {
                // statistics cards
                statArray.map((item) => {
                  return(
                    <div className="col-xxl-3 col-md-4">
                      <div className="card info-card sales-card">
                        <div className="card-body">
                          <h5 className="card-title">Total Institutions
                            <span>| 2020</span>
                          </h5>
                          <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">  
                              <i className="bi bi-people"></i>
                            </div>
                            <div className="ps-3">
                              <h6>8999</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </Row>
            <h3 className="title">About</h3>
            <h5 className="description">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </h5>

            {/* FILTERS */}
            
            

            </Container>

            <div className={`container ${styles.graph_container}`}>
              <Row className={styles.filter_row}>
                <Col md="3"><h3>Graphs and Charts</h3></Col>
                <Col>
                    <div className={styles.filter_container}>
                  {
                    filterArray.map(item => {
                      return(
                      <Dropdown isOpen={false} >
                        <DropdownToggle caret color="neutral" className={styles.drp_toggle}>
                          Default value
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Header</DropdownItem>
                          <DropdownItem disabled>Action</DropdownItem>
                          <DropdownItem>Another Action</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      );
                    })
                  }
                  </div>
                </Col>
              </Row>
              
              {/* main container for graph and charts */}
              <Row>
                <Col md="3" className={styles.sticky__index}>
                  {/* <h2>Graphs and Charts</h2> */}
                  <ul className={styles.graph_index_list}>
                    <li className={pieInViewport ? styles.active : ""}>
                      <i className="now-ui-icons business_chart-pie-36"> </i>
                      Unemployability Distribution
                      </li>
                      
                      
                    <li className={barInViewport ? styles.active : ""}>
                      <i className="now-ui-icons business_chart-bar-32"> </i>
                      <ScrollIntoView selector="#barid" alignToTop={true}>
                      <span>Bar Chart</span>
                      </ScrollIntoView>
                    </li>
                    <li className={mapInViewport ? styles.active : ""}>
                      <i className="now-ui-icons location_map-big"/>
                      Map
                    </li>
                  </ul>    
                </Col>
                <Col md="9" className={styles.graphs_left}>
                  <div ref={pieRef} className={styles.pie}>
                  <Pie data={PieData}/>
                  </div>
                  <div ref={barRef} id="barid">
                  <Bar options={barOptions} data={BarData}/>
                  </div>
                  <div className={styles.mapWrapper}  ref={mapRef}>
                  <DatamapsIndia
                    regionData={{
                      Maharashtra: {
                        value: 10,
                      },
                      Gujarat:{
                        value: 60,
                      }
                    }}
                    hoverComponent={({ value }) => {
                      return (
                        <>
                          <p>{value.name}</p>
                          <p>{value.value}</p>
                        </>
                      )
                    }}
                    mapLayout={{
                      title: 'Title',
                      legendTitle: 'Legend Title',
                      startColor: '#FFDAB9',
                      endColor: '#FF6347',
                      hoverTitle: 'Count',
                      noDataColor: '#f5f5f5',
                      borderColor: '#8D8D8D',
                      hoverBorderColor: '#8D8D8D',
                      hoverColor: 'green',
                    }}
                  />

                  </div>
                </Col>
              </Row>

            </div>
          
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default AicteProfile;
