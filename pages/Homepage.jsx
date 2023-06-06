import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";

const Homepage = () => {
  // usestate
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Drinks");
  const categories = [
    {
      name: "Drinks",
      imageUrl:
        "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHJpbmtzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Italian",
      imageUrl:
        "https://media.istockphoto.com/id/1472503979/photo/table-top-with-fresh-homemade-caprese-salad.jpg?b=1&s=170667a&w=0&k=20&c=mgnpGzTWEAM7YhKxFMQnzEIOQLn_qhXx08ab2D3h3RA=",
    },
    {
      name: "Indian",
      imageUrl:
        "https://media.istockphoto.com/id/1457374980/photo/beef-biryani.jpg?b=1&s=170667a&w=0&k=20&c=pFu5u6P6dyHvMiO49-9KxL9ucHHCBShKHtrRPse8iJ8=",
    },
  ];
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
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
    getAllItems();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className="d-flex ">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`d-flex category ${
                selectedCategory === category.name && "category-active"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <h4>{category.name}</h4>
              <img
                src={category.imageUrl}
                alt={category.name}
                height="40"
                width="60"
              />
            </div>
          ))}
        </div>
        <Row>
          {itemsData
            .filter((i) => i.category === selectedCategory)
            .map((item) => (
              <Col xs={24} lg={6} md={12} sm={6}>
                <ItemList key={item.id} item={item} />
              </Col>
            ))}
        </Row>
      </DefaultLayout>
    </>
  );
};

export default Homepage;
