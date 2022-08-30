//vreme ISO UTC

import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

//Konverzija datuma pomocu biblioteke moment
import Moment from "moment";
//import "moment/locale/sr-latn";
import "moment/min/moment-with-locales";
import "moment/locale/sr";

function createData(id, dish, dishImg, price) {
  return {
    id,
    dish,
    dishImg,
    price,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Identifikator",
  },
  {
    id: "dish",
    numeric: false,
    disablePadding: false,
    label: "Naziv",
  },
  {
    id: "restaurant",
    numeric: false,
    disablePadding: false,
    label: "Restoran",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Cena",
  },
  {
    id: "dateFrom",
    numeric: false,
    disablePadding: false,
    label: "Vazi od",
  },
  {
    id: "endDate",
    numeric: false,
    disablePadding: false,
    label: "Vazi do",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "selektuj sve ponude",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, onDeleteuserOrder, onEdituserOrder } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Ponude
        </Typography>
      )}

      {numSelected > 0 ? (
        <div>
          <Tooltip title="Delete" onClick={onDeleteuserOrder}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" onClick={onEdituserOrder}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDeleteuserOrder: PropTypes.func.isRequired,
  onEdituserOrder: PropTypes.func.isRequired,
};

export default function EnhancedTable() {
  //Ulogovani korisnik
  const { type, setType, loggedUser, setLoggedUser } = useContext(UserContext);

  //Ucitavanje iz baze
  const [rows, setRows] = useState([]);
  const [dataChange, setChange] = useState(0);

  /*Axios.get("http://localhost:1337/api/get", {
    params: { teacherId }
  });*/

  var token = localStorage.getItem("token");
  console.log("Saljem token" + token);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/orders",
        {
          headers: {
            Authorization: token,
          },
        },
        {
          mode: "cors",
        }
      )
      .then((podaci) => {
        setRows(podaci.data);
        console.log(podaci.data);
      })

      /* axios
      .get(
        "http://localhost:5000/orders",
        {
          headers: {
            //Authorization: "Bearer " + token,
            Authorization: token,
          },
        },
        (req, res) => {
          console.log(req);
          console.log(res);
          setRows(req.data);
          setChange(++dataChange);
          console.log(req.data);
          if (req.isAuthenticated()) {
            console.log(res.data);
            setRows(res.data);
            //console.log("1" + res.data);
          } else {
            console.log(res.data);
            setRows(res.data);
          }
        }
      )*/

      /*.then((res) => {
        if (res.isAuthenticated()) {
          setRows(res.data);
          console.log("1" + res.data);
        }
      })*/
      .catch((err) => console.log(err));
  }, [dataChange]);
  console.log("rows" + JSON.stringify(rows));

  //'https://httpbin.org/get?answer=42'
  /*get("http://localhost:5000/userOrders", {
    params: { restaurant: loggedUser._id },
  })*/

  /*.filter((userOrder) => {
            return userOrder.user === loggedUser._id;
          })*/

  /*`http://localhost:5000/userOrders/get?userOrder.restaurant=${loggedUser._id}`*/
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [restaurantName, setRestaurantName] = useState("");

  /*const getRestaurantName = (restaurant_id) => {
    console.log("restaurant " + restaurant_id);
    return axios
      .get(`http://localhost:5000/partners/${restaurant_id}`)
      .then((res) => {
        console.log(res.data);
        setRestaurantName(res.data);
        return res.data;
      });
  };*/

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  console.log(selected);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //Brisanje
  const onDeleteuserOrder = () => {
    console.log("usao u brisanje" + selected[0]);
    console.log(typeof selected[0]);
    axios
      .delete(`http://localhost:5000/orders/${selected}`, {
        mode: "cors",
      })
      .then((res) => setChange(++dataChange))
      .catch((err) => console.log(err));
  };
  let navigate = useNavigate();
  //Izmena
  const onEdituserOrder = () => {
    //navigate(`/edit/${selected}`);
    console.log(`/edit/${selected}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDeleteuserOrder={onDeleteuserOrder}
          onEdituserOrder={onEdituserOrder}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  //getRestaurantName(row.restaurant);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row._id}
                      </TableCell>

                      <TableCell align="left">{row.dish}</TableCell>
                      <TableCell align="left">{row.restoran[0].name}</TableCell>
                      <TableCell align="right">{row.price}RSD</TableCell>
                      <TableCell align="left">
                        {Moment(row.dateFrom).locale("sr").format("LLLL")}
                      </TableCell>
                      <TableCell align="left">
                        {Moment(row.endDate).locale("sr").format("LLLL")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
