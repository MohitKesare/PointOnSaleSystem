import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, Table, message } from "antd";
import { Button } from "antd";

const ItemPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();
  const [popupModel, setPopupModel] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
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
    getAllItems();
  }, [dispatch]);

  // handle delete
  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("/api/items/delete-item", { itemId: record._id });
      message.success("Item Deleted  Successfully!");
      getAllItems();
      setPopupModel(false);
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      message.error("Something Went Wrong!");
      console.log(error);
    }
  };

  // tables data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupModel(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </>
      ),
    },
  ];

  // handle submit form
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post("/api/items/add-item", value);
        message.success("Item Added Successfully!");
        getAllItems();
        setPopupModel(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        message.error("Something Went Wrong!");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Updated  Successfully!");
        getAllItems();
        setPopupModel(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        message.error("Something Went Wrong!");
        console.log(error);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item Page</h1>
        <Button type="primary" onClick={() => setPopupModel(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />
      {popupModel && (
        <Modal
          title={`${editItem !== null ? "Edit item" : "Add New Item"}`}
          open={popupModel}
          onCancel={() => {
            setPopupModel(false);
            setEditItem(null);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="italian">Italian</Select.Option>
                <Select.Option value="indian">Indian</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
