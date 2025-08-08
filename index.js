const express=require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const authroutes=require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
app.use('/onlyfortest',(req,res)=>{
  res.send("Todo-api is running")
})
app.use('/api/auth' ,authroutes);
app.use('/api/todos', todoRoutes);
app.listen(process.env.PORT,()=>{
 console.log(`Server running on port ${process.env.PORT}`);
})