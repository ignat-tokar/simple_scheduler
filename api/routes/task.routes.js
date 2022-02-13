const {Router} = require('express');
const Task = require('../models/Task');
const List = require('../models/List');

const router = Router();

router.get('/:listId', async (req, res)=>{
  try{
    const taskList = await Task.find({listId: req.params.listId});
    return res.json(taskList);
  }catch(e){
    return res.status(500).json({Error: e.message});
  }
});

router.post('/:listId', async (req, res)=>{
  try{
    const newTask = new Task({listId: req.params.listId, taskTitle: req.body.taskTitle[0]});
    newTask.save();
    const updatedTaskList = await Task.find({listId: req.params.listId});
    return res.json(updatedTaskList);
  }catch(e){
    return res.status(500).json({Error: e.message});
  }
});

router.post('/delete/:id/:listId', async (req, res)=>{
  try{
    await Task.deleteOne({_id: req.params.id});
    const updatedTaskList = await Task.find({listId: req.params.listId});
    return res.json(updatedTaskList);
  }catch(e){
    return res.status(500).json({Error: e.message});
  }
});

module.exports = router;