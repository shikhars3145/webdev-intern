const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const cors = require('cors');
const partnersRouter = require('./routes/partnersRouter');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/partners', partnersRouter);

const port  = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})