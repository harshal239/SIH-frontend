import React, { useRef, useState, useEffect} from "react";
// reactstrap components
import {Button,Container,Row,Col,Dropdown,DropdownToggle,DropdownMenu,DropdownItem,Modal,ModalBody,ModalFooter,ModalHeader} from "reactstrap";
import {Chart as ChartJS,ArcElement,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import DatamapsIndia from "react-datamaps-india";
import ScrollIntoView from "react-scroll-into-view";
import useIntersection from "Components/CustomHooks/useIntersection";
import DefaultFooter from "Components/Footers/DefaultFooter.js";
import { BarOptions, MapLayout} from "./Graph_options"; // graph static data
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
import styles from "./profile.module.css";




// sample dataset for graphs ************** to be removed upon integration
import {PieData,ProgramData,mapRegionData,diversityData, highChartoptions} from "./dataset";

function Profile() {
  const [filterModal, setfilterModal] = useState(false);
  useEffect(() => {
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


  highcharts3d(Highcharts)


  ChartJS.register(Legend,Tooltip,ArcElement,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

  const pieRef = useRef();
  const barRef = useRef();
  const diversityBarRef = useRef();
  const mapRef = useRef();
  const pieInViewport = useIntersection(pieRef, "-300px");
  const barInViewport = useIntersection(barRef, "-300px");
  const diversityBarInViewport = useIntersection(diversityBarRef, "-300px");
  const mapInViewport = useIntersection(mapRef, "-300px");


  // for rendering list via map functionality ************* to be removed
  const statArray = [1, 2, 3, 4, 5, 6];
  // filter dropdowns static data, to be modified.. will remain static
  const filterArray = [1, 2, 3, 4, 5, 6, 7];

  return (
      <div className="wrapper">
        <div className="section">
          <Container>
            <Row style={{ marginTop: -106 }}>
              {
                // statistics cards
                statArray.map((item) => {
                  return (
                    <div className="col-xxl-3 col-md-4">
                      <div className="card info-card sales-card">
                        <div className="card-body">
                          <h5 className="card-title">
                            Total Institutions
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
              An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.
            </h5>

          </Container>
          
          {/* FILTERS */}
          <Modal
            isOpen={filterModal}
            toggle={() => setfilterModal(false)}
            fullscreen={true}
            className={styles.modal_size}
            scrollable={false}
            contentClassName={styles.modal__content}
          >
            <ModalHeader toggle={() => setfilterModal(false)}>
              Filters
            </ModalHeader>
            <ModalBody>
              {filterArray.map((item) => {
                return (
                  <Dropdown isOpen={false}>
                    <DropdownToggle
                      caret
                      color="neutral"
                      className={styles.drp_toggle}
                    >
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
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Submit</Button>{" "}
              <Button color="secondary" onClick={() => setfilterModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <div className={`container ${styles.graph_container}`}>
            <div className={styles.filter_row}>
              <h3>Graphs and Charts</h3>
              <span
                className="now-ui-icons design_bullet-list-67"
                onClick={() => setfilterModal(true)}
              />

              <div className={styles.filter_container}>
                {filterArray.map((item) => {
                  return (
                    <Dropdown isOpen={false}>
                      <DropdownToggle
                        caret
                        color="neutral"
                        className={styles.drp_toggle}
                      >
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
                })}
              </div>
            </div>

            {/* main container for graph and charts */}
            <Row>
              <Col md="3" className={styles.sticky__index}>
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
                  <li className={diversityBarInViewport ? styles.active : ""}>
                    <i className="now-ui-icons location_map-big" />
                    Employability Diversity
                  </li>
                  <li className={mapInViewport ? styles.active : ""}>
                    <i className="now-ui-icons location_map-big" />
                    Map
                  </li>
                </ul>
              </Col>

              <Col md="9" className={styles.graphs_left}>
                <div ref={pieRef} className={styles.pie}><Pie data={PieData}/></div>
                <div ref={barRef} id="barid"> <Bar options={BarOptions} data={ProgramData}/></div>
                <div ref={diversityBarRef}><Bar options={BarOptions} data={diversityData}/></div>
                <div className={styles.mapWrapper} ref={mapRef}>
                  <DatamapsIndia
                    regionData={mapRegionData}
                    hoverComponent={({ value }) => {
                      return (
                        <>
                          <p>{value.name}</p><p>{value.value}</p>
                        </>
                      );
                    }}
                    mapLayout={MapLayout}
                  />
                </div>

                <HighchartsReact highcharts={Highcharts} options={highChartoptions}/>
              </Col>
            </Row>
          </div>
        </div>
        <DefaultFooter />
      </div>
  );
}

export default Profile;
