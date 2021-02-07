import React, { useState } from "react";
import { countries } from "./variables/variables";

const Form = ({ filter, setFilter, setChartsVeriler, setChartsVeriler2 }) => {
  const [isLoading, setisLoading] = useState(false);

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
            let labels = [];
            let chartData = [];

            const startDateFormat = new Date(filter.startDate).getTime();
            const endDateFormat = new Date(filter.endDate).getTime();

            response.map((data) => {
              const dataFormat = data.Month.substring(
                data.Month.lastIndexOf("(") + 1,
                data.Month.lastIndexOf(")")
              );

              if (
                Math.max(startDateFormat, endDateFormat) > dataFormat &&
                dataFormat > Math.min(startDateFormat, endDateFormat)
              ) {
                labels.push(data.MonthFormatted);
                chartData.push(data.InflationRateRounded);
              }
            });

            setChartsVeriler({
              labels,
              chartData,
              country: filter.countryOne,
            });
          });

        await fetch(
          `https://www.statbureau.org/get-data-json?country=${filter.countryTwo}`
        )
          .then((res) => res.json())
          .then((response) => {
            let labels = [];
            let chartData = [];

            const startDateFormat = new Date(filter.startDate).getTime();
            const endDateFormat = new Date(filter.endDate).getTime();

            response.map((data, i) => {
              const dataFormat = data.Month.substring(
                data.Month.lastIndexOf("(") + 1,
                data.Month.lastIndexOf(")")
              );
              if (
                Math.max(startDateFormat, endDateFormat) > dataFormat &&
                dataFormat > Math.min(startDateFormat, endDateFormat)
              ) {
                labels.push(data.MonthFormatted);
                chartData.push(data.InflationRateRounded);
              }
            });

            setChartsVeriler2({
              labels,
              chartData,
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

  return (
    <form onSubmit={submitForm}>
      <p>Select countries you want to compare by inflation rate</p>
      <div className="selects">
        <select
          value={filter.countryOne}
          onChange={(e) => setFilter({ ...filter, countryOne: e.target.value })}
        >
          {countries.map(
            (country) =>
              filter.countryTwo !== country && (
                <option key={country} value={country}>
                  {country}
                </option>
              )
          )}
        </select>
        <select
          value={filter.countryTwo}
          onChange={(e) => setFilter({ ...filter, countryTwo: e.target.value })}
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
          onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
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
  );
};

export default Form;
