import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Store } from "../../Store";

const ProductDisplay = ({ params, getProducts }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const {
    cart: { cartItems },
  } = state;

  const activeProduct = getProducts.filter((prod) => prod.slug === params.slug);

  return (
    <>
      {activeProduct[0] ? (
        <Card sx={{ height: "100%", margin: "2rem", flex: 1 }}>
          <CardMedia
            sx={{ height: { xs: 350, sm: 550 } }}
            image={activeProduct[0].image}
            title={activeProduct[0].name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {activeProduct[0].name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Brand: {activeProduct[0].brand}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>Product Not Found</>
      )}
    </>
  );
};

export default ProductDisplay;
