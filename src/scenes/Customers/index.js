import React, { useState, useEffect } from "react";
import { Table, Toolbar, Tooltip, IconButton, Typography, FormControl, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import CustomerTable from "./components/Table";
import { useStateValue } from "../../state";
import { actions } from "../../state/customer/customerActions";
import CustomerTableHeader from "./components/TableHeader";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "84px"
  },

  flex: {
    display: "flex",
    // border: "1px solid black",
    marginLeft: "63px",
    // justifyContent: "space-around",
  },

  title: {
      fontWeight: "none",
  },

  margin: {
      marginLeft: "175px",
      marginBottom: "15px",
      width: "163px",
  }
}));

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [{ customers }, dispatch] = useStateValue();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("name");
  const classes = useStyles();

  useEffect(() => {
    //Check if the customers in State is there
    if (customers.customers.length == 0) {
      console.log("asking for customers");
      actions.getCustomers(dispatch).then(res => {
        if (res) setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [customers.customers.length, dispatch]);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleFilterChange = e => setFilter(e.target.value);

  const filters = {
    all: () => true,
    active: tech => !tech.disabled,
    disabled: tech => tech.disabled,
};

const [filter, setFilter] = useState('all');

  return (
    <div className={classes.root}>
      {/* <CustomerTableHeader title="Customers" className={classes.title} /> */}
        <div className={classes.flex} >
            <h1 className={classes.title}>Customers</h1>
      <FormControl className={classes.margin}>
        <Select value={filter} onChange={handleFilterChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="disabled">Archived</MenuItem>
        </Select>
      </FormControl>
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <CustomerTable
          customers={customers.customers}
          onRequestSort={handleRequestSort}
          orderBy={orderBy}
          order={order}
        />
      )}
    </div>
  );
};

export default Customers;
