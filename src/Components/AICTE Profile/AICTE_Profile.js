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
  Card,
  CardBody,
  CardHeader,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
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
import AicteHeader from "../AICTE Profile/AicteHeader";
import IndexNavbar from "Components/Navbars/IndexNavbar";
import { useNavigate } from "react-router-dom";

import { Dropdown, Selection } from "react-dropdown-now";
import "react-dropdown-now/style.css";

import {
  yearOptions,
  programOptions,
  instituteTypes,
  statesOptions,
} from "../AICTE Profile/DropdownOptions";
// sample dataset for graphs ************** to be removed upon integration
import { PieData } from "../dataset";
import { baseurl } from "Components/baseUrl";
import DarkFooter from "Components/Footers/DarkFooter";

function AICTE_Profile() {
  const nav = useNavigate();
  const [filterModal, setfilterModal] = useState(false);
  const [programWise, setProgramWise] = useState({});
  const [instituteWise, setInstituteWise] = useState({});
  const [programGenderWise, setProgramGenderWise] = useState({});
  const [mapRegionData, setmapregionData] = useState({});
  const [yearWise, setYearWise] = useState({});
  const [filters, setfilters] = useState({
    year: "2022",
    program: "",
    instituteType: "",
    state: "",
    gender: "",
    minority: "",
  });

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

  const getyearWisePlacement = async () => {
    let data = {
      program: filters.program,
      // gender: filters.gender === "Female" ? "Female" : "",
      gender:"",
      state: filters.state,
      institutionType: filters.instituteType,
      minority: filters.minority === "Yes" ? "Yes" : "",
    };
    try {
      const res = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/chart//yearWisePlacement",
        data
      );

      let ids = [];
      let placedcount = [];
      let unplacedcount = [];
      let total = [];

      res.data.map((obj) => {
        ids.push(obj._id);
        placedcount.push(obj.placedStudentCount);
        unplacedcount.push(obj.unplacedStudentCount);
        total.push(obj.totalPlacedCount);
      });
      console.log(ids, placedcount, unplacedcount, total);
      setYearWise({ ids, placedcount, unplacedcount, total });
      // setProgramWise(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getprogramwiseplacement = async () => {
    let data = {
      year: parseInt(filters.year),
      // gender: filters.gender === "Female" ? "Female" : "",
      gender:"",
      state: filters.state,
      institutionType: filters.instituteType,
      minority: filters.minority === "Yes" ? "Yes" : "",
    };
    try {
      const program = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/chart/programWisePlacement",
        data
      );
      const response = dataMapper(program.data);
      setProgramWise(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getinstitutewisePlacement = async () => {
    let data = {
      year: parseInt(filters.year),
      // gender: filters.gender === "Female" ? "Female" : "",
      gender:"",
      state: filters.state,
      program: filters.program,
      minority: filters.minority === "Yes" ? "Yes" : "",
    };
    try {
      const institute = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/chart/institutionTypeWisePlacement",
        data
      );
      const res = dataMapper(institute.data);
      setInstituteWise(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getProgramGenderWise = async () => {
    try {
      const memo = await axios.post(
        "http://localhost:4000/api/v1/chart/programGenderWisePlacement",
        {
          year: 2021,
          state: "",
          institutionType: "",
          minority: "",
        }
      );
      let ids = [];
      let maleplaced = [];
      let femaleplaced = [];
      memo.data.map((obj) => {
        ids.push(obj._id);
        maleplaced.push(obj.malePlacedStudentCount);
        femaleplaced.push(obj.femalePlacedStudentCount);
      });
      setProgramGenderWise({ ids, maleplaced, femaleplaced });
    } catch (err) {
      console.log(err);
    }
  };

  const getstatewisePlacement = async () => {
    let data = {
      year: "",
      // gender: filters.gender === "Female" ? "Female" : "",
      gender:"",
      institutionType: filters.instituteType,
      program: filters.program,
      minority: filters.minority === "Yes" ? "Yes" : "",
    };
    try {
      const res = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/chart/stateWisePlacement",
        data
      );
      console.log(res.data[0]);

      let obj1 = {};
      res.data.map((item) => {
        obj1[item._id] = { value: item.unplacedStudentCount };
      });
      console.log(obj1);
      setmapregionData(obj1);
      // placedStudentCount: 1
      // unplacedStudentCount: 1
      // _id: "Gujarat"
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getprogramwiseplacement();
    getinstitutewisePlacement();
    getProgramGenderWise();
    getstatewisePlacement();
    getyearWisePlacement();
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

  // to update graphs
  useEffect(() => {
    getprogramwiseplacement();
    getinstitutewisePlacement();
    getProgramGenderWise();
    getstatewisePlacement();
    getyearWisePlacement();
  }, [filters]);

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

  // for rendering list via map functionality ************* to be removed
  const statArray = [
    {
      label: "Total Institutions",
      value: 8999,
    },
    {
      label: "Total Students",
      value: "15L",
    },
    {
      label: "Placed",
      value: "11L",
    },
    // {
    //   label: "Male",
    //   value: 17,
    // },
    // {
    //   label: "Female",
    //   value: 4,
    // },
    // {
    //   label: "Minority",
    //   value: 1,
    // },
  ];

  const filterArray = [1, 2, 3];

  const [iconPills, setIconPills] = React.useState("1");

  return (
    <div className='wrapper'>
      <IndexNavbar/>
      <AicteHeader />
      <div className={`section ${styles.profile_body}`}>
        <div className={`container ${styles.graph_container}`}>
          <Row>
            {
              // statistics cards
              statArray.map((item) => {
                return (
                  <div class="col-xxl-3 col-md-4">
                    <Card className={styles.stat_card}>
                      <CardBody>
                        <span className={styles.stat_header}>{item.label} <span>| {filters.year}</span></span>
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
          <Row>
            <Col md="3" className={styles.sticky__index}>
              <Card style={{"height":"637px"}}>
                <CardBody>
                  <h3>Graphs</h3>
                  <div className={styles.drpwrapper}>
                    <span className={styles.filter_label}>Year</span>
                    {/* academic year filter */}
                    <Dropdown
                      placeholder="Select year"
                      className="my-className"
                      options={yearOptions}
                      value={filters.year}
                      onChange={(item) =>
                        setfilters({ ...filters, year: item.value })
                      }
                      // onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                      // onClose={(closedBySelection) =>
                      //   closedBySelection && updategraphs()
                      // }
                    />
                  </div>

                  <div className={styles.drpwrapper}>
                    <span className={styles.filter_label}>Program</span>
                    {/* program filter */}
                    <Dropdown
                      placeholder="Select Program"
                      className="my-className"
                      options={programOptions}
                      value="one"
                      onChange={(item) =>
                        setfilters({ ...filters, program: item.value })
                      }
                    />
                  </div>

                  <div className={styles.drpwrapper}>
                    <span className={styles.filter_label}>Institute Type</span>
                    {/* institute type filter */}
                    <Dropdown
                      placeholder="Select Institute Type"
                      className="my-className"
                      options={instituteTypes}
                      value="one"
                      onChange={(item) =>
                        setfilters({ ...filters, instituteType: item.value })
                      }
                    />
                  </div>

                  <div className={styles.drpwrapper}>
                    <span className={styles.filter_label}>State</span>
                    {/* state filters */}
                    <Dropdown
                      placeholder="Select State"
                      className="my-className"
                      options={statesOptions}
                      value="one"
                      onChange={(item) => {
                        setfilters({ ...filters, state: item.value });
                      }}
                    />
                  </div>
{/* 
                  <div className={styles.drpwrapper}>
                    <span className={styles.filter_label}>Gender</span>
                    <Dropdown
                      placeholder="Select Gender"
                      className="my-className"
                      options={["Male", "Female"]}
                      value="one"
                      onChange={(item) => {
                        setfilters({ ...filters, gender: item.value });
                      }}
                    />
                  </div> */}

                  {/* <div className={styles.drpwrapper}>
                    <span className={styles.filter_label}>Minority</span>
                    <Dropdown
                      placeholder="Select Minority"
                      className="my-className"
                      options={["Yes", "No"]}
                      value="one"
                      onChange={(item) => {
                        setfilters({ ...filters, minority: item.value });
                      }}
                    />
                  </div> */}

                </CardBody>
              </Card>
            </Col>

            <Col md="9" className={styles.graphs_left}>
              <Card className={styles.graphs__mainCard}>
                <CardHeader>
                  <Nav className="justify-content-center" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconPills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("1");
                        }}
                      >
                        <i className="now-ui-icons location_map-big"></i>
                        Program Wise
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconPills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("2");
                        }}
                      >
                        <i className="now-ui-icons location_map-big"></i>
                        Instititute Type Wise
                      </NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink
                        className={iconPills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("3");
                        }}
                      >
                        <i className="now-ui-icons location_map-big"></i>
                        Gender Wise
                      </NavLink>
                    </NavItem> */}
                    <NavItem>
                      <NavLink
                        className={iconPills === "4" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("4");
                        }}
                      >
                        <i className="now-ui-icons location_map-big"></i>
                        State Wise
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconPills === "5" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("5");
                        }}
                      >
                        <i className="now-ui-icons location_map-big"></i>
                        Year Wise
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"iconPills" + iconPills}
                  >
                    <TabPane tabId="iconPills1">
                      <div ref={barRef} id="barid">
                        <Bar
                          onClick = {()=>nav("/branch-wise")}
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
                    </TabPane>
                    <TabPane tabId="iconPills2">
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
                    </TabPane>
                    <TabPane tabId="iconPills3">
                      <div ref={barRef} id="barid">
                        <Bar
                          options={programGenderWise.ids}
                          data={{
                            labels: instituteWise.ids,
                            datasets: [
                              {
                                label: "Male Placed",
                                data: programGenderWise.maleplaced,
                                backgroundColor: "#2CA8FF",
                              },
                              {
                                label: "Female Placed",
                                data: programGenderWise.femaleplaced,
                                backgroundColor: "#FFB236",
                              },
                            ],
                          }}
                        />
                      </div>
                    </TabPane>
                    <TabPane tabId="iconPills4">
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
                    </TabPane>
                    <TabPane tabId="iconPills5">
                    <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "column",
                    options3d: {
                      enabled: true,
                      alpha: 10,
                      beta: 25,
                      depth: 220,
                      viewDistance: 25,
                    },
                  },
                  title: {
                    text: "",
                  },

                  legend: {
                    verticalAlign: "right",
                    layout: "horizontal",
                    x: 0,
                    y: 0,
                  },

                  xAxis: {
                    categories: yearWise.ids,
                    labels: {
                      skew3d: true,
                      style: {
                        fontSize: "16px",
                      },
                    },
                  },

                  yAxis: {
                    categories: [
                      "0M",
                      "2M",
                      "4M",
                      "6M",
                      "8M",
                      "10M",
                      "12M",
                      "14M",
                    ],
                    allowDecimals: false,
                    min: 0,
                    title: {
                      text: "Number of Students",
                      skew3d: true,
                    },
                  },
                  plotOptions: {
                    column: {
                      stacking: true,
                      // groupZPadding: 10,
                      depth: 40,
                      grouping: false,
                    },
                  },

                  series: [
                    {
                      name: "Unplaced",
                      data: yearWise.unplacedcount,
                      stack: 0,
                    },
                    {
                      name: "Placed",
                      data: yearWise.placedcount,
                      stack: 1,
                    },
                    {
                      name: "Total",
                      data: yearWise.total,
                      stack: 2,
                    },
                  ],
                }}
              />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
              {/* Program wise placement graph */}
             
            </Col>

          </Row>
          {/* <Row>
            <Col>
            <Card>
              
              <CardBody>
                  <h2>Branch Wise Placement</h2>
                  <div style={{"height":"400px", "width":"400px", "margin":"auto"}}>

              <Pie data={PieData} />
                  </div>
              </CardBody>
            </Card>
            </Col>
          </Row> */}
        </div>
      </div>
      <DarkFooter/>
      {/* <DefaultFooter /> */}
    </div>
  );
}

export default AICTE_Profile;
