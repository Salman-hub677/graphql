import { Piscine_Info } from "../Queries/Query";
import React, { useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { useQuery } from "@apollo/client";

const PiscineGraph = () => {
  const {
    loading: isLoading,
    error: isError,
    data: isData,
    refetch: refetchUserData,
  } = useQuery(Piscine_Info);

  useEffect(() => {
    refetchUserData();
  }, [refetchUserData]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching user data</p>;

  const dataStore = isData.result;

  

  const result = dataStore.reduce((acc, { objectId, grade, object }) => {
    if (grade === 0) {
      acc[object.name] = {
        count: (acc[object.name]?.count || 0) + 1,
        objectId,
        grade,
        attrs: object?.attrs || {},
        id: object.id,
        name: object.name,
        type: object.type,
      };
    }
    return acc;
  }, {});

  const topfifteen = Object.values(result)
    .filter(
      (item) => item.attrs.language === "sh" || item.attrs.language === "go"
    )
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  for (let i = topfifteen.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [topfifteen[i], topfifteen[randomIndex]] = [
      topfifteen[randomIndex],
      topfifteen[i],
    ];
  }

  const options = {
    chart: {
      type: "bubble",
      zoom: {
        enabled: false,
      },
    },
    colors: ["red"],
    title: {
      text: "Top 15 Most Tried Exercises in GO Piscine",
      align: "center",
      style: {
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      title: {
        text: "Exercise",
        style: {
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
        },
        offsetY: 4,
        offsetX: 300
      },
      type: "category",
      categories: Object.values(topfifteen).map((item) => item.name),
      labels: {
        style: {
          colors: Array(Object.values(topfifteen).length).fill("white"),
          fontSize: "12px",
        },
        rotateAlways: true,
        rotate: 330,
        trim: false,
        hideOverlappingLabels: false,
        offsetY: 5,
      },
    },
    yaxis: {
      tickAmount: 7,
      title: {
        text: "Count",
        style: {
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      labels: {
        style: {
          colors: "white",
          fontSize: "12px",
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
          return `Count Tried: ${val}`;
        },
      },
      z: {
        formatter(val) {
          return "";
        },
        title: "",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "go-Piscine",
      data: Object.values(topfifteen).map((item) => ({
        x: item.name,
        y: item.count,
        z: Math.sqrt(item.count) * 10 || 10,
      })),
    },
  ];

  return (
    <ApexCharts
      options={options}
      type="bubble"
      series={series}
      width={800}
      height={450}
    />
  );
};

export default PiscineGraph;
