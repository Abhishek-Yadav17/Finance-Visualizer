import { useState, useEffect } from 'react';
import TransactionList from '@/components/TransactionList';
import TransactionForm from '@/components/TransactionForm';
import Dashboard from '@/components/Dashboard';
import AccountCard from '@/components/AccountCard';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Avatar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    });

    const data = await res.json();

    setTransactions([data, ...transactions]);
    setOpen(false);
  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <div style={{backgroundColor: '#101010'}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 3, px: '2vw', py: '1vw' }}>
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{color: 'white', bgcolor: '#FF8041', borderRadius: '15px', textTransform: 'capitalize'}}
          startIcon={<AddIcon />}
        >
          Add Transaction
        </Button>

        <Box display="flex" alignItems="center">
          <Typography fontSize='1.2vw' color='white'>Abhishek Yadav</Typography>
          <Avatar sx={{ ml: 1, bgcolor: '#FF8041' }} src='https://png.pngtree.com/png-clipart/20241127/original/pngtree-flat-character-design-vector-material-png-image_17329518.png'/>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleCloseModal} sx={{ '& .MuiDialog-paper': { borderRadius: '22px', background: 'linear-gradient(to bottom, #101010, #201E24)', width: '500px', padding: '20px'}}}>
        <DialogTitle color='white'>Add Transaction</DialogTitle>
        <DialogContent>
          <TransactionForm onSubmit={handleAddTransaction} handleCloseModal={handleCloseModal} />
        </DialogContent>
      </Dialog>

      <Box sx={{display: 'flex'}}>
        <Box sx={{width: '74%', flexShrink: '0'}}>
          <Dashboard transactions={transactions} />
          <TransactionList
            transactions={transactions}
            setTransactions={setTransactions}
            budgets={budgets}
            setBudgets={setBudgets}
          />
        </Box>
        <Box sx={{ width: '30%',height: '130vh', pr: 2}}>
          <AccountCard transactions={transactions} />
        </Box>
      </Box>
    </div>
  );
}
