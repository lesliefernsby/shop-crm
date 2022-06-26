/* eslint-disable react/prop-types */
import React from "react";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { checkoutActions } from "../../redux/actions/checkoutActions";
import { cartActions } from "../../redux/actions/cartActions";

function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const checkout = useSelector((state) => state.checkout);
  const steps = ["Shipping address", "Payment details", "Review your order"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    if (checkout.page === steps.length - 1) {
      dispatch(checkoutActions.create({ cart, inputs: checkout.inputs }));
      dispatch(cartActions.resetCart());
    }
    dispatch(checkoutActions.nextPage());
  };
  const handleToPersonal = () => {
    dispatch(checkoutActions.resetPage());
    navigate("/personal");
  };
  const handleBack = () => dispatch(checkoutActions.previousPage());

  return (
    <>
      <CssBaseline />

      <main className={styles.Layout}>
        <Paper className={styles.Paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={checkout.page} className={styles.Stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {checkout.page === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                {checkout.inputs.firstName}, thank you for your order!
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{checkout.orderNumber}. We have emailed
                your order confirmation, and will send you an update when your
                order has shipped.
              </Typography>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleToPersonal}
                  className={styles.Button}
                >
                 Go to My Orders
                </Button>
            </>
          ) : (
            <>
              {getStepContent(checkout.page)}
              <div className={styles.Buttons}>
                {checkout.page !== 0 && (
                  <Button onClick={handleBack} className={styles.Button}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={styles.Button}
                >
                  {checkout.page === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </div>
            </>
          )}
        </Paper>
      </main>
    </>
  );
}

export default Checkout;
