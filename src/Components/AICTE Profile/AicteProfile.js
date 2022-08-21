import React, { useRef, useState, useEffect } from "react";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledDropdown,
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
} from "chart.js";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import DatamapsIndia from "react-datamaps-india";
import ScrollIntoView from "react-scroll-into-view";
import useIntersection from "Components/CustomHooks/useIntersection";
import DefaultFooter from "Components/Footers/DefaultFooter.js";
import { BarOptions, MapLayout } from "../Graph_options"; // graph static data
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
import styles from "../profile.module.css";
import AicteHeader from "./AicteHeader";
import { Card, CardBody, CardTitle } from "reactstrap";

import { Dropdown, Selection } from "react-dropdown-now";
import "react-dropdown-now/style.css";

import { yearOptions, instituteTypes, statesOptions } from "./DropdownOptions";
// sample dataset for graphs ************** to be removed upon integration
import {
  PieData,
  // ProgramData,
  InstituteTypeData,
  mapRegionData,
  diversityData,
  highChartoptions,
} from "../dataset";
import { baseurl } from "Components/baseUrl";

// export const ProgramData = {
//   labels:programs,
//   datasets: [
//     {
//       label: 'Placed',
//       data: [65,23,54,76,12,5,45,32,71],
//       backgroundColor: '#2CA8FF',
//     },
//     {
//       label: 'Unplaced',
//       data: [23,11,43,32,9,5,32,31,23],
//       backgroundColor: '#FFB236',
//     }
//   ],
// };

function AicteProfile() {
  const [filterModal, setfilterModal] = useState(false);
  const [programWise, setProgramWise] = useState({});
  const [instituteWise, setInstituteWise] = useState({});

  const dataMapper = (data) => {
    const ids = [];
    const placedCount = [];
    const unplacedCount = [];

    data.map((obj) => {
      ids.push(obj._id);
      placedCount.push(obj.placedStudentCount);
      unplacedCount.push(obj.unplacedStudentCount);
    });
    return { ids, placedCount, unplacedCount };
  };

  const getprogramwiseplacement = async () => {
    try {
      const program = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/chart/programWisePlacement",
        {
          year: 2022,
          gender: "",
          state: "",
          institutionType: "",
          minority: "",
        }
      );
      const response = dataMapper(program.data);
      setProgramWise(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getinstitutewisePlacement = async () => {
    try {
      const institute = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/chart/institutionTypeWisePlacement",
        {
          year: 2021,
          gender: "",
          state: "",
          program: "",
          minority: "",
        }
      );

      const res = dataMapper(institute.data);
      setInstituteWise(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getprogramwiseplacement();
    getinstitutewisePlacement();
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

  highcharts3d(Highcharts);

  ChartJS.register(
    Legend,
    Tooltip,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const pieRef = useRef();
  const barRef = useRef();
  const diversityBarRef = useRef();
  const mapRef = useRef();
  const pieInViewport = useIntersection(pieRef, "-300px");
  const barInViewport = useIntersection(barRef, "-300px");
  const diversityBarInViewport = useIntersection(diversityBarRef, "-300px");
  const mapInViewport = useIntersection(mapRef, "-300px");

  // for rendering list via map functionality ************* to be removed
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
  // filter dropdowns static data, to be modified.. will remain static
  const filterArray = [1, 2, 3, 4, 5, 6, 7];
  // dropdown options

  // year, gender, state, institutionType, minority
  const { year, setyear } = useState("");
  const { program, setprogram } = useState("");

  return (
    <div className="wrapper">
      <AicteHeader />
      <div className={`section ${styles.profile_body}`}>
        <Container>
          <Row style={{ marginTop: -106 }}>
            {
              // statistics cards
              statArray.map((item) => {
                return (
                  <div class="col-xxl-3 col-md-4">
                    <Card>
                      <CardBody>
                        <span className={styles.stat_header}>{item.label}</span>
                        <div
                          className="d-flex align-items-center"
                          style={{ height: "40px" }}
                        >
                          <div
                            className=" btn-icon btn-round btn btn-github "
                            style={{ background: "#f6f6fe" }}
                          >
                            <i className="now-ui-icons users_single-02"></i>
                          </div>
                          <div class="ps-3">
                            <span className={styles.stat_value}>
                              {item.value} M
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
              {/* academic year filter */}
              <Dropdown
                placeholder="Select year"
                className="my-className"
                options={yearOptions}
                value="one"
                onChange={(item) => setyear(item.value)}
                // onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                onClose={(closedBySelection) =>
                  console.log("closedBySelection?:", closedBySelection)
                }
                onOpen={() => console.log("open!")}
              />
              ;{/* gender filter */}
              {filterArray.map((item) => {
                return (
                  <UncontrolledDropdown>
                    <DropdownToggle caret>Dropdown</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Header</DropdownItem>
                      <DropdownItem disabled>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                );
              })}
            </div>
          </div>

          {/* main container for graph and charts */}
          <Row>
            <Col md="3" className={styles.sticky__index}>
              <ul className={styles.graph_index_list}>
                <li className={barInViewport ? styles.active : ""}>
                  <i className="now-ui-icons business_chart-bar-32"> </i>
                  <ScrollIntoView selector="#barid" alignToTop={true}>
                    <span>Placement vs Program</span>
                  </ScrollIntoView>
                </li>
                <li className={barInViewport ? styles.active : ""}>
                  <i className="now-ui-icons business_chart-bar-32"> </i>
                  <ScrollIntoView selector="#barid" alignToTop={true}>
                    <span>Placement vs Institute Types</span>
                  </ScrollIntoView>
                </li>
                <li className={mapInViewport ? styles.active : ""}>
                  <i className="now-ui-icons location_map-big" />
                  StateWise
                </li>
                <div className={styles.disabled}>
                  <hr />
                  <span>
                    <i>future scope</i>
                  </span>
                  <li>
                    <i className="now-ui-icons business_chart-pie-36"> </i>
                    Unemployability Distribution
                  </li>
                  <li>
                    <i className="now-ui-icons location_map-big" />
                    Employability Diversity
                  </li>
                </div>
              </ul>
            </Col>

            <Col md="9" className={styles.graphs_left}>
              <div ref={barRef} id="barid">
                <Bar
                  options={BarOptions}
                  data={{
                    labels: programWise.ids,
                    datasets: [
                      {
                        label: "Placed",
                        data: programWise.placedCount,
                        backgroundColor: "#2CA8FF",
                      },
                      {
                        label: "Unplaced",
                        data: programWise.unplacedCount,
                        backgroundColor: "#FFB236",
                      },
                    ],
                  }}
                />
              </div>

              <div ref={barRef} id="barid">
                <Bar
                  options={BarOptions}
                  data={{
                    labels: instituteWise.ids,
                    datasets: [
                      {
                        label: "Placed",
                        data: instituteWise.placedCount,
                        backgroundColor: "#2CA8FF",
                      },
                      {
                        label: "Unplaced",
                        data: instituteWise.unplacedCount,
                        backgroundColor: "#FFB236",
                      },
                    ],
                  }}
                />
              </div>
              <div className={styles.mapWrapper} ref={mapRef}>
                <DatamapsIndia
                  regionData={mapRegionData}
                  hoverComponent={({ value }) => {
                    return (
                      <>
                        <p>{value.name}</p>
                        <p>{value.value}</p>
                      </>
                    );
                  }}
                  mapLayout={MapLayout}
                />
              </div>
              <hr />
              <div ref={pieRef} className={styles.pie}>
                <Pie data={PieData} />
              </div>
              <HighchartsReact
                highcharts={Highcharts}
                options={highChartoptions}
              />
            </Col>
          </Row>
        </div>
      </div>
      <DefaultFooter />
    </div>
  );
}

export default AicteProfile;
