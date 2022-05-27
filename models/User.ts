import mongoose from 'mongoose';
// Document interface
import { UserType } from '../types/UserType';
import { CardType } from '../types/CardType';
// Schema
const CardsListSchema = new mongoose.Schema<CardType>({
  card: { type: mongoose.Schema.Types.ObjectId, ref: 'pokemon' },
  dex_number: Number,
  quantity: Number,
}, {_id: false})

const UserSchema = new mongoose.Schema<UserType>({
  pseudo: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  pokeCoin: { type: Number, default: 1000 },
  cardsList: [CardsListSchema],
  next_click: { type: Date}
});
// 3. Create a Model.
export default mongoose.models.User || mongoose.model<UserType>('User', UserSchema);