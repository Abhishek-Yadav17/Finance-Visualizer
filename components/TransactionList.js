import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl, TablePagination } from '@mui/material';
import { useState } from 'react';

export default function TransactionList({ transactions, setTransactions }) {
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({
    amount: '',
    description: '',
    category: 'Food',
    date: '',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(4);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });

    if (res.ok) {
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } else {
      console.error('Failed to delete transaction');
    }
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setEditedTransaction({
      amount: transaction.amount,
      description: transaction.description,
      category: transaction.category,
      date: transaction.date,
    });
    setOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    const res = await fetch(`/api/transactions?id=${selectedTransaction._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedTransaction),
    });

    if (res.ok) {
      const updatedTransaction = await res.json();
      setTransactions(
        transactions.map((transaction) =>
          transaction._id === selectedTransaction._id ? updatedTransaction : transaction
        )
      );
      setOpen(false);
    } else {
      console.error('Failed to update transaction');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const currentTransactions = transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Box sx={{ p: 4, mt: 2, color: 'white' }}>
        <TableContainer component={Paper} sx={{ borderRadius: '22px', width: '100%', background: 'linear-gradient(to bottom,rgb(16, 16, 16),rgb(33, 31, 37))', border: '1px solid #424242', p: '1vw 2vw', height: '64vh' }}>
        <Typography sx={{color: 'white', fontSize: '1.2vw'}}>Transactions</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}><strong>Amount</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Description</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Category</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Date</strong></TableCell>
                <TableCell sx={{ color: 'white' }}><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTransactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell sx={{ color: 'white', borderBottom: 'none' }}>{transaction.amount}</TableCell>
                  <TableCell sx={{ color: 'white', borderBottom: 'none' }}>{transaction.description}</TableCell>
                  <TableCell sx={{ color: 'white', borderBottom: 'none' }}>{transaction.category}</TableCell>
                  <TableCell sx={{ color: 'white', borderBottom: 'none' }}>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ color: 'white', borderBottom: 'none' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(transaction._id)}
                      style={{ marginRight: '10px', fontSize: '0.9vw', textTransform: 'capitalize'}}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(transaction)}
                      style={{fontSize: '0.9vw', textTransform: 'capitalize'}}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            sx={{
              color: 'white',
            }}
          />
        </TableContainer>


        <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiDialog-paper': { borderRadius: '22px', background: 'linear-gradient(to bottom, #101010, #201E24)', width: '500px', padding: '20px'}}}>
          <DialogTitle color='white'>Edit Transaction</DialogTitle>
          <DialogContent>
            <TextField
              label="Amount"
              type="number"
              name="amount"
              value={editedTransaction.amount}
              onChange={handleEditChange}
              fullWidth
              margin="dense"
              sx={{mb: 4, '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': {borderRadius: '22px', color: 'white', '&:hover fieldset': {borderColor: '#424242'}, '& fieldset': { borderColor: '#424242' }, '&.Mui-focused fieldset': {borderColor: '#424242'}}}}
            />
            <TextField
              label="Description"
              name="description"
              value={editedTransaction.description}
              onChange={handleEditChange}
              fullWidth
              margin="dense"
              sx={{mb: 4, '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': {borderRadius: '22px', color: 'white', '&:hover fieldset': {borderColor: '#424242'}, '& fieldset': { borderColor: '#424242' }, '&.Mui-focused fieldset': {borderColor: '#424242'}}}}
            />
            <FormControl fullWidth margin="dense" sx={{mb: 4, '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': {borderRadius: '22px', color: 'white', '&:hover fieldset': {borderColor: '#424242'}, '& fieldset': { borderColor: '#424242' }, '&.Mui-focused fieldset': {borderColor: '#424242'}}}}>
              <InputLabel>Category</InputLabel>
              <Select
                value={editedTransaction.category}
                onChange={handleEditChange}
                name="category"
                label="Category"
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Bills">Bills</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={editedTransaction.date}
              onChange={handleEditChange}
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              sx={{mb: 4, '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': {borderRadius: '22px', color: 'white', '&:hover fieldset': {borderColor: '#424242'}, '& fieldset': { borderColor: '#424242' }, '&.Mui-focused fieldset': {borderColor: '#424242'}}}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="error" variant='outlined' sx={{textTransform: 'capitalize'}}>Cancel</Button>
            <Button onClick={handleSaveEdit} color="primary" variant='outlined' sx={{textTransform: 'capitalize'}}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
