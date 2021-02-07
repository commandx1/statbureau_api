import React from "react";
import { Bar } from "react-chartjs-2";

const Graphic = ({ chartsVeriler }) => {
  const verilerChartOne = {
    labels: chartsVeriler.labels,
    datasets: [
      {
        label: chartsVeriler.country.toUpperCase() + " dataset",
        fill: false,
        BarTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartsVeriler.chartData,
      },
    ],
  };
  return (
    <React.Fragment>
      <h5>{chartsVeriler.country}</h5>
      <Bar
        width={1000}
        height={300}
        data={verilerChartOne}
        options={{
          maintainAspectRatio: true,
          responsive: false,
          legend: {
            display: false,
          },
        }}
      />
    </React.Fragment>
  );
};

export default Graphic;
