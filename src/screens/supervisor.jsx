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
import { getSupervisorTableData } from "../service/redux/type/supervisor";
import { dispatch } from "../service/store/store";
import { useSelector } from "react-redux";
// import CustomizedDialogs from "../components/common/modalBox";

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

const tableHead = [
  "S.No",
  "First Name",
  "Phone Number",
  "E mail",
  "Adhaar Number",
  "Primary Address",
];

export default function Supervisor() {
  const { SupervisorTable } = useSelector(({ supervisor }) => supervisor);
  const [open, setOpen] = React.useState(false);
  console.log("SupervisorTable", SupervisorTable);

  useEffect(() => {
    dispatch(getSupervisorTableData());
  }, []);

  return (
    <Box>
      {/* <CustomizedDialogs open={open} setOpen={setOpen} /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHead?.map((item, index) => (
                <StyledTableCell key={index} align="center">
                  {item}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center" color="#c5c5c5">
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SupervisorTable?.length > 0 &&
              SupervisorTable?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.FName}</StyledTableCell>
                  <StyledTableCell align="center">{row.LName}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.Email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Address_2}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.AllocatedSites}
                  </StyledTableCell>
                  <StyledTableCell
                    align="inherit"
                    color={row.SiteStatus === "Disable" ? "#FF0000" : "#008000"}
                  >
                    {row.SiteStatus}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UnstyledPaginationIntroduction SupervisorTable={SupervisorTable} />
    </Box>
  );
}
