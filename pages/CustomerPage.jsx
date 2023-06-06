import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // use effect
  useEffect(() => {
    getAllBills();
  }, [dispatch]);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Contact No.",
      dataIndex: "customerNumber",
    },
  ];

  return (
    <DefaultLayout>
      <h1>customer page</h1>
      <Table columns={columns} dataSource={billsData} bordered />

    </DefaultLayout>
  );
};

export default CustomerPage;
