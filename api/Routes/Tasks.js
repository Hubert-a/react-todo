const express = require("express");
const {
  createTask,
  getAllTask,
  getSingleTask,
  deleteTask,
  updateTask,
} = require("../Controllers/taskController");

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth)

//get all tasks
router.get("/", getAllTask);

//get a single task
router.get("/:id", getSingleTask);

//post new task
router.post("/", createTask);



//Delete a task
router.delete("/:id", deleteTask);
//update a task


router.patch("/:id", updateTask);

module.exports = router;
