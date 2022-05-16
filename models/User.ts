import mongoose from 'mongoose';

// Document interface
interface IUser {
  pseudo: string;
  mail: string;
  password: string;
  isAdmin: boolean;
  pokeCoin: number;
  cardsList: CardType[]
}

type CardType = {
  card: string,
  quantity: number,
}

// Schema
const CardsListSchema = new mongoose.Schema({
  card: String,
  quantity: Number,
}, {_id: false})


const UserSchema = new mongoose.Schema<IUser>({
  pseudo: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  pokeCoin: { type: Number, default: 1000 },
  cardsList: [CardsListSchema],
});

// 3. Create a Model.

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

//mongoose.models = {};

//export default mongoose.model('user', UserSchema)

// export const UserModel = mongoose.models.User || mongoose.model<IUser>('users', UserSchema)

/* export default (mongoose.models && mongoose.models.User
  ? mongoose.models.User
  : mongoose.model('User', UserSchema)); */