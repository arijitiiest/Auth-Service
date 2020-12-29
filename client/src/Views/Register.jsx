import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { register } from "../UserFunctions/UserFunctions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        arijitchowdhury.me
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ history }) => {
  const classes = useStyles();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");

  const [error_firstname, setErrorFirstname] = useState("");
  // const [error_lastname, setErrorLastname] = useState("");
  const [error_email, setErrorEmail] = useState("");
  const [error_phoneno, setErrorPhoneno] = useState("");

  const handleFirstnameValidation = (firstnameVal) => {
    let error = "";
    if (firstnameVal.length === 0) error = "Enter your first name";
    if (firstnameVal.length <= 4) error = "Name should be atleast 5 char long";
    setErrorFirstname(error);
  };

  const handleEmailValidation = (emailVal) => {
    const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let error = "";
    if (!email_regex.test(emailVal)) error = "Invalid email";
    setErrorEmail(error);
  };

  const handlePhonenoValidation = (phonenoVal) => {
    let error = "";
    if (phonenoVal.length !== 10) error = "Invalid phone no";
    setErrorPhoneno(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(firstname, lastname, email, phoneno);
    try {
      const body = {
        first_name: firstname,
        last_name: lastname,
        email,
        phone_no: phoneno,
      };
      await register(body);
      history.push("/login");
    } catch (err) {
      console.log(err);
      alert("Something Went wrong, (Email/phone no already exist)");
    }
  };

  // console.log("Rendered");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onError={(err) => console.log(err)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                  handleFirstnameValidation(e.target.value);
                }}
                error={error_firstname.length > 0}
                helperText={error_firstname}
                onBlur={() => handleFirstnameValidation(firstname)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEmailValidation(e.target.value);
                }}
                error={error_email.length > 0}
                helperText={error_email}
                onBlur={() => handleEmailValidation(email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phoneno"
                label="Phone No"
                type="number"
                id="phoneno"
                autoComplete="phoneno"
                value={phoneno}
                onChange={(e) => {
                  setPhoneno(e.target.value);
                  handlePhonenoValidation(e.target.value);
                }}
                error={error_phoneno.length > 0}
                helperText={error_phoneno}
                onBlur={() => handlePhonenoValidation(phoneno)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
