const Tasks = require("../Models/Task");
const mongoose = require("mongoose");

//get all tasks
const getAllTask = async (req, res) => {
  const user_id = req.user._id
  const tasks = await Tasks.find({user_id}).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

//get a single tasks
const getSingleTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No task found" });
  }

  const task = await Tasks.findById(id);

  if (!task) {
    return res.status(404).json({ error: "No task found" });
  }
  res.status(200).json(task);
};

// create a new task
const createTask = async (req, res) => {
  const { title, task, status } = req.body;
  try {
    const user_id = req.user._id
    const tasks = await Tasks.create({
      title,
      task,
      status,
      user_id
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No task to delete" });
  }
  const task = await Tasks.findOneAndDelete({ _id:id },{
    ...req.body
  });

  if (!task) {
    return res.status(404).json({ error: "No task to delete" });
  }
  res.status(200).json(task);
};

//update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No task to delete" });
  }
  const update = await Tasks.findOneAndUpdate({_id: id });

  if (!update) {
    return res.status(400).json({ error: "No task to delete" });
  }
  res.status(200).json(update);
};

module.exports = {
  createTask,
  getAllTask,
  getSingleTask,
  deleteTask,
  updateTask,
};
