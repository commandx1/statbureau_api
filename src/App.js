import "./App.css";
import { useState } from "react";
import Form from "./form";
import Graphic from "./variables/graphic";

function App() {
  const [filter, setFilter] = useState({
    countryOne: "turkey",
    countryTwo: "russia",
    startDate: "2010-01-01",
    endDate: "2007-01-01",
  });

  const [chartsVeriler, setChartsVeriler] = useState({
    labels: [],
    chartData: [],
    country: "",
  });

  const [chartsVeriler2, setChartsVeriler2] = useState({
    labels: [],
    chartData: [],
    country: "",
  });

  /*
Country: 17
InflationRate: 1.0637757692698284
InflationRateFormatted: "1.06"
InflationRateRounded: 1.06
Month: "/Date(1546300800000)/"
MonthFormatted: "2019-01-01"
*/

  return (
    <div className="App">
      <Form
        setChartsVeriler={setChartsVeriler}
        setChartsVeriler2={setChartsVeriler2}
        filter={filter}
        setFilter={setFilter}
      />
      <Graphic chartsVeriler={chartsVeriler} />
      <Graphic chartsVeriler={chartsVeriler2} />
    </div>
  );
}

export default App;
