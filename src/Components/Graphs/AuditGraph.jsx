import React from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@apollo/client";
import {
  UserTransactionsDone,
  UserTransactionsRecieved,
} from "../Queries/Query";

export const AuditGraph = () => {
  const {
    loading: doneLoading,
    error: doneError,
    data: doneData,
  } = useQuery(UserTransactionsDone);

  const {
    loading: recievedLoading,
    error: recievedError,
    data: recievedData,
  } = useQuery(UserTransactionsRecieved);

  if (doneLoading || recievedLoading) return <p>Loading ...</p>;
  if (doneError || recievedError) return <p>Error </p>;

  const doneAmount = Number(
    (doneData.transaction_aggregate.aggregate.sum.amount / 1000000).toFixed(3)
  );
  const recievedAmount = Number(
    (recievedData.transaction_aggregate.aggregate.sum.amount / 1000000).toFixed(
      3
    )
  );
  const auditRatio = Number(doneData.user[0].auditRatio.toFixed(1));
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["done", "recieved"],
    dataLabels: {
      style: {
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#000"],
      },
    },

    legend: {
      fontSize: "14px",
      fontWeight: "bold",
      labels: {
        fontFamily: "Arial, sans-serif",
        colors: ["#000" ,"#000" ],
      },
    },
  };

  const series = [doneAmount, recievedAmount];

  return (
    <div>
      <h4> Done : {doneAmount}</h4>
      <h4>Recieved: {recievedAmount}</h4>
      <Chart
        options={options}
        series={series}
        type="donut"
        height={400}
        width={400}
      />
      <h1>{auditRatio}x</h1>
    </div>
  );
};
