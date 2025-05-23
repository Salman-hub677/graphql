import React, { useEffect } from "react";
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
    refetch: refetchUserData,
  } = useQuery(Dates_Projects);

  useEffect(() => {
    refetchUserData();
  }, [refetchUserData]);

  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Error</p>;

  const data = infoData.progress;
  console.log(data);

  const golang = data
    .filter((item) => item.object.attrs.language === "Go")
    .map((item) => {
      const date = new Date(item.updatedAt);
      return [
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        parseInt(getDaysDifference(item.createdAt, item.updatedAt), 10),
        item.object.name,
      ];
    })
    .sort((a, b) => a[0] - b[0]);

  console.log(golang);

  const js = data
    .filter((item) => item.object.attrs.language === "JavaScript")
    .map((item) => {
      const date = new Date(item.updatedAt);
      return [
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
        parseInt(getDaysDifference(item.createdAt, item.updatedAt), 10),
        item.object.name,
      ];
    })
    .sort((a, b) => a[0] - b[0]);

  console.log(golang);
  console.log(js);

  if (js.length === 0 && golang.length === 0) {
    return <h4>No Data Found</h4>;
  }

  const goSeries = {
    name: "Golang",
    data: golang,
  };

  const jsSeries = {
    name: "JavaScript",
    data: js,
  };

  const options = {
    title: {
      text: "Golang and JS Project Timeline",
      style: { color: "white", fontSize: "14px" ,  fontFamily: "'Walter Turncoat', cursive", },
    },
    colors: ["#fff176", "#cba0ff"],
    chart: {
      zoom: {
        enabled: false,
      },
      type: "scatter",
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Days Spent",
        style: {
          color: "white",
          fontWeight: "bold",
          fontFamily: "'Walter Turncoat', cursive", 
          fontSize: "15px",
        },
        offsetX: -6,
      },
      labels: {
        style: {
          colors: "white",
          fontSize: "12px",
          fontFamily: "'Walter Turncoat', cursive", 
        },
      },
    },

    xaxis: {
      type: "datetime",
      tickAmount: 15,

      title: {
        text: "Date Completed",
        style: {
          color: "white",
          fontFamily: "'Walter Turncoat', cursive", 
          fontWeight: "bold",
          fontSize: "15px",
        },
        offsetY: 8,
      },
    
      labels: {
        
        formatter: function (val) {
          return new Date(val).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        },
        offsetY: -1,
        style: {
          fontFamily: "'Walter Turncoat', cursive", 
          colors: "white",
        },
      },
    },
    tooltip: {
      shared: false,
      followCursor: true,
      theme: "dark",
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const date = new Date(data[0]).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const daysSpent = data[1];

        const samePoints = w.globals.initialSeries[seriesIndex].data.filter(
          (point) => point[0] === data[0] && point[1] === data[1]
        );

        let content = `<div style="padding: 10px;">
          <strong>Date Completed:</strong> ${date}<br>
          <strong>Days Spent:</strong> ${daysSpent}<br>
          <strong>Projects:</strong><br>`;

        samePoints.forEach((point) => {
          content += `- ${point[2]}<br>`;
        });

        content += "</div>";

        return content;
      },
    },
      legend: {
      show: false
    }
  };

  const series = [goSeries, jsSeries];

  return (
    <div style={{ width: "100%" }}>
    <div style={{ width: "92%", margin: "0 auto" }}>
      <Chart
        options={options}
        series={series}
        type="scatter"
        width="100%" 
        height={500}
      />
    </div>
  </div>
  
  
  );
};

export default DatesGraph;
