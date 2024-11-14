"use client";
import React from "react";
import Navbar from "../Card/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Reduxxx/store";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Rating } from "react-simple-star-rating";
import { Removetoredux } from "../Reduxxx/slicer";

interface CardItem {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

const page = () => {
  const dd = useSelector((state: RootState) => state.ShippingCart);
  const dispatch = useDispatch();

  const Remove = (elem: CardItem) => {
    dispatch(Removetoredux(elem.id));
  };

  return (
    <>
      <Navbar />
      <br />
      <br />

      <Container maxWidth="lg" className="product-page-container">
        <Grid container spacing={3}>
          {dd.length > 0 ? (
            dd.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
                      <Typography
                        variant="h6"
                        className="product-title"
                        gutterBottom
                      >
                        {product.category}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="product-description"
                      >
                        {product.title}
                      </Typography>
                      <Rating initialValue={product.rating.rate} readonly />
                      <Typography
                        variant="body1"
                        className="product-price"
                        sx={{ mt: 1, fontWeight: "bold" }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      className="remove-button"
                      onClick={() => Remove(product)}
                      sx={{ mt: 1 }}
                    >
                      Remove
                    </Button>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary" className="no-data">
              No Card Item
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default page;
