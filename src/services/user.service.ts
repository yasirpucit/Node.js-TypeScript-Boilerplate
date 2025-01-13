import User, { IUser } from '../models/user.model';

const registerUser = async (userData: { username: string; email: string; password: string }): Promise<IUser> => {
  const { username, email, password } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  // Create new user
  const newUser = new User({ username, email, password });
  await newUser.save();

  return newUser;
};

const updateUserRecord = async (userId: string, data: { username?: string; email?: string }): Promise<IUser> => {
  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });

  return updatedUser;
};

const deleteUserRecord = async (userId: string): Promise<IUser> => await User.findByIdAndDelete(userId);

const getUserRecord = async (key: string, value: any): Promise<IUser> => await User.findOne({ [key]: value });

export { deleteUserRecord, getUserRecord, registerUser, updateUserRecord };
