import React from "react";
import { useQuery } from "@apollo/client";
import { Dates_Projects } from "../Queries/Query";
import Chart from "react-apexcharts";

const getDaysDifference = (createdAt, updatedAt) => {
  const start = new Date(createdAt);
  const end = new Date(updatedAt);

  return Math.round((end - start) / (1000 * 60 * 60 * 24));
};

const DatesGraph = () => {
  const {
    loading: isLoading,
    error: isError,
    data: infoData,
  } = useQuery(Dates_Projects);

  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Error</p>;

  const data = infoData.progress;

  // Process Golang data
  const golang = data
    .filter((item) => item.object.attrs.language === "Go")
    .map((item) => {
      const date = new Date(item.updatedAt);
      return [
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()), // Create a UTC timestamp including day of month
        parseInt(getDaysDifference(item.createdAt, item.updatedAt), 10),
      ];
    })
    .sort((a, b) => a[0] - b[0]);

  // Process JavaScript data
  const js = data
    .filter((item) => item.object.attrs.language === "JavaScript")
    .map((item) => {
      const date = new Date(item.updatedAt);
      return [
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()), // Create a UTC timestamp including day of month
        parseInt(getDaysDifference(item.createdAt, item.updatedAt), 10),
      ];
    })
    .sort((a, b) => a[0] - b[0]);

  console.log(golang);

  // Series for the chart
  const goSeries = {
    name: "Golang",
    data: golang,
  };

  const jsSeries = {
    name: "JavaScript",
    data: js,
  };

  // Chart options
  const options = {
    chart: {
      zoom: {
        enabled: false,
      },
      type: "scatter",
    },
    xaxis: {
      type: "datetime", // Use datetime for x-axis
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        },
      },
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return new Date(val).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        },
      },
    },
  };

  const series = [goSeries, jsSeries];

  return <Chart options={options} series={series} type="scatter" width={900} height={500}/>;
};

export default DatesGraph;
