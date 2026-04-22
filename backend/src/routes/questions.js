const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const authenticate = require("../middleware/auth");
const isOwner = require("../middleware/isOwner");

// Apply authentication to ALL routes in this router
router.use(authenticate);

// GET /questions
// List all questions
router.get("/", async (req, res) => {
  const questions = await prisma.question.findMany({
    orderBy: { id: "asc" },
  });
  res.json(questions);
});


// GET /questions/:qId
// Show a specific question
router.get("/:qId", async (req, res) => {
  const qId = Number(req.params.qId);
  const question = await prisma.question.findUnique({
    where: { id: qId },
  });

  if (!question) {
    return res.status(404).json({ 
		message: "Question not found" 
    });
  }

  res.json(question);
});

// POST /questions
// Create a new question
router.post("/", async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ msg: 
	"question and answer are mandatory" });
  }

  const newQuestion = await prisma.question.create({
    data: {
      question, answer, userId: req.user.userId,
    },
  });

  res.status(201).json(newQuestion);
});


// PUT /questions/:qId
// Edit a question
router.put("/:qId", isOwner, async (req, res) => {
  const qId = Number(req.params.qId);
  const { question, answer } = req.body;
  const existingQuestion = await prisma.question.findUnique({ where: { id: qId } });
  if (!existingQuestion) {
    return res.status(404).json({ message: "Question not found" });
  }

  if (!question || !answer) {
    return res.status(400).json({ msg: "question and answer are mandatory" });
  }

  const updatedQuestion = await prisma.question.update({
    where: { id: qId },
    data: {
      question, answer,
    },
  });
  res.json(updatedQuestion);
});



// DELETE /questions/:qId
// Delete a question
router.delete("/:qId",isOwner, async (req, res) => {
  const qId = Number(req.params.qId);

  const question = await prisma.question.findUnique({
    where: { id: qId },
  });

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  await prisma.question.delete({ where: { id: qId } });

  res.json({
    message: "Question deleted successfully",
  });
});


module.exports = router;
