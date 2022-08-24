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
import IndexNavbar from "Components/Navbars/IndexNavbar";
import { Card, CardBody, CardTitle } from "reactstrap";

import { Dropdown, Selection } from "react-dropdown-now";
import "react-dropdown-now/style.css";

import { yearOptions, programOptions, instituteTypes, statesOptions } from "./DropdownOptions";
// sample dataset for graphs ************** to be removed upon integration
import {
  PieData,
  // ProgramData,
  InstituteTypeData,
  diversityData,
  highChartoptions,
} from "../dataset";
import { baseurl } from "Components/baseUrl";



function AicteProfile() {
  const [filterModal, setfilterModal] = useState(false);
  const [programWise, setProgramWise] = useState({});
  const [instituteWise, setInstituteWise] = useState({});
  const [mapRegionData, setmapregionData] = useState({});
  const [yearWise, setYearWise] = useState({});
  const [filters, setfilters] = useState({
    year: "",
    program: "",
    instituteType: "",
    state:"",
    gender:"",
    minority:"",
  })

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
      gender: (filters.gender === "Female") ? "Female" : "",
      state: filters.state,
      institutionType: filters.instituteType,
      minority: (filters.minority === "Yes") ? "Yes" : "",
    }
    try {
      const res = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/chart//yearWisePlacement",
        data
      );
      
      let ids = [] ;
      let placedcount = [];
      let unplacedcount = [];
      let total = []
      
      res.data.map(obj => {
        ids.push(obj._id);
        placedcount.push(obj.placedStudentCount);
        unplacedcount.push(obj.unplacedStudentCount);
        total.push(obj.totalPlacedCount);

      })
      console.log(ids, placedcount, unplacedcount, total);
      setYearWise({ids, placedcount, unplacedcount, total});
      // setProgramWise(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getprogramwiseplacement = async () => {

    let data = {
      year : parseInt(filters.year),
      gender: (filters.gender === "Female") ? "Female" : "",
      state: filters.state,
      institutionType: filters.instituteType,
      minority: (filters.minority === "Yes") ? "Yes" : "",
    }
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
      year : parseInt(filters.year),
      gender: (filters.gender === "Female") ? "Female" : "",
      state: filters.state,
      program: filters.program,
      minority: (filters.minority === "Yes") ? "Yes" : "",
    }
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


  const getstatewisePlacement = async() => {
    let data = {
      year : parseInt(filters.year),
      gender: (filters.gender === "Female") ? "Female" : "",
      institutionType: filters.instituteType,
      program: filters.program,
      minority: (filters.minority === "Yes") ? "Yes" : "",

    }
    try{
      const res = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/chart/stateWisePlacement",
        data
      );
      console.log(res.data[0]);

      let obj1 = {};
      res.data.map((item) => {
        obj1[item._id] = {value:item.unplacedStudentCount};
      })
      console.log(obj1);
      setmapregionData(obj1);
        // placedStudentCount: 1
        // unplacedStudentCount: 1
        // _id: "Gujarat"
    }
    catch(err){
      console.log(err);
    }
  }



  useEffect(() => {
    getprogramwiseplacement();
    getinstitutewisePlacement();
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
  useEffect(()=>{
    getprogramwiseplacement();
    getinstitutewisePlacement();
    getstatewisePlacement();
    getyearWisePlacement();
  },[filters]);

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


  return (
    <div className="wrapper">
      <IndexNavbar isfixed={false}/>
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
                onChange={(item) => setfilters({...filters, year:item.value})}
                // onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
                // onClose={(closedBySelection) =>
                //   closedBySelection && updategraphs()
                // }
              />

              {/* program filter */}
              <Dropdown
                placeholder="Select Program"
                className="my-className"
                options={programOptions}
                value="one"
                onChange={(item) => setfilters({...filters, program:item.value})}
              />

              {/* institute type filter */}
              <Dropdown
                placeholder="Select Institute Type"
                className="my-className"
                options={instituteTypes}
                value="one"
                onChange={(item) => setfilters({...filters, instituteType:item.value})}
              />

              {/* state filters */}
              <Dropdown
                placeholder="Select State"
                className="my-className"
                options={statesOptions}
                value="one"
                onChange={(item) => {
                  setfilters({...filters, state:item.value});
                }}
  
              />

              {/* gender filter */}
              <Dropdown
                placeholder="Select Gender"
                className="my-className"
                options={["Male", "Female"]}
                value="one"
                onChange={(item) => {
                  setfilters({...filters, gender:item.value});
                }}
              />

              {/* minority filter */}
              <Dropdown
                placeholder="Select Minority"
                className="my-className"
                options={["Yes", "No"]}
                value="one"
                onChange={(item) => {
                  setfilters({...filters, minority:item.value});
                }}
              />

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
                options={

                  {
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
                           verticalAlign: 'right',
                           layout: 'horizontal',
                           x: 0,
                           y: 0
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
                      categories: ['0M', '2M', '4M', '6M', '8M', '10M', '12M', '14M'],
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
                        grouping: false
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
                  }
                }
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
