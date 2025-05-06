import mongoose from "mongoose";

export const connect = (url) => mongoose.connect(`${process.env.DBURL}`);
