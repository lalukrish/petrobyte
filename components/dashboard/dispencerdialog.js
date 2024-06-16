import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DispencerDialog from "./dispencerdialog";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const productSalesData = [
  { name: "Product A", value: 2400 },
  { name: "Product B", value: 4567 },
  { name: "Product C", value: 1398 },
  { name: "Product D", value: 9800 },
];

export default function BasicCard({ data, salesData }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Card
          sx={{
            width: "500px",
            backgroundColor: "white",
            boxShadow: 10,
            color: "black",
            borderRadius: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          {open ? <DispencerDialog data={data} close={handleClose} /> : null}

          <CardContent>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
              color="text.secondary"
            >
              Sales Report
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              {data.fuel} Sales
            </Typography>
            <LineChart width={450} height={300} data={salesData}>
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
            <Typography
              variant="h6"
              component="div"
              sx={{ mt: 4, mb: 2, fontWeight: "bold" }}
            >
              Product Sales
            </Typography>
            <PieChart width={450} height={300}>
              <Pie
                data={productSalesData}
                cx={200}
                cy={150}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {productSalesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button size="small" onClick={handleClickOpen}>
              <EditIcon />
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
