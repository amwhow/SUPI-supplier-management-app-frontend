import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainListItems, secondaryListItems } from "./listItems";
import DashboardHome from "./DashboardHome";
import DashboardSupplier from "./DashboardSupplier";
import DashboardStyles from "./DashboardStyles";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import SupplierNotes from "./SupplierNotes";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        SUPI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = DashboardStyles;

export default function Dashboard(props) {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  const user_name = localStorage.getItem("user_name");

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [suppliers, setSuppliers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/suppliers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        const {suppliers, contacts, purchase_orders, reviews, invoices } = response
        setSuppliers(suppliers);
        setContacts(contacts);
        setPurchaseOrders(purchase_orders);
        setReviews(reviews);
        setInvoices(invoices);
        // console.log("in Dashboard, invoices: " + invoices[0].receivedDate)
      });
  }, []);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        {/* top navbar */}
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {`Welcome back, ${user_name}!`}
          </Typography>
          <IconButton color="inherit">
            <Badge color="primary">
              <ExitToAppIcon onClick={() => logout()} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      
      {/* sidebar */}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MainListItems history={history} suppliers={suppliers} />
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          {/* modularise the main section */}
          <Switch>
            <ProtectedRoute exact path="/dashboard" component={DashboardHome} />
            <ProtectedRoute
              exact
              path={`/dashboard/suppliers/:id`}
              component={DashboardSupplier}
            />
          </Switch>
          
          {/* end of main section */}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
