import React, { useState, useEffect } from "react"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function DocumentTable() {
  const classes = useStyles();

  const [documents, setDocuments] = useState([]);

  function fetchDocuments() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/documents`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((body) => setDocuments(body))
  }

  useEffect(() => {
    fetchDocuments();
  },[])

  console.log(documents)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Document Number</StyledTableCell>
            <StyledTableCell align="right">Document Type</StyledTableCell>
            <StyledTableCell align="right">Expiry Date</StyledTableCell>
            <StyledTableCell align="right">Document File</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <StyledTableRow key={document.id}>
              <StyledTableCell component="th" scope="row">
                # {document.id}
              </StyledTableCell>
              <StyledTableCell align="right">{document.documentType}</StyledTableCell>
              <StyledTableCell align="right">{document.expiryDate}</StyledTableCell>
              <StyledTableCell align="right">
                <a href={document.supplier_document.url}>Document file</a>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}