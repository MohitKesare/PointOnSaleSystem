import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();

  // update cart handler
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload:{ ...item,quantity:1}
    });
  };
  const { Meta } = Card;
  return (
    <div>
      <Card
        style={{ width: 240, marginTop: 20 }}
        cover={
          <img alt="image example" src={item.image} style={{ height: 220 }} />
        }
      >
        <Meta title={item.name} />
        <div className="item-button">
          <Button onClick={() => handleAddToCart()}>Add To Cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
