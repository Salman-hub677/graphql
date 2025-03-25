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
  console.log(data)

  const golang = data
    .filter((item) => item.object.attrs.language === "Go")
    .map((item) => {
      const date = new Date(item.updatedAt);
      return [
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()), 
        parseInt(getDaysDifference(item.createdAt, item.updatedAt), 10),
        item.object.name
      ];
    })
    .sort((a, b) => a[0] - b[0]);

    console.log(golang)

  
  const js = data
    .filter((item) => item.object.attrs.language === "JavaScript")
    .map((item) => {
      const date = new Date(item.updatedAt);
      return [
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()), 
        parseInt(getDaysDifference(item.createdAt, item.updatedAt), 10),
        item.object.name
      ];
    })
    .sort((a, b) => a[0] - b[0]);

  console.log(golang);
  console.log(js);

  
  const goSeries = {
    name: "Golang",
    data: golang,
  };

  const jsSeries = {
    name: "JavaScript",
    data: js,
  };

  
  const options = {
    colors: ["red" , "green"],
    chart: {
      zoom: {
        enabled: false,
      },
      type: "scatter",
    },
    yaxis : {
      title : {
        text : 'Days Spent',
        style :{
          color : "white",
           fontWeight: "bold",
          fontSize: "12px"
        },
        offsetX : -6

      },
      labels : {
        style :{
          colors : "white",
          fontSize: "12px"
        }
      }
    },
   
    xaxis: {
      type: "datetime", 
      title : {
        text : 'Date Completed',
        style : {
          color: 'white',
        },
        offsetY: 10,
      },
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          
        },
    
        style : {
          colors: 'white'
        }
      },
    },
    tooltip: {
      shared: false,
      followCursor: true,
      theme: "dark",
      enabled: true,
      x: {
        formatter: function (val) {
          return  "Date Completed: " + new Date(val).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        },
      },
      y : {
        formatter (val) {
          return "Days Spent: " + val
        }
      },
      z: {
        formatter: function (val) {
          return "Project Name: " + val;
        }
      }
    },
    legend: {
      offsetY: 20,
      fontSize: "14px",
      fontWeight: "bold",
      
      labels: {
        fontFamily: "Arial, sans-serif",
        colors: ["white" ,"white" ],
      },
    },
  };

  const series = [goSeries, jsSeries];

  return <Chart options={options} series={series} type="scatter" width={1200} height={500}/>;
};

export default DatesGraph;
