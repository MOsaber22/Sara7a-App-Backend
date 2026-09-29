import mongoose from "mongoose";

 const dbConnection = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB Connected Successfully");  
    })
    .catch((err) => {
        console.log("Connection on DB Failed", err.message);
    })  
}

export default dbConnection