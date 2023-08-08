import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";
import BootstrapDialogTitle from "../components/common/modal";
import UnstyledPaginationIntroduction from "../components/common/pagination";
import { getEmployeeTableData } from "../service/redux/type/employee";
import { dispatch } from "../service/store/store";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme, color }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#9c27b0",
    color: theme.palette.common.white,
    fontSize: 18,
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: color,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#c5c5c5",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Employee() {
  const { employeeTable } = useSelector(({ emplyee }) => emplyee);
  const [open, setOpen] = React.useState(false);
  console.log("employeeTable", employeeTable);

  useEffect(() => {
    dispatch(getEmployeeTableData());
  }, []);

  return (
    <Box>
      <BootstrapDialogTitle open={open} setOpen={setOpen} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Adhaar Number</StyledTableCell>
              <StyledTableCell align="center">Primary Address</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center" color="#c5c5c5">
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeTable?.length > 0 &&
             employeeTable?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{row.fName}</StyledTableCell>
                <StyledTableCell align="center">{row.lName}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.adhaarNumber}
                </StyledTableCell>
                <StyledTableCell align="center">{row.address}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.designation}
                </StyledTableCell>
                <StyledTableCell
                 align='inherit'
                  color={row.status === "Disable" ? "#FF0000" : "#008000"}
                >
                 {row.status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UnstyledPaginationIntroduction employeeTable={employeeTable} />
    </Box>
  );
}
