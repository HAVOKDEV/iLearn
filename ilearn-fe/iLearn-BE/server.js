const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const StudentRegisteration_route = require('./routes/St_Registerations');
app.use('/Student_Register', StudentRegisteration_route);

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});