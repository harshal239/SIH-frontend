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
import IndexNavbar from "Components/Navbars/IndexNavbar";
import CoorporateHeader from "./CoorporateHeader";

import { Dropdown, Selection } from "react-dropdown-now";
import "react-dropdown-now/style.css";

import classes from './corporate.module.css';

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

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

function CoorporateProfile() {
  const [filterModal, setfilterModal] = useState(false);
  const [programWise, setProgramWise] = useState({});
  const [instituteWise, setInstituteWise] = useState({});
  const [programGenderWise, setProgramGenderWise] = useState({});
  const [mapRegionData, setmapregionData] = useState({});
  const [yearWise, setYearWise] = useState({});


  const [tableData, settableData] = useState([
    // {srno: 0, name: 'Rashmi', email: 'student@gmail.com', year: 2022, branch: 'Computer Engineering'}
  ]);

  // const tableData = [
  //   {id: 0, name: 'Rashmi', email: 'student@gmail.com', year: 2022, branch: 'Computer Engineering'}
  // ]
  const [filters, setfilters] = useState({
    year: "",
    branch: "",
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
      gender: filters.gender === "Female" ? "Female" : "",
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
      gender: filters.gender === "Female" ? "Female" : "",
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
      gender: filters.gender === "Female" ? "Female" : "",
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
      gender: filters.gender === "Female" ? "Female" : "",
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


  const getTableData = async () => {
    let data = {
      "year":parseInt(filters.year),
      "branch":filters.branch
  };
    try{
      const res = await axios.post(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/student/getAllStudentsByYearAndBranch",
        data
      );

      let temp2 = [];
      let temp;
      res.data.map((obj,id) => {
        temp = {};
        temp.id = id+1;
        temp.name = obj.name;
        temp.email = obj.emailID;
        temp.year = obj.year;
        temp.branch = obj.branch;
        temp2.push(temp);
      })

      console.log(temp2);
      settableData(temp2);
    }
    catch(err){
      console.log(err);
    }

  
  }

  useEffect(() => {
    getTableData();
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
    getTableData();
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
      label: "Total Students",
      value: 2401,
    },
    {
      label: "Placed Students",
      value: 1800,
    },
    {
      label: "Unplaced Students",
      value: 601,
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "Sr. No"
    // , width: 70 
  },
    {
      field: "name",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 220
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "email", headerName: "Email ID",
     width: 230
     },
    { field: "branch", headerName: "Branch", 
    width: 210
  },
    {
      field: "year",
      headerName: "Graduation Year",
      type: "number",
      width: 150,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div className="wrapper">
      <IndexNavbar />
      <CoorporateHeader />
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
                        <span className={styles.stat_header}>
                          {item.label} <span>| {filters.year}</span>
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
          <Row>
            <Col md="3" className={styles.sticky__index} >
              <Card style={{"height":"500px"}}>
                <CardBody>
                  <h3>Filters</h3>
                  <div className={styles.drpwrapper}>
                    <span className={styles.filter_label}>Year</span>
                    {/* academic year filter */}
                    <Dropdown
                      placeholder="Select year"
                      className="my-className"
                      options={yearOptions}
                      value="one"
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
                    <span className={styles.filter_label}>Branch</span>
                    {/* program filter */}
                    <Dropdown
                      placeholder="Select Branch"
                      className="my-className"

                      options={[
                        "Computer Engineering",
                        "Information Technology",
                        "Electronics and telecommunication",
                        "Electrical Engineering",
                        "Mechinical Engineering",
                        "Civil Engineering",
                      ]}
                      value="one"
                      onChange={(item) =>
                        setfilters({ ...filters, branch: item.value })
                      }
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md="9" className={styles.graphs_left}>
              <Card className={classes.graphs__mainCard}>
                <CardHeader></CardHeader>
                <CardBody>
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={tableData}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      className={classes.datagrid}
                      // checkboxSelection
                    />
                  </div>
                </CardBody>
              </Card>
              {/* Program wise placement graph */}
            </Col>
          </Row>
        </div>
      </div>
      <DarkFooter />
      {/* <DefaultFooter /> */}
    </div>
  );
}

export default CoorporateProfile;
