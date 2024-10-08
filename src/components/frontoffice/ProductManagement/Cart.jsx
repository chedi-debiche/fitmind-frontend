import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import {
    decrement,
    increment,
    remove,
    selectCart,
    selectTotal,
} from "./redux/slices/cartSlice";
import HeaderSignedInClient from "../shared/HeaderSignedInClient";

export default function Cart(props) {
    const Total = useSelector(selectTotal);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    
    const addItemToCart = (p) => {
        const itemIndex = cart.findIndex((item) => item.id === p.id);
        if (itemIndex === -1) {
            // item is not in the cart, add a new item
            dispatch(
                increment({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    quantity: 1,
                })
            );
        } else {
            // item is already in the cart, increment its quantity
            dispatch(increment(cart[itemIndex]));
        }
    };
    

   
      
    const removeItemFromCart = (p) => {
        dispatch(decrement(p));
    };
    const deleteItem = (p) => {
        dispatch(remove(p));
    };
    return (
        <>
            <HeaderSignedInClient />
            <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>shopping cart</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            <main className="h-100 h-custom" style={{ backgroundColor: "white" }}>
                <Container className="h-100 py-5">
                    <Row className="justify-content-center align-items-center h-100">
                        <Col>
                            <Card className="shopping-cart" style={{ borderRadius: "15px", width: '80%' }}>
                                <Card.Body className="text-black">
                                    <Row>
                                        <Col lg="12" className="px-5 py-4">
                                            <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                                                Shopping Cart
                                            </h3>
                                            {cart.map((item, key) => {
                                                return (
                                                    <div className="d-flex align-items-center mb-5">
                                                        <div className="flex-shrink-0">
                                                        <img
        className="card-img-top"
        src={`https://fitmind-backend.onrender.com/uploads/${item.image}`}
        alt={`Image of ${item.name}`}
        style={{ width: 'auto', height: '300px' }}
      />
                                                        </div>

                                                        <div className="flex-grow-1 ms-3">
                                                            <h5 tag="h5" className="text-primary">
                                                                {item.name}
                                                            </h5>

                                                            <div className="d-flex align-items-center">
                                                                <p className="fw-bold mb-0 me-5 pe-3">
                                                                    {item.price} DT
                                                                </p>

                                                                <button
                                                                    className="RemoveItem"
                                                                    onClick={() => removeItemFromCart(item)}
                                                                >-</button>

                                                                <input
                                                                    className="quantity fw-bold text-black def-number-input number-input safari_only"
                                                                    min={0}
                                                                    value={item.quantity}
                                                                    type="number"
                                                                />

                                                                <button
                                                                    className="AddItem"
                                                                    onClick={() => addItemToCart(item)}
                                                                >+</button>

                                                                <p className="fw-bold mb-0 me-5 pe-3">
                                                                    Total Price : {item.quantity * item.price} DT
                                                                </p>

                                                                <button className="RemoveCart" onClick={() => deleteItem(item)}>X</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            <hr
                                                className="mb-4"
                                                style={{
                                                    height: "2px",
                                                    backgroundColor: "#1266f1",
                                                    opacity: 1,
                                                }}
                                            />

                                            <div
                                                className="d-flex justify-content-between p-2 mb-2"
                                                style={{ backgroundColor: "#e1f5fe" }}
                                            >
                                                <h5 tag="h5" className="fw-bold mb-0">
                                                    Total:
                                                </h5>
                                                <h5 tag="h5" className="fw-bold mb-0">
                                                    {Total} DT{" "}
                                                </h5>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                </Card>
</Col>
</Row>
</Container>
</main>
</>
);
}
// export default Cart;