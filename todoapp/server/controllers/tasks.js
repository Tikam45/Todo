const List = require("../models/list");
const User = require("../models/users")


exports.addTask = async (req, res) => {
    const task = new List({
      title: req.body.title,
      description: req.body.description,
      userId: req.userId,
    });
  
    try{
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

exports.getTasks = async (req, res) => {
try {
  const tasks = await Task.find({ user : req.tokdn.id });
  res.json(tasks);
} 
catch (err) {
  res.status(500).json({ message: err.message });
}
};

exports.addTask = async(req, res) => {
  try {
    const user = await User.find({user : req.token.id});
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      userId: req.token.id,
    });
    
    const newTask = await task.save();
    res.status(201).json(newTask);
  } 
  catch(error) {
    console.error();
    console.log("Task couldn't be added")
  }
};