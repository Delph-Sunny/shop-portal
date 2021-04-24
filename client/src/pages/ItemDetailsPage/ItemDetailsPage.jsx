import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AverageRating from '../../components/AverageRating/AverageRating';
import UserRating from '../../components/UserRating/UserRating';
import ReviewModal from '../../components/ReviewModal/ReviewModal';
import useStyles from './styles';

// ***********To replace with local id************
const productID = '607f4342b230e5b53889f39c';
const userId = '607f092b7624a358d481c973';
//********************************************* */
const ItemDetailsPage = () => {
  const classes = useStyles();

  const [product, setProduct] = useState([]);
// const [reviews, setReview] = useState([]);

  useEffect(() => {
    const getProduct = () => {
      axios
        .get(`/api/reviews/product/${productID}`)
        .then((res) => {
          const productArray = res.data;
          console.log(res.data);                   
              setProduct(productArray);
            //  setReview(productArray[0].reviews);          
        })
        // eslint-disable-next-line
        .catch((err) => console.log(err));
    };
    getProduct();
  }, []);

  // Basic Format date
  const formatDate = (date) => {
    return date.substring(0, 10);
  };

  // Add the product to existing cart or create new cart
  const addProduct = (totalPrice) => {
    const status = 'Not processed';
    const newCart = {
      user: userId,
      products: [
        {
          product: productID,
          quantity: 1,
          totalPrice: totalPrice,
        },
      ],
    };
    axios
      .get(`/api/cart/${userId}/${status}`)
      .then((res) => {
        if (res.data[0]) {
          const cartId = res.data[0]._id;
          const cart = res.data[0];
          // FUTURE : Check if product already in the cart
          cart.products.push({
            product: productID,
            quantity: 1,
            totalPrice: totalPrice,
          });
          axios
            .put(`/api/cart/${cartId}`, cart)
            .catch((error) => console.log(error));
        } else {
          axios.post('/api/cart', newCart).catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container className={classes.root} component='main' maxWidth='xs'>
      {product.map((item, i) => (
      <Card className={classes.card} key={i}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              SP
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label='share'>
                <ShareIcon />
              </IconButton>
              <IconButton aria-label='add to favorites'>
                <FavoriteIcon />
              </IconButton>
            </>
          }
          title={item.name[0]}
          subheader='Exactly What You Are Looking For!'
        />
        <CardMedia
          className={classes.media}
          image={item.imageUrl[0]}
          title={item.imageKey[0]}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {item.description[0]}
          </Typography>
        </CardContent>

        <CardActions disableSpacing={true} className={classes.flexContainer}>
          <AverageRating
            value={item.averageStars ? item.averageStars : 0}
          />

          <Box className={classes.box}>
            <Typography variant='h6'>${item.price[0]}</Typography>
          </Box>
          <Box className={classes.box}>
            <Link style={{ textDecoration: 'none' }} to='/Cart'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={() => {
                  addProduct(item.price[0]);
                }}>
                Add to Cart
              </Button>
            </Link>
          </Box>
          <Box className={classes.box}>
            <ReviewModal userId={userId} productId={item._id[0]} />
          </Box>
        </CardActions>

        <Divider variant='middle' />
        {item.reviews.map((review, j) => (
          <CardContent key={j}>
            <Typography>
              {review.firstName[0]} {review.lastName[0]}
            </Typography>
            <Typography>{formatDate(review.created)}</Typography>
            <UserRating rating={review.rating} />
            <Typography>{review.title}</Typography>
            <Typography paragraph>{review.description}</Typography>
            <Divider variant='middle' />
          </CardContent>
        ))}
      </Card>
      ))}
    </Container>
  );
};

export default ItemDetailsPage;
