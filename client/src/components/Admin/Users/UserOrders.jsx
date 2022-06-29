import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
  IconButton,
  CssBaseline,
  List,
  ListItem,
  Button,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { ReadMore } from "@mui/icons-material";
import { ordersActions } from "../../../redux/actions/ordersActions";
import styles from "../Admin.module.css";

function PersonalOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const params = useParams();

  useEffect(() => {
    dispatch(ordersActions.getOrders(params.id));
  }, []);

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
    <main className={styles.Layout}>
      <CssBaseline />
      <Typography variant="h3" gutterBottom component="div">
        Your orders
      </Typography>

      <TableContainer component={Paper}>
        {/* <div>My orders:</div> */}
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
            {!orders.loading && orders.orders
            .find((o) => o.id === params.id)
            .orders
            .map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell component="th" scope="row">
                  {order.id}
                </StyledTableCell>
                <StyledTableCell>{order.Delivery.firstName}</StyledTableCell>
                <StyledTableCell>{order.Delivery.lastName}</StyledTableCell>
                <StyledTableCell>
                  {`${order.Delivery.address1} ${order.Delivery.address2} ${order.Delivery.city} ${order.Delivery.state} ${order.Delivery.zip}`}
                </StyledTableCell>
                <StyledTableCell>
                  {order.createdAt.slice(0, 10)}
                </StyledTableCell>
                <IconButton aria-label="readMore" color="success">
                  <Link to={`/admin/orders/details/${order.id}`}>
                    {" "}
                    <ReadMore />
                  </Link>
                </IconButton>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <List>
        <ListItem>
          <Link to="/admin/users">
            <Button variant="contained">To users</Button>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/">
            <Button variant="text">To main page</Button>
          </Link>
        </ListItem>
      </List>
    </main>


  );
}
export default PersonalOrders;
