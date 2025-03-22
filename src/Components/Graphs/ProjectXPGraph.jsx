import React from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { Project_XP } from "../Queries/Query";

const ProjectXPGraph = () => {
  const {
    loading: isLoading,
    error: isError,
    data: XPdata,
  } = useQuery(Project_XP);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  const dataArray =  [...XPdata.transaction].sort((a, b) => a.amount - b.amount)
    

  const chartOptions = {
    chart: { id: "xp-chart", type: "bar", height: "500" },
    xaxis: {
      categories: dataArray.map((item) => item.object.name),
      labels: {
        style: {
          colors: "black",
          fontWeight: "bold",
          fontSize: "14px",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "black",
          fontWeight: "bold",
          fontSize: "12px",
        },
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "XP Amount",
      data: dataArray.map((item) => item.amount),
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={series}
      type="bar"
      height={450}
      width={1000}
    />
  );
};
export default ProjectXPGraph;
