import mongoose from 'mongoose';

// Document interface
interface IUser {
  pseudo: string;
  mail: string;
  password: string;
  pokeCoin: number;
  cardsList: {
    card: {},
    quantity: number
  }[];
}

// Schema
const UserSchema = new mongoose.Schema<IUser>({
  pseudo: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  pokeCoin: { type: Number, default: 1000 },
  cardsList: { 
    type: [
      {
        card : { type: Object},
        quantity: { type: Number}
      }
    ], default: []},
});

// 3. Create a Model.
//const UserModel =  mongoose.model<IUser>('users', UserSchema) || mongoose.models.User

export default (mongoose.models && mongoose.models.User
  ? mongoose.models.User
  : mongoose.model('User', UserSchema));