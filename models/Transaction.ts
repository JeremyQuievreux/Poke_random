import mongoose from 'mongoose';

// Document interface
type TransactionType = {
    user: String,
    style: String,
    card: String,
}

// Schema
const TransactionSchema = new mongoose.Schema<TransactionType>({
  user: String,
  style: String,
  card: String,
})



// 3. Create a Model.
export default mongoose.models.Transaction || mongoose.model<TransactionType>('Transaction', TransactionSchema);
