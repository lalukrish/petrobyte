import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Typography,
  Grid,
  Card,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const COLORS = ["#0088FE", "#FF8042"];

const salesData = [
  { name: "Jan", petrol: 400, diesel: 200 },
  { name: "Feb", petrol: 300, diesel: 100 },
  { name: "Mar", petrol: 500, diesel: 400 },
  { name: "Apr", petrol: 700, diesel: 600 },
  { name: "May", petrol: 600, diesel: 500 },
  { name: "Jun", petrol: 800, diesel: 700 },
];

const productSalesData = [
  { name: "Product A", value: 2400 },
  { name: "Product B", value: 4567 },
  { name: "Product C", value: 1398 },
  { name: "Product D", value: 9800 },
];

const SalesCharts = () => {
  // Ensuring the charts are rendered consistently on client and server
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card>
          <Box p={2}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "20px" }}
            >
              Petrol vs Diesel Sales
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="petrol" fill={COLORS[0]} />
                <Bar dataKey="diesel" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <Box p={2}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "20px" }}
            >
              Product Sales
            </Typography>
            <Box display="flex" justifyContent="space-around">
              <PieChart width={300} height={300}>
                <Pie
                  data={productSalesData}
                  cx={150}
                  cy={150}
                  labelLine={false}
                  label={({ name, percent }) => (
                    <text style={{ fontSize: "12px" }}>{`${name} ${(
                      percent * 100
                    ).toFixed(0)}%`}</text>
                  )}
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
              <List>
                {productSalesData.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Sales: ${item.value}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SalesCharts;
