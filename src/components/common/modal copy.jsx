import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextFields from "./textFeild";
import { dispatch } from "../../service/store/store";
import {
  addEmployee,
  getEmployeeTableData,
} from "../../service/redux/type/employee";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const textFeildName = [
    "First Name",
    "Last Name",
    "Phone No",
    "Adhar No",
    "Designation",
    "Primary Address",
    "secondary Address",
  ];

  const [open, setOpen] = React.useState(false);
  const [fName, setFName] = useState("");
  const [lName, setlName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [adhaarNumber, setAdhaarNumber] = useState("");
  const [address, setaddress] = useState("");
  const [address_2, setaddress_2] = useState("");
  const [designation, setdesignation] = useState("");
  const [status, setstatus] = useState("Enable");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (e) => {
    if (e === "submit") {
      await dispatch(
        addEmployee({
          fName: fName,
          lName: lName,
          phoneNumber: phoneNumber,
          adhaarNumber: adhaarNumber,
          address: address,
          address_2: address_2,
          designation: designation,
          status: status,
        })
      );
      await dispatch(getEmployeeTableData());
    }
    setFName('')
    setlName('')
    setphoneNumber('')
    setAdhaarNumber('')
    setaddress('')
    setaddress_2('')
    setdesignation('')
    setstatus('Enable')
    setOpen(false);
  };

  const [err, setErr] = useState(true);
  console.log("fName", err);
  useEffect(() => {
    if (fName === "") {
      setErr(true);
    } else if (lName === "") {
      setErr(true);
    } else if (phoneNumber === ""|| phoneNumber.length !== 10) {
      setErr(true);
    } else if (adhaarNumber === "" || adhaarNumber.length !== 12) {
      setErr(true);
    } else if (address === "") {
      setErr(true);
    } else if (address_2 === "") {
      setErr(true);
    } else if (designation === "") {
      setErr(true);
    } else {
      setErr(false);
    }
  }, [
    address,
    address_2,
    adhaarNumber,
    designation,
    fName,
    lName,
    phoneNumber,
  ]);

  return (
    <div>
      <Box
        m={1}
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        // sx={boxDefault}
      >
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="secondary"
          sx={{ height: 40, fontWeight: "700" }}
        >
          + Add Employee
        </Button>
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          ADD EMPLOYEE DETAILS
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item md={6} sm={6} xs={6}>
              <TextFields
                label={textFeildName[0]}
                Feild={"standard"}
                setState={setFName}
              />

              <TextFields
                label={textFeildName[2]}
                Feild={"standard"}
                setState={setphoneNumber}
                inputProps={{ maxLength: 10, inputMode: 'numeric' }}
                value={phoneNumber}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
              <TextFields
                label={textFeildName[1]}
                Feild={"standard"}
                setState={setlName}
              />
              <TextFields
                label={textFeildName[3]}
                Feild={"standard"}
                setState={setAdhaarNumber}
                inputProps={{ maxLength: 12, inputMode: 'numeric'  }}
                value={adhaarNumber}
                // error={adhaarNumber.length <= 0 && adhaarNumber.length >= 14 ? false : true}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
              <TextFields
                label={textFeildName[4]}
                Feild={"standard"}
                setState={setdesignation}
              />
              <TextFields
                label={textFeildName[6]}
                Feild={"standard"}
                setState={setaddress_2}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
              <TextFields
                label={textFeildName[5]}
                Feild={"standard"}
                setState={setaddress}
              />

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e) => setstatus(e.target.value)}
                  >
                    <MenuItem value={"Enable"}>Enable</MenuItem>
                    <MenuItem value={"Disable"}>Disable</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="center"
          alignItems="center"
          // sx={boxDefault}
        >
          <Button
            disabled={err}
            autoFocus
            variant="contained"
            color="secondary"
            onClick={() => handleClose("submit")}
          >
            SUMBIT
          </Button>
        </Box>
      </BootstrapDialog>
    </div>
  );
}
