const {Router} = require('express');
const List = require('../models/List');
const Task = require('../models/Task');

const router = Router();

router.get('/', async (req, res)=>{
  try{
    const lists = await List.find();
    return res.json(lists);
  }catch(e){
    return res.status(500).json({Error: e.message});
  }
});

router.post('/', async (req, res)=>{
  try{
    const listTitle = req.body.listTitle[0]
    const newList = new List({listTitle});
    newList.save();
    const updatedLists = await List.find();
    return res.json(updatedLists);
  }catch(e){
    return res.status(500).json({Error: e.message});
  }
});

router.post('/delete/:id', async (req, res)=>{
  try{
    await List.deleteOne({_id: req.params.id});
    const updatedLists = await List.find();
    await Task.deleteMany({listId: req.params.id});
    return res.json(updatedLists);
  }catch(e){
    return res.status(500).json({Error: e.message});
  }
});

router.get('/:id', async (req, res)=>{
  try{
    const findedList = await List.findOne({_id: req.params.id});
    return res.json(findedList);
  }catch(e){
    return res.status(500).json({Error: e.message});
  }
});

module.exports = router;