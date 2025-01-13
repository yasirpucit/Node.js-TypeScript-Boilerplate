import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { emailRegex } from '../constants/app.constants';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  comparePassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      function (email) {
        return emailRegex.test(email);
      },
      'Email is invalid.',
    ],
    trim: true,
    lowercase: true,
    index: true,
    set: function (v) {
      return `${v}`.toLowerCase();
    },
  },
  password: { type: String, required: true },
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.comparePassword = async function (candidatePassword: string, userPassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model<IUser, IUserModel>('User', UserSchema);
