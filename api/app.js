const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));
app.use('/api/list', require('./routes/list.routes'));
app.use('/api/task', require('./routes/task.routes'));

async function start(){
  try{
    await mongoose.connect('mongodb://mongodb:27017/simple_scheduler');
    app.listen(5000, ()=>{console.log('App has been started on port 5000...')});
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}

start();

