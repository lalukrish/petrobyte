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

export default function DispencerTable() {
  const [open, setOpen] = React.useState(false);
  const [dispencers, setDispencers] = React.useState([]);
  const [refreshDispencer, setRefreshDispencer] = React.useState(false);
  const [editDispencer, setEditDispencer] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [openRow, setOpenRow] = React.useState(null); // To track which row is open

  const fetchAllDispencer = () => {
    // Replace the following dummy data with an actual API call if necessary
    const dummyData = [
      {
        _id: "1",
        dispencer: "Dispencer A",
        fuel_id: { fuel_name: "Diesel" },
        live_reading: "1000",
        subDispencers: [
          { _id: "1-1", sub_name: "D1", live_meter: "500" },
          { _id: "1-2", sub_name: "D@", live_meter: "600" },
        ],
      },
      {
        _id: "2",
        dispencer: "Dispencer 2",
        fuel_id: { fuel_name: "Petrol" },
        live_reading: "1500",
        subDispencers: [
          { _id: "2-1", sub_name: "Sub Dispencer 2-1", live_meter: "700" },
          { _id: "2-2", sub_name: "Sub Dispencer 2-2", live_meter: "800" },
        ],
      },
    ];

    // Simulate an API call
    setTimeout(() => {
      setDispencers(dummyData);
      setTotalPages(Math.ceil(dummyData.length / 10)); // Assuming 10 items per page
    }, 500);
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

  const handleDelete = (row) => {
    // Dummy delete function
    console.log("Delete request for", row);
    handleRefresh();
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
            {dispencers.map((dispencer) => (
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
                  <TableCell align="center">{dispencer.dispencer}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEditDispencer(dispencer)}>
                      <EditIcon sx={{ color: "#0d47a1" }} />
                    </Button>
                    <Button onClick={() => handleDelete(dispencer)}>
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
                            {dispencer.subDispencers.map((subDispencer) => (
                              <TableRow key={subDispencer._id}>
                                <TableCell align="center">
                                  {subDispencer.sub_name}
                                </TableCell>
                                <TableCell align="center">
                                  {subDispencer.live_meter}
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    onClick={() =>
                                      handleEditDispencer(subDispencer)
                                    }
                                  >
                                    <EditIcon sx={{ color: "#0d47a1" }} />
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(subDispencer)}
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

// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Box, Button, Pagination } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import axios from "axios";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DispencerNew from "./dialogdispencer";

// export default function DispencerTable() {
//   const [open, setOpen] = React.useState(false);
//   const [dispencers, setDispencers] = React.useState([]);
//   const [refreshDispencer, setrefreshDispencer] = React.useState(false);
//   const [editDispencer, setEditDispencer] = React.useState({});
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const [totalPages, setTotalPages] = React.useState(1);
//   const fetchAllDispencer = () => {
//     axios
//       .get(${process.env.NEXT_PUBLIC_API_URL}/dispencer/GETAllDispencer)
//       .then((response) => {
//         setDispencers(response.data.message.dispencers),
//           setTotalPages(Math.ceil(response.data.message.count / limit));
//       })
//       .catch((err) => console.log(err.message));
//   };

//   React.useEffect(() => {
//     fetchAllDispencer();
//   }, [currentPage, refreshDispencer]);

//   const handleClickOpen = () => {
//     setEditDispencer("");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleRefresh = () => {
//     setrefreshDispencer(!refreshDispencer);
//   };
//   //edit dispencer

//   const handleEditDispencer = (data) => {
//     setEditDispencer(data);
//     setOpen(true);
//   };

//   const handleDelete = (row) => {
//     axios
//       .delete(
//         ${process.env.NEXT_PUBLIC_API_URL}/dispencer/DELETEDispencer?id=${row._id}
//       )
//       .then((response) => {
//         alert(response.data.message);
//         handleRefresh();
//       })
//       .catch((error) => {
//         console.error("Delete request failed:", error);
//       });
//   };

//   return (
//     <Box>
//       <Button
//         variant="outlined"
//         sx={{
//           marginBottom: "20px",
//           color: "#0d47a1",
//           border: "1px solid #0d47a1",
//         }}
//         onClick={handleClickOpen}
//       >
//         Add Dispencer
//       </Button>
//       {open ? (
//         <DispencerNew
//           close={handleClose}
//           refreshDispencer={handleRefresh}
//           edit={editDispencer}
//         />
//       ) : null}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead sx={{ background: "#e3f2fd" }}>
//             <TableRow>
//               <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                 Dispencer
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                 Fuel
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                 Live Metering
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {dispencers.map((dispencer) => (
//               <TableRow
//                 key={dispencer._id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="center">{dispencer.dispencer}</TableCell>
//                 <TableCell align="center">
//                   {dispencer.fuel_id?.fuel_name}
//                 </TableCell>
//                 <TableCell align="center">{dispencer.live_reading}</TableCell>
//                 <TableCell align="center">
//                   <Button onClick={() => handleEditDispencer(dispencer)}>
//                     <EditIcon sx={{ color: "#0d47a1" }} />
//                   </Button>
//                   <Button onClick={() => handleDelete(dispencer)}>
//                     <DeleteIcon sx={{ color: "#ef5350" }} />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Pagination
//         count={totalPages}
//         page={currentPage}
//         onChange={(event, value) => setCurrentPage(value)}
//         sx={{ mt: 2, display: "flex", justifyContent: "center" }}
//       />
//     </Box>
//   );
// }
