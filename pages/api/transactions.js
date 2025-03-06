import connectDb from '../../lib/mongodb';
import Transaction from '../../models/Transaction';

export default async function handler(req, res) {
  await connectDb();

  switch (req.method) {
    case 'GET':
      try {
        const transactions = await Transaction.find({});
        res.status(200).json(transactions);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
      }
      break;

    case 'POST':
      try {
        const { amount, date, description, category } = req.body;
        const newTransaction = new Transaction({ amount, date, description, category });
        await newTransaction.save();
        res.status(201).json(newTransaction);
      } catch (error) {
        res.status(400).json({ message: 'Error creating transaction' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({ message: 'Transaction deleted' });
      } catch (error) {
        res.status(400).json({ message: 'Error deleting transaction' });
      }
      break;

    case 'PUT':
      try {
        const { id, amount, date, description, category } = req.body;
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          id,
          { amount, date, description, category },
          { new: true }
        );
        res.status(200).json(updatedTransaction);
      } catch (error) {
        res.status(400).json({ message: 'Error updating transaction' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
