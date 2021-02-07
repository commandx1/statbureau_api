import "./App.css";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { countries } from "./variables/variables";

function App() {
  const [filter, setFilter] = useState({
    countryOne: "turkey",
    countryTwo: "russia",
    startDate: "2010-01-01",
    endDate: "2007-01-01",
  });

  const [chartsVeriler, setChartsVeriler] = useState({
    labelsOne: [],
    chartOneData: [],
    country: "",
  });

  const [chartsVeriler2, setChartsVeriler2] = useState({
    labelsTwo: [],
    chartTwoData: [],
    country: "",
  });

  const [isLoading, setisLoading] = useState(false);

  /*
Country: 17
InflationRate: 1.0637757692698284
InflationRateFormatted: "1.06"
InflationRateRounded: 1.06
Month: "/Date(1546300800000)/"
MonthFormatted: "2019-01-01"
*/

  const submitForm = (e) => {
    e.preventDefault();

    const getData = async () => {
      try {
        setisLoading(true);
        await fetch(
          `https://www.statbureau.org/get-data-json?country=${filter.countryOne}`
        )
          .then((res) => res.json())
          .then((response) => {
            let labelsOne = [];
            let chartOneData = [];

            const startDateFormat = new Date(filter.startDate).getTime();
            const endDateFormat = new Date(filter.endDate).getTime();

            response.map((data) => {
              const dataFormat = data.Month.substring(
                data.Month.lastIndexOf("(") + 1,
                data.Month.lastIndexOf(")")
              );
              if (startDateFormat > dataFormat && dataFormat > endDateFormat) {
                labelsOne.push(data.MonthFormatted);
                chartOneData.push(data.InflationRateRounded);
              }
            });

            setChartsVeriler({
              labelsOne,
              chartOneData,
              country: filter.countryOne,
            });
          });

        await fetch(
          `https://www.statbureau.org/get-data-json?country=${filter.countryTwo}`
        )
          .then((res) => res.json())
          .then((response) => {
            let labelsTwo = [];
            let chartTwoData = [];

            const startDateFormat = new Date(filter.startDate).getTime();
            const endDateFormat = new Date(filter.endDate).getTime();

            response.map((data, i) => {
              const dataFormat = data.Month.substring(
                data.Month.lastIndexOf("(") + 1,
                data.Month.lastIndexOf(")")
              );
              if (startDateFormat > dataFormat && dataFormat > endDateFormat) {
                labelsTwo.push(data.MonthFormatted);
                chartTwoData.push(data.InflationRateRounded);
              }
            });

            setChartsVeriler2({
              labelsTwo,
              chartTwoData,
              country: filter.countryTwo,
            });
          });

        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  };

  const verilerChartOne = {
    labels: chartsVeriler.labelsOne,
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
        data: chartsVeriler.chartOneData,
      },
    ],
  };

  const verilerChartTwo = {
    labels: chartsVeriler2.labelsTwo,
    datasets: [
      {
        label: chartsVeriler2.country.toUpperCase() + " dataset",
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
        data: chartsVeriler2.chartTwoData,
      },
    ],
  };

  return (
    <div className="App">
      <form onSubmit={submitForm}>
        <p>Select countries you want to compare by inflation rate</p>
        <div className="selects">
          <select
            value={filter.countryOne}
            onChange={(e) =>
              setFilter({ ...filter, countryOne: e.target.value })
            }
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select
            value={filter.countryTwo}
            onChange={(e) =>
              setFilter({ ...filter, countryTwo: e.target.value })
            }
          >
            {countries.map(
              (country) =>
                filter.countryOne !== country && (
                  <option key={country} value={country}>
                    {country}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="inputs">
          <input
            type="text"
            value={filter.startDate}
            onChange={(e) =>
              setFilter({ ...filter, startDate: e.target.value })
            }
          ></input>
          <input
            type="text"
            value={filter.endDate}
            onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
          ></input>
        </div>

        <button disabled={isLoading} className={isLoading && "disable"}>
          {isLoading ? <i className="fa fa-cog fa-spin"></i> : "Compare"}
        </button>
      </form>
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
      <h5>{chartsVeriler2.country}</h5>
      <Bar
        width={1000}
        height={300}
        data={verilerChartTwo}
        options={{
          maintainAspectRatio: true,
          responsive: false,
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
}

export default App;
