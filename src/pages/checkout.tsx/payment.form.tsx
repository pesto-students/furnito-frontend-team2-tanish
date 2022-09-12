import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function PaymentForm(props: { handleChange: any; value: any }) {
  const { handleChange, value } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cardName"
          name="cardName"
          onChange={handleChange("cardName")}
          defaultValue={value.cardName}
          label="Name on card"
          fullWidth
          autoComplete="cc-name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cardNumber"
          name="cardNumber"
          onChange={handleChange("cardNumber")}
          defaultValue={value.cardNumber}
          label="Card number"
          fullWidth
          autoComplete="cc-number"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="expDate"
          name="expDate"
          onChange={handleChange("expDate")}
          defaultValue={value.expDate}
          label="Expiry date"
          fullWidth
          autoComplete="cc-exp"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cvv"
          name="cvv"
          onChange={handleChange("cvv")}
          defaultValue={value.cvv}
          label="CVV"
          helperText="Last three digits on signature strip"
          fullWidth
          autoComplete="cc-csc"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}
