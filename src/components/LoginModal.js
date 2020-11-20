import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../config/firbase";
import CircularProgress from "@material-ui/core/CircularProgress";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function LoginModal({ openL, setOpenL }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setSubmitting(true);
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((res) => {
          // setIsLoggedIn(true);
          setErr("");
          setSubmitting(false);
          setOpenL(false);
        })
        .catch((e) => {
          setErr(e.message);
          setSubmitting(false);
        });
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Required")
        .min(6, "Must be 6 characters"),
      email: Yup.string().required("Required").email("Invalid email address"),
    }),
  });
  return (
    <div>
      <Modal open={openL} onClose={() => setOpenL(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="signup__body">
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            />
            {/* {e.message ? <p>{e.message}</p> : <p></p>} */}
            <p>{err}</p>
            {/* {({ value, handleChange, handleBlur, handleSubmit }) => ( */}
            <form className="signup__form" onSubmit={formik.handleSubmit}>
              <TextField
                type="email"
                label="Email"
                className="signup__body__feild"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
              <TextField
                type="password"
                label="Password"
                className="signup__body__feild"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}

              {submitting ? (
                <div className="loader">
                  <CircularProgress />
                </div>
              ) : (
                <Button
                  type="submit"
                  color="primary"
                  className="signUp__btn"
                  disabled={submitting}
                >
                  Login
                </Button>
              )}
            </form>
            {/* )} */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
