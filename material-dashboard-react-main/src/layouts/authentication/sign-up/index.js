/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Button } from "@mui/material";
import { Close, PersonAdd, PersonAddAlt } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

const AddEmployer = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3001/register").then((res) => {
      // console.log(res.data);
    });
  };
  const handelRegister = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/register", { email, userName, password })
      .then(() => {
        alert("Registration Successful");
        setEmail("");
        setPassword("");
        setUserName("");
        fetchUsers();
      })
      .catch((error) => {
        console.log("Unable to register user");
      });
  };

  return (
    <div>
      <MDBox pt={4} pb={3} px={3}>
        <Button size="large" endIcon={<Close />}>
          Close
        </Button>
        <MDBox component="form" role="form" onSubmit={handelRegister}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              label="userName"
              variant="standard"
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="Email"
              variant="standard"
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              variant="standard"
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" alignItems="center" ml={-1}>
            {/* <Checkbox />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;I agree the&nbsp;
            </MDTypography> */}
            {/* <MDTypography
              component="a"
              href="#"
              variant="button"
              fontWeight="bold"
              color="info"
              textGradient
            >
              Terms and Conditions
            </MDTypography> */}
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton type="submit" variant="gradient" color="info" fullWidth>
              sign in
            </MDButton>
          </MDBox>
          {/* <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Already have an account?{" "}
              <MDTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign In
              </MDTypography>
            </MDTypography>
          </MDBox> */}
        </MDBox>
      </MDBox>
    </div>
  );
};

function Cover() {
  // const [openAddEmployer, setOpenAddEmployer] = useState(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {AddEmployer()}
      {/* {!openAddEmployer ? (
        <>
          <Button
            color="primary"
            size="large"
            onClick={setOpenAddEmployer("")}
            startIcon={<PersonAddAlt />}
          >
            Add employer
          </Button>
          <Button size="large" endIcon={<PersonAdd />}>
            Add User
          </Button>
        </>
      ) : (
        AddEmployer()
      )} */}
    </DashboardLayout>
  );
}

export default Cover;
