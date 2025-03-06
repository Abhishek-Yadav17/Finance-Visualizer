import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

export default function TransactionForm({ onSubmit, handleCloseModal }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [category, setCategory] = useState('Food');

  const onFormSubmit = (data) => {
    onSubmit({ ...data, category });
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <TextField
        label="Amount"
        type="number"
        {...register('amount', { required: 'Amount is required' })}
        fullWidth
        error={!!errors.amount}
        helperText={errors.amount?.message}
        sx={{mb: 4, mt: 1, '& .MuiInputLabel-root': { color: 'white', fontSize: '0.9vw' }, '& .MuiOutlinedInput-root': {borderRadius: '22px', color: 'white', '&:hover fieldset': {borderColor: '#424242'}, '& fieldset': { borderColor: '#424242' }, '&.Mui-focused fieldset': {borderColor: '#424242'}}}}
      />
      <TextField
        label="Date"
        type="date"
        {...register('date', { required: 'Date is required' })}
        fullWidth
        error={!!errors.date}
        helperText={errors.date?.message}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{mb: 4, '& .MuiInputLabel-root': { color: 'white', fontSize: '0.9vw' }, '& .MuiOutlinedInput-root': {borderRadius: '22px', color: 'white', '&:hover fieldset': {borderColor: '#424242'}, '& fieldset': { borderColor: '#424242' }, '&.Mui-focused fieldset': {borderColor: '#424242'}}}}
      />

      <TextField
        label="Description"
        {...register('description', { required: 'Description is required' })}
        fullWidth
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={{mb: 4, '& .MuiInputLabel-root': { color: 'white', fontSize: '0.9vw' }, '& .MuiOutlinedInput-root': {borderRadius: '22px', color: 'white', '&:hover fieldset': {borderColor: '#424242'}, '& fieldset': { borderColor: '#424242' }, '&.Mui-focused fieldset': {borderColor: '#424242'}}}}
      />

      <FormControl fullWidth sx={{mb: 4, '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': {borderRadius: '22px', color: 'white', '&:hover fieldset': {borderColor: '#424242'}, '& fieldset': { borderColor: '#424242' }, '&.Mui-focused fieldset': {borderColor: '#424242'}}}}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Bills">Bills</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{display: 'flex', gap: 3, justifyContent: 'flex-end'}}>
        <Button onClick={handleCloseModal} color="error" variant='outlined' sx={{ textTransform: 'capitalize', width: 'fit-content' }}>Cancel</Button>
        <Button type="submit" variant="outlined" color='primary' sx={{width: 'fit-content', textTransform: 'capitalize'}}>Submit</Button>
      </Box>
    </form>
  );
}
