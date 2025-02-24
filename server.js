const express=require("express");
const erroeHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnections");
//const { connect } = require("http2");
const dotenv=require("dotenv").config();
const app=express();
connectDb();


const port=process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(erroeHandler);

app.listen(port,() =>{
    console.log(`Server is listening on ${port}`);
});

