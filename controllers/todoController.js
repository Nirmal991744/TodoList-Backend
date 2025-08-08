const Todo = require("../models/Todo");
const User = require("../models/User");
const transporter = require("../config/nodemailer");
const dotenv = require('dotenv');

dotenv.config();

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description, userId: req.userId });
    await todo.save();

    // Send email to user
    const user = await User.findById(req.userId);
    if (user?.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "New Todo Created",
        text: `Hello ${user.name},\n\nA new Todo has been added:\n\nTitle: ${title}\nDescription: ${description}`,
      });
    }

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const updated = await Todo.findOneAndUpdate({ _id: id, userId: req.userId }, req.body, { new: true });
  res.json(updated);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findOneAndDelete({ _id: id, userId: req.userId });
  res.json({ message: "Todo deleted" });
};
