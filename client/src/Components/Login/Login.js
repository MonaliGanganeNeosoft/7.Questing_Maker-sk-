import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { login } from "../../config/Myservice";
import "./Login.css";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  Form,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

function Login() {
  const dispatch = useDispatch();

  const [userdata, setUserdata] = useState([]);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const override = `
  display: block;
  margin: 230px auto;
  border-color: red;
`;
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handler = (event) => {
    const { name, value } = event.target;

    // let errors=state.errors;
    switch (name) {
      case "email":
        let eemail = regForEmail.test(value) ? "" : "Enter Valid Email";
        setErrors({ ...errors, email: eemail });
        break;
      case "password":
        let epassword = regForPassword.test(value)
          ? ""
          : "Enter Valid Password";
        setErrors({ ...errors, password: epassword });
        break;
      default:
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // setState({[name]:value},...state);

    // setErrors(errors)
  };

  const formSubmit = async (event) => {
    // console.log(userdata);
    event.preventDefault();
    // setUser({ ...user, cource: selectedc });
    if (validate(errors) && user.email && user.password) {
      // securePassword(cred.password)
      login(user).then((res, err) => {
        // console.log(res.status);
        if (res.data.err === 0) {
          let login = user.email;
          localStorage.setItem("user", JSON.stringify(res.data.user));

          localStorage.setItem("_token", res.data.token);
          localStorage.setItem("login", JSON.stringify(login));
          // dispatch({ type: "GET_DATA_FUNC_CALL" });
          dispatch({ type: "isuser" });
          navigate("/");
        } else if (res.data.err === 1) {
          // alert(res.data.msg);
          setAlertmsg(res.data.msg);
          setOpen(true);
        } else if (res.data.err === 2) {
          // alert(res.data.msg);
          setAlertmsg(res.data.msg);
          setOpen(true);
        }
      });
    } else {
      // alert("Please Enter Valid Data");
      setAlertmsg("Please Enter Valid Data");
      setOpen(true);
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="mt-5 ">
      {loading ? (
        <ClimbingBoxLoader
          color={"rgb(147, 250, 165)"}
          loading={loading}
          css={override}
          size={40}
        />
      ) : (
        <Container>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%", height: "100%" }}
            >
              {alertmsg}
            </Alert>
          </Snackbar>
          <Row>
            <div className="formadjust">
              <Form id="myForm mt-2 ">
                <h1 className="fontapply">Login to QMaker</h1>

                <Form.Group>
                  <Row className="justify-content-center">
                    <Col xs lg="9">
                      <Form.Label></Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text>@</InputGroup.Text>

                        <FormControl
                          type="text"
                          placeholder="Enter Email"
                          name="email"
                          id="email"
                          onChange={handler}
                          isValid={user.email !== "" ? true : false}
                          isInvalid={errors.email !== "" ? true : false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>

                      {/* {errors.username && (
                  <Form.Text style={{ color: "red" }}>
                    {errors.username}
                  </Form.Text>
                )} */}
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label></Form.Label>
                  <Row className="justify-content-md-center">
                    <Col xs lg="9">
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        id="password"
                        onChange={handler}
                        isValid={user.password !== "" ? true : false}
                        isInvalid={errors.password !== "" ? true : false}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                      {/* {errors.password && (
                  <Form.Text style={{ color: "red" }}>
                    {errors.password}
                  </Form.Text>
                )} */}
                    </Col>
                  </Row>
                </Form.Group>

                <br />

                <Form.Group>
                  <Button
                    // variant="outline-dark"
                    type="submit"
                    onClick={formSubmit}
                    className="submitBtnlogin"
                  >
                    Log In
                  </Button>
                </Form.Group>
                <br />
                <a
                  className="small text-muted pt-4"
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  // onClick={() => navigate("/forgotpassword")}
                >
                  Forgot password?
                </a>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <a
                    //   onClick={() => navigate("/signup")}
                    style={{
                      color: "#393f81",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Register here
                  </a>
                </p>
              </Form>
            </div>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Login;
