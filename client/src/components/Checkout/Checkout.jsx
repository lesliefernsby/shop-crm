/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import styles from "./Checkout.module.css";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
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

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={styles.AppBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={styles.Layout}>
        <Paper className={styles.Paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={styles.Stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <div className={styles.Buttons}>
                {activeStep !== 0 && (
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
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
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
