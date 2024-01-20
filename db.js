import mongoose from "mongoose";

export const connectAuthDb = async (connectonURI) => {
  try {
    await mongoose.connect(connectonURI);
    console.log(`Connected to AuthDB successfully`);
  } catch (err) {
    console.error(err);
  }
};
