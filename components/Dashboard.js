import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemIcon } from '@mui/material';
import { Fastfood, DirectionsCar, Home, LocalAtm } from '@mui/icons-material';
import { LineChart, Line, XAxis as LineXAxis, YAxis as LineYAxis, Tooltip as LineTooltip, Legend as LineLegend } from 'recharts';

const Dashboard = ({ transactions }) => {
  const totalExpenses = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const categories = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const categoryData = Object.keys(categories).map((key) => ({
    name: key,
    value: categories[key],
  }));

  const mostRecentTransactions = transactions.slice(0, 5);

  const monthlyData = transactions.reduce((acc, transaction) => {
    if (!transaction.date) return acc;
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    if (acc[month]) {
      acc[month] += transaction.amount;
    } else {
      acc[month] = transaction.amount;
    }
    return acc;
  }, {});

  const formattedMonthlyData = Object.keys(monthlyData).map((month) => ({
    name: month,
    expense: monthlyData[month],
  }));

  const categoryIcons = {
    food: <Fastfood />,
    transport: <DirectionsCar />,
    bills: <Home />,
    entertainment: <LocalAtm />,
  };

  const lineChartData = formattedMonthlyData.map((data) => ({
    name: data.name,
    expense: data.expense,
  }));

  const CustomizedTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { name, expense } = payload[0].payload;
      return (
        <Box sx={{ backgroundColor: '#424242', color: 'white', padding: '8px', borderRadius: '5px' }}>
          <Typography sx={{ fontSize: '0.9vw'}}>{name}: {expense}</Typography>
        </Box>
      );
    }
    return null;
  };  

  return (
    <Box p="0 2vw" sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', width: '100%', }}>
      <Box sx={{ width: '90%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
          <Box sx={{ width: '60%' }}>
          <Box item xs={12} sm={6}>
              <Card sx={{ borderRadius: '22px', background: 'linear-gradient(to bottom,rgb(16, 16, 16),rgb(33, 31, 37))', border: '1px solid #424242', color: 'white' }}>
                <CardContent>
                  <Typography fontSize='1.2vw' sx={{mb: 2}}>Monthly Expenses</Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={formattedMonthlyData}>
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#7177E4" />
                          <stop offset="100%" stopColor="#C498CF" />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" tickMargin={5}  tick={{ fontSize: '0.8vw' }} />
                      <YAxis />
                      <Tooltip content={<CustomizedTooltip />} />
                      <Legend />
                      <Bar dataKey="expense" fill="url(#gradient)">
                        {formattedMonthlyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box width="40%">
            <Card sx={{ borderRadius: '22px', background: 'linear-gradient(to bottom,rgb(16, 16, 16),rgb(33, 31, 37))', border: '1px solid #424242', color: 'white' }}>
              <CardContent>
                <Typography fontSize='1.2vw' sx={{mb: 2}}>Category Wise Pie Chart</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                      stroke='none'
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0 ? '#D33147' :  
                            index === 1 ? '#481F99' :   
                            index === 2 ? '#02C984' :   
                            '#B0CAE0'                  
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-between' }}>
          <Box>
            <Card sx={{ height: '18vh', minWidth: '200px', borderRadius: '22px', background: 'linear-gradient(to bottom,rgb(16, 16, 16),rgb(33, 31, 37))', border: '1px solid #424242', color: 'white' }}>
              <CardContent>
                <Typography fontSize='1vw' sx={{mb: 1}}>Total Expense</Typography>
                <Typography variant="h5">${totalExpenses.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Card sx={{ height: '18vh', minWidth: '200px', borderRadius: '22px', background: 'linear-gradient(to bottom,rgb(16, 16, 16),rgb(33, 31, 37))', border: '1px solid #424242', color: 'white', pl: 1 }}>
              <CardContent>
                <Typography fontSize='1vw'>Monthly Expenses Trend</Typography>
                <ResponsiveContainer width="80%" height={70}>
                  <LineChart data={lineChartData}>
                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="#C6364F"
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Card sx={{ height: '18vh', minWidth: '300px', borderRadius: '22px', background: 'linear-gradient(to bottom,rgb(16, 16, 16),rgb(33, 31, 37))', border: '1px solid #424242', color: 'white'}}>
              <CardContent>
                <Typography fontSize='1vw'>Most Recent Transactions</Typography>
                <ul>
                  {mostRecentTransactions.slice(0, 3).map((transaction) => (
                    <ListItem key={transaction._id} sx={{ padding: '2px 8px', display: 'flex' }}>
                      <Box>
                        <Typography fontSize='0.8vw'>
                          {new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} - {transaction.description}: ${transaction.amount}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      <Box>
        <Card sx={{ height: '100%', minWidth: '300px', borderRadius: '22px', background: 'linear-gradient(to bottom,rgb(16, 16, 16),rgb(33, 31, 37))', border: '1px solid #424242', color: 'white' }}>
          <CardContent>
            <Typography fontSize='1.2vw'>Category Breakdown</Typography>
            <List sx={{mt: 3}}>
              {Object.keys(categories).map((category) => (
                <ListItem key={category} sx={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
                  <ListItemIcon sx={{ color: '#7578E2' }}>
                    {categoryIcons[category.toLowerCase()] || <Fastfood />}
                  </ListItemIcon>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{category}</Typography>
                    <Typography variant="body2">${categories[category].toFixed(2)}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
