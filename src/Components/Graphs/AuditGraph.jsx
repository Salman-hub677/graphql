import React , {useEffect} from "react";
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
    refetch: refetchUserData
  } = useQuery(UserTransactionsDone);

  const {
    loading: recievedLoading,
    error: recievedError,
    data: recievedData,
    refetch: refetchUserDatatwo
  } = useQuery(UserTransactionsRecieved);

   useEffect(() => {
    refetchUserDatatwo()
      refetchUserData();
    }, [refetchUserData,refetchUserDatatwo]);

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
    colors: ["green", "red"],
    dataLabels: {
      style: {
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        colors: ["black"],
      },
    },

    legend: {
      fontSize: "14px",
      fontWeight: "bold",
      
      labels: {
        fontFamily: "Arial, sans-serif",
        colors: ["white" ,"white" ],
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
