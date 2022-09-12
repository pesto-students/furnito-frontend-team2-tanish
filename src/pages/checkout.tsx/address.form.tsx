import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function AddressForm(props: { handleChange: any; value: any }) {
  const { handleChange, value } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="name"
          name="name"
          onChange={handleChange("name")}
          defaultValue={value.name}
          label="Name"
          fullWidth
          autoComplete="name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="phone"
          name="phone"
          onChange={handleChange("phone")}
          defaultValue={value.phone}
          label="Phone Number"
          fullWidth
          autoComplete="number"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address"
          name="address"
          onChange={handleChange("address")}
          defaultValue={value.address}
          label="Address"
          fullWidth
          autoComplete="address"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          onChange={handleChange("city")}
          defaultValue={value.city}
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="state"
          name="state"
          onChange={handleChange("state")}
          defaultValue={value.state}
          label="State/Province/Region"
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="pinCode"
          name="pinCode"
          onChange={handleChange("pinCode")}
          defaultValue={value.pinCode}
          label="Pin Code"
          fullWidth
          autoComplete="shipping postal-code"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="country"
          name="country"
          onChange={handleChange("country")}
          defaultValue={value.country}
          label="Country"
          fullWidth
          autoComplete="shipping country"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}
