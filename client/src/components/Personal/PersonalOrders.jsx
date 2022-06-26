import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  styled,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  tableCellClasses,
  IconButton
} from "@mui/material";
import { ReadMore } from "@mui/icons-material";

import { personalActions } from "../../redux/actions/personalActions";

function PersonalOrders() {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.personal);

  useEffect(() => {
    dispatch(personalActions.getMyOrders());
  }, [dispatch]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <div>My orders:</div>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order #</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Delivery</StyledTableCell>
            <StyledTableCell>Order Date</StyledTableCell>
            <StyledTableCell>Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {personal.orders.map((order) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell component="th" scope="row">
                {order.id}
              </StyledTableCell>
              <StyledTableCell>{order.Delivery.firstName}</StyledTableCell>
              <StyledTableCell>{order.Delivery.lastName}</StyledTableCell>
              <StyledTableCell>
                {`${order.Delivery.address1} ${order.Delivery.address2} ${order.Delivery.city} ${order.Delivery.state} ${order.Delivery.zip}`}
              </StyledTableCell>
              <StyledTableCell>{order.createdAt.slice(0, 10)}</StyledTableCell>
              <IconButton aria-label="readMore" color="success">
                <Link to={`/orders/${order.id}`}> <ReadMore /></Link>
              </IconButton>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default PersonalOrders;
