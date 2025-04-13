import React, { useEffect } from "react";
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
    refetch: refetchUserData,
  } = useQuery(UserTransactionsDone);

  const {
    loading: recievedLoading,
    error: recievedError,
    data: recievedData,
    refetch: refetchUserDatatwo,
  } = useQuery(UserTransactionsRecieved);

  useEffect(() => {
    refetchUserDatatwo();
    refetchUserData();
  }, [refetchUserData, refetchUserDatatwo]);

  if (doneLoading || recievedLoading) return <p>Loading ...</p>;
  if (doneError || recievedError) return <p>Error </p>;

  const doneAmount =
    doneData?.transaction_aggregate?.aggregate?.sum?.amount
      ? Number((doneData.transaction_aggregate.aggregate.sum.amount / 1000000).toFixed(3))
      : 0;

  const recievedAmount =
    recievedData?.transaction_aggregate?.aggregate?.sum?.amount
      ? Number((recievedData.transaction_aggregate.aggregate.sum.amount / 1000000).toFixed(3))
      : 0;

  // Safely access auditRatio and provide a fallback value if it's undefined or null
  const auditRatio =
    doneData?.user?.[0]?.auditRatio !== undefined && doneData.user[0].auditRatio !== null
      ? Number(doneData.user[0].auditRatio.toFixed(1))
      : 0;

      if(auditRatio === 0 ){
        return <h4>No Data Found</h4>
      }

  const options = {
    chart: {
      type: "donut",
    },
    labels: ["done", "recieved"],
    colors: ["green", "red"],
    dataLabels: {
      style: {
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        colors: ["white"],
      },
    },
    legend: {
      show: false
    }
    
  };

  const series = [doneAmount, recievedAmount];

  return (
    <div style = {{ width : "100%"}}>
      <h4>Done : {doneAmount}</h4>
      <h4>Recieved: {recievedAmount}</h4>
      <Chart options={options} series={series} type="donut" height={400} width="100%" />
      <h1>{auditRatio}x</h1>
    </div>
  );
};
