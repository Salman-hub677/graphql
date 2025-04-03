import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import { Project_XP } from "../Queries/Query";
import { Button } from "react-bootstrap";

const ProjectXPGraph = () => {
  const {
    loading: isLoading,
    error: isError,
    data: XPdata,
    refetch: refetchUserData
  } = useQuery(Project_XP);

  useEffect(() => {
    refetchUserData();
  }, [refetchUserData]);

  const [charttype, setcharttype] = useState("H");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  const dataArray = [...XPdata.transaction].sort((a, b) => a.amount - b.amount);

  let chartOptions = {
    chart: { id: "xp-chart", type: "bar" },
    title: {
      text: "XP earned per Project",
      align: "center",
      style: {
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    colors: charttype === "H" ? ["green"] : ["red"],
    xaxis: {
      title: {
        text: charttype === "H" ? "XP" : "Projects",
        style: {
          fontSize: "12px",
          color: "White",
        },
      },
      categories: dataArray.map((item) => item.object.name),
      labels: {
        style: {
          colors: "white",
          fontSize: charttype === "H" ? "13px" : "9px",
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: false,
      followCursor: true,
      theme: "dark",
      y: {
        formatter(val) {
          return `${val}`;
        },
      },
    },

    yaxis: {
      title: {
        text: charttype === "H" ? "Projects" : "XP",
        style: {
          fontSize: "12px",
          color: "White",
        },
        offsetX: 9,
      },
      labels: {
        style: {
          colors: "white",

          fontSize: "12px",
        },
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: charttype === "H" ? true : false,
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
    <div>
      <Button
        variant="outline-light"
        onClick={() =>
          charttype === "V" ? setcharttype("H") : setcharttype("V")
        }
        style={{ background: charttype === "H" ? "red" : "green", border: "0" }}
      >
        Toggle Chart Style
      </Button>
      <Chart
        options={chartOptions}
        series={series}
        type="bar"
        height={450}
        width={1250}
      />
    </div>
  );
};
export default ProjectXPGraph;
