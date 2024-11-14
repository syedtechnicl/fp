"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  Container,
} from "@mui/material";

import { Rating } from "react-simple-star-rating";

import "../styles/card.css";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { AddToCartredux } from "../Reduxxx/slicer";

interface CardItem {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

const ProductPage: React.FC = () => {
  const [data, setData] = useState<CardItem[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product: CardItem) => {
    // Dispatch the product to the Redux store
    dispatch(AddToCartredux(product));
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <Container maxWidth="lg" className="product-page-container">
        <Grid container spacing={4}>
          {data.length > 0 ? (
            data.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} addToCart={addToCart} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary" className="no-data">
              <h1
                style={{ textAlign: "center", color: "red", fontSize: "100px" }}
              >
                {" "}
                Loading...
              </h1>
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

interface ProductCardProps {
  product: CardItem;
  addToCart: (product: CardItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => (
  <Card className="product-card">
    <CardActionArea>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.category}
        className="product-image"
      />
      <CardContent>
        <Typography variant="h6" className="product-title">
          {product.category}
        </Typography>
        <Typography variant="body2" className="product-description">
          {product.title}
        </Typography>
        <Rating initialValue={product.rating.rate} />
        <Typography variant="body1" className="product-price">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="add-to-cart-button"
        onClick={() => addToCart(product)} // Pass the product data here
      >
        Add to Cart
      </Button>
    </CardActionArea>
  </Card>
);

export default ProductPage;
