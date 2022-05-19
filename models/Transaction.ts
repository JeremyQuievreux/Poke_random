import mongoose from 'mongoose';
// Document interface
type TransactionType = {
    userID: String,
    userName: String,
    type: String,
    cardID: String,
    cardName: String,
}
// Schema
const TransactionSchema = new mongoose.Schema<TransactionType>({
  userID: String,
  userName: String,
  type: String,
  cardID: String,
  cardName: String,
})
// 3. Create a Model.
export default mongoose.models.Transaction || mongoose.model<TransactionType>('Transaction', TransactionSchema);
