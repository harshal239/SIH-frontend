
export const PieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const BarData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [43,23,54,76,12,5],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [65,87,12,32,9,76],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      
      {
        label: 'Dataset 2',
        data: [65,87,12,32,9,76],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

export const hbarData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [43,23,54,76,12,5],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};


export const highChartoptions = {
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
    categories: ['2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2020-21'],
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
      name: "Minority",
      data: [0, 1, 1, 0, 1, 1],
      stack: 0,
    },
    {
      name: "Female",
      data: [0, 2, 1, 2, 1, 1],
      stack: 1,
    },
    {
      name: "Male",
      data: [1, 3, 2, 5, 2, 1],
      stack: 2,
    },
    {
      name: "Placed",
      data: [1, 5, 3, 7, 3, 2],
      stack: 3,
    },
  ],
};



export const diversityData = {
  labels,
  datasets: [
  {
    label: "Minority",
    data: [0, 1, 1, 0, 1, 1],
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
  {
    label: "Female",
    data: [0, 1, 1, 2, 1, 1],
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  },
  {
    label: "Male",
    data: [1, 3, 2, 5, 2, 1],
    backgroundColor: 'rgba(255, 206, 86, 1)',
  },
  {
    label: "Placed",
    data: [1, 5, 4, 7, 4, 3],
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
  ]

}


export const mapRegionData = {
  Maharashtra: {
    value: 10,
  },
  Gujarat:{
    value: 60,
  }
}

export const LineData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [45,49,37],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [67,33,47],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};