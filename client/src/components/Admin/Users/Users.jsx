import React, { useEffect } from "react";
import {
  CssBaseline,
  Typography,
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
  List,
  ListItem,
  Button,
} from "@mui/material";
import { ReadMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import styles from "../Admin.module.css";
import { userActions } from "../../../redux/actions/userActions";

function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);
  const users = useSelector((state) => state.users);
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
        List of users
      </Typography>

      <TableContainer component={Paper}>
        {/* <div>My orders:</div> */}
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Orders</StyledTableCell>
              <StyledTableCell>Chat</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.items?.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.id}
                </StyledTableCell>
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>

                <StyledTableCell>
                  <IconButton aria-label="readMore" color="success">
                    <Link to={`/admin/users/orders/${user.id}`}>
                      {" "}
                      <ReadMore />
                    </Link>
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="chat" color="success">
                    <Link to={`/admin/chat/${user.id}`}>
                      {" "}
                      <MarkUnreadChatAltIcon />
                    </Link>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <List>
        <ListItem>
          <Link to="/admin">
            <Button variant="contained">To admin page</Button>
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

export default Users;
