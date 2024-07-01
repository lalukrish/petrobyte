import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination, IconButton, Collapse } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import DispencerNew from "./dialogdispencer";
require("dotenv").config();

export default function DispencerTable() {
  const [open, setOpen] = React.useState(false);
  const [dispencers, setDispencers] = React.useState([]);
  const [refreshDispencer, setRefreshDispencer] = React.useState(false);
  const [editDispencer, setEditDispencer] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [openRow, setOpenRow] = React.useState(null); // To track which row is open

  const fetchAllDispencer = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/dispencer/GETAllDispencer`)
      .then((responce) => setDispencers(responce.data.message.allDispencers))
      .catch(console.log("error"));
  };

  React.useEffect(() => {
    fetchAllDispencer();
  }, [currentPage, refreshDispencer]);

  const handleClickOpen = () => {
    setEditDispencer("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    setRefreshDispencer(!refreshDispencer);
  };

  const handleEditDispencer = (data) => {
    setEditDispencer(data);
    setOpen(true);
  };

  const handleDeleteDispencer = (dispencer) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/dispencer/DELETEDispencer?name=${dispencer.dispencer_name}`
      )
      .then((resp) => {
        alert(resp.data.message);
        setRefreshDispencer(!refreshDispencer);
      })
      .catch((resp) => alert(resp.data.message));
  };

  const handleDeleteSubDispencer = (dispencer, subDispencer) => {
    let id = subDispencer._id;
    id = id.replace(/"/g, "");
    let name = dispencer.dispencer_name;
    name = name.replace(/"/g, "");
    
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/dispencer/DELETESubDispencer?name=${name}&id=${id}`
      )
      .then((resp) => {
        alert(resp.data.message);
        setRefreshDispencer(!refreshDispencer);
      })
      .catch((resp) => alert(resp.data.message));
  };

  const handleRowClick = (dispencerId) => {
    setOpenRow(openRow === dispencerId ? null : dispencerId);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        sx={{
          marginBottom: "20px",
          color: "#0d47a1",
          border: "1px solid #0d47a1",
        }}
        onClick={handleClickOpen}
      >
        Add Dispencer
      </Button>
      {open && (
        <DispencerNew
          close={handleClose}
          refreshDispencer={handleRefresh}
          edit={editDispencer}
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
          <TableHead sx={{ background: "#e3f2fd" }}>
            <TableRow>
              <TableCell />
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Dispencer
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dispencers?.map((dispencer) => (
              <React.Fragment key={dispencer._id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleRowClick(dispencer._id)}
                    >
                      {openRow === dispencer._id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    {dispencer.dispencer_name}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEditDispencer(dispencer)}>
                      <EditIcon sx={{ color: "#0d47a1" }} />
                    </Button>
                    <Button onClick={() => handleDeleteDispencer(dispencer)}>
                      <DeleteIcon sx={{ color: "#ef5350" }} />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRow === dispencer._id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Table size="small" aria-label="details">
                          <TableHead sx={{ background: "#f5f5f5" }}>
                            <TableRow>
                              <TableCell
                                align="center"
                                sx={{ fontWeight: "bold" }}
                              >
                                Dispencer Sub Name
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontWeight: "bold" }}
                              >
                                Live Meter
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontWeight: "bold" }}
                              >
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {dispencer.sub_dispencer_id.map((subDispencer) => (
                              <TableRow key={subDispencer._id}>
                                <TableCell align="center">
                                  {subDispencer.sub_dispencer}
                                </TableCell>
                                <TableCell align="center">
                                  {subDispencer.live_reading}
                                </TableCell>
                                <TableCell align="center">
                                  {/* <Button
                                    onClick={() =>
                                      handleEditDispencer(subDispencer)
                                    }
                                  >
                                    <EditIcon sx={{ color: "#0d47a1" }} />
                                  </Button> */}
                                  <Button
                                    onClick={() =>
                                      handleDeleteSubDispencer(
                                        dispencer,
                                        subDispencer
                                      )
                                    }
                                  >
                                    <DeleteIcon sx={{ color: "#ef5350" }} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}
