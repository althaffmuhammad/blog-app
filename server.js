const express = require ('express');
const cors = require ('cors');
const morgan = require ('morgan');
const colors = require ('colors');
const dotenv = require ('dotenv');
const connectDB = require ('./config/db');
const path = require ('path');

//env config
dotenv.config ();

// const __dirname = path.resolve ();
const currentDir = path.resolve (__dirname);

//router import
const userRoutes = require ('./routes/userRoutes');
const blogRoutes = require ('./routes/blogRoutes');

//mongodb connection
connectDB ();

//rest objecct
const app = express ();

//middelwares
app.use (cors ());
app.use (express.json ());
app.use (morgan ('dev'));

//routes
app.use ('/api/v1/user', userRoutes);
app.use ('/api/v1/blog', blogRoutes);
app.use (express.static (path.join (currentDir, './client/build')));

//rest api
app.use ('*', (req, res) => {
  res.sendFile (path.join (currentDir, './client/build/index.html'));
});

// Port
const PORT = process.env.PORT || 8080;
//listen
app.listen (PORT, () => {
  console.log (`Server Running on  port no ${PORT}`.bgCyan.white);
});
