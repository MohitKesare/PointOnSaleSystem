import React, { useEffect, useState, useRef } from "react";
import RecatToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, Table, message } from "antd";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "../styles/InvoiceStyle.css";

const BillsPage = () => {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  const [popupModel, setPopupModel] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

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

  //   print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // tables data
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
    {
      title: "subtotal",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModel(true);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />
      {popupModel && (
        <Modal
          title="Invoice Details"
          open={popupModel}
          onCancel={() => {
            setPopupModel(false);
          }}
          footer={false}
        >
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>MK POS Bill</h2>
                <p>Contact : 9876543210 | Pune, Maharashtra</p>
              </div>
              <div id="mid">
                <div className="mt-2">
                  <p>
                    Customer Name : <b>{selectedBill.customerName}</b>
                    <br />
                    Phone No. : <b>{selectedBill.customerNumber}</b>
                    <br />
                    Date :{" "}
                    <b>{selectedBill.date.toString().substring(0, 10)}</b>
                    <br />
                  </p>
                  <hr style={{ margin: "5px" }} />
                </div>
              </div>
              <div id="bot">
                <div id="table">
                  <table>
                    <tbody>
                      <tr className="tabletitle">
                        <td className="item">
                          <h2>item</h2>
                        </td>
                        <td className="Hours">
                          <h2>Qty</h2>
                        </td>
                        <td className="Rate">
                          <h2>Price</h2>
                        </td>
                        <td className="Rate">
                          <h2>Total</h2>
                        </td>
                      </tr>
                      {selectedBill.cartItems.map((item) => (
                        <>
                          <tr className="service">
                            <td className="tableitem">
                              <p className="itemtext">{item.name}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext">{item.quantity}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext">{item.price}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext">
                                {item.quantity * item.price}
                              </p>
                            </td>
                          </tr>
                        </>
                      ))}
                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate">
                          <h2>Tax</h2>
                        </td>
                        <td className="payment">
                          <h2>${selectedBill.tax}</h2>
                        </td>
                      </tr>
                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate">
                          <h2>Grand Total</h2>
                        </td>
                        <td className="payment">
                          <h2>
                            <b>${selectedBill.totalAmount}</b>
                          </h2>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="legalcopy">
                  <p className="legal">
                    <strong>Thankyou for your order !</strong> 10% GST
                    Application on total amount .Please note that this is non
                    refundable amount. For any assistance Email{" "}
                    <b>help@mydomain.com</b>
                  </p>
                </div>
              </div>
            </center>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
