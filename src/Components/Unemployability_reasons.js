import React, { useEffect, useState } from "react";

// reactstrap components
import { Container } from "reactstrap";
import {Bar} from "react-chartjs-2";
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
import TransparentFooter from "Components/Footers/TransparentFooter.js";


const Unemployability_reasons = () => {
  const [graphData, setgraphData] = useState({});

  const dataMapper = (data) => {
    console.log(data);
    console.log(Object.keys(data));
    // return { ids, placedCount, unplacedCount };
  };

  const fetchData = async() => {
    try {
      const res = await axios.get(
        "https://optimizers-sih-backend.herokuapp.com/api/v1/AICTE/GetReasonsFreaquencyMap"
      );
      setgraphData({
        reasons: Object.keys(res.data),
        count: Object.values(res.data)
      });


    } catch (error) {
      console.log(error);
    }
  }

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

  const BarOptions = {
    responsive: true,
    // backgroundColor:"#FFFFFF",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Placement vs Program Graph",
      },
    },
  };

  useEffect(()=>{
    console.log(graphData);
  },[graphData])


  useEffect(() => {
    fetchData();
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      {/* <div className="page-header clear-filter" filter-color="blue"> */}
      <div className="page-header">
        <div
          className="page-header-image"
          style={{
          
            // backgroundImage: "url(" + require("assets/img/reasons_bg.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Bar
              options={BarOptions}
              data={{
                labels: graphData.reasons,
                datasets: [
                  {
                    label: "Reasons",
                    data: graphData.count,
                    backgroundColor: "#2CA8FF",
                  },
                  // {
                  //   label: "Unplaced",
                  //   data: [1,2,3],
                  //   backgroundColor: "#FFB236",
                  // },
                ],
              }}
            />

          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default Unemployability_reasons;
