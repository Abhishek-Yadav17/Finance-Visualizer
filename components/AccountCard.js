import React from 'react';
import { Button, Box, Card, CardContent, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const AccountCard = ({ transactions }) => {

  const getRecentTransactions = () => {
    return transactions.slice(0, 4);
  };

  return (
    <Card sx={{ height: '132vh', borderRadius: '22px', background: 'linear-gradient(to bottom,rgb(16, 16, 16),rgb(33, 31, 37))', border: '1px solid #424242', color: 'white'}}>
      <CardContent>
        <Typography fontSize='1.2vw'>Account Overview</Typography>
        <Card sx={{height: '15vw', borderRadius: '25px', background: 'linear-gradient( #6B74E5, #CA9BCD)', display: 'flex', flexDirection: 'column', p: '1.5vw 2vw', justifyContent: 'space-between', color: 'white', mt: 4}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{fontSize: '1vw', fontWeight: 'light'}}>Current Card</Typography>
                <Typography sx={{fontWeight: 'regular', fontSize: '1vw'}}>****6754</Typography>
            </Box>
            <Typography sx={{fontSize: '1.8vw'}}>$68709.89</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{textAlign: 'left'}}>
                    <Typography sx={{fontWeight: 'light', fontSize: '0.9vw'}}>10/27</Typography>
                    <Typography sx={{fontWeight: 'light', fontSize: '1vw'}}>Abhishek Yadav</Typography>
                </Box>
                <Typography sx={{alignSelf: 'flex-end', fontWeight: 'bold', fontStyle: 'italic', fontSize: '1.5vw'}}>VISA</Typography>
            </Box>    
        </Card>
      </CardContent>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px', mt: 3, mx: 2 }}>
        <Button variant="contained" sx={{ bgcolor: '#1E1D22', borderRadius: '50%', width: '100px', height: '100px', textTransform: 'capitalize', fontSize: '0.9vw', display: 'flex', flexDirection: 'column' }}>
          <SendIcon sx={{ fontSize: '0.8vw', mb: 1 }} />
          Send
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#1E1D22', borderRadius: '50%', width: '100px', height: '100px',  textTransform: 'capitalize', fontSize: '0.9vw', display: 'flex', flexDirection: 'column' }}>
          <SwapHorizIcon sx={{ fontSize: '1vw', mb: 1 }} />
          Transfer
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#1E1D22', borderRadius: '50%', width: '100px', height: '100px',  textTransform: 'capitalize', fontSize: '0.9vw', display: 'flex', flexDirection: 'column' }}>
          <MoreHorizIcon sx={{ fontSize: '1vw', mb: 1 }} />
          More
        </Button>
      </Box>

      <Box sx={{ padding: '20px', height: '40%', borderRadius: '22px', border: '1px solid #434343', mr: 2, ml: 2, mt: 4 }}>
        <Typography fontSize='1.2vw' sx={{ marginBottom: '10px' }}>Recent Transactions</Typography>
        {getRecentTransactions().map((transaction) => (
          <Box key={transaction._id} sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3.5 }}>
            <Box>
              <Typography variant="body2">{transaction.description}</Typography>
              <Typography variant="caption" sx={{ fontSize: '12px', color: '#888' }}>
                {new Date(transaction.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'red', fontWeight: 'bold' }}>
              -${transaction.amount.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default AccountCard;
