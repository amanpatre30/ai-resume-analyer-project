const ResumeModel = require("../Models/resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: "wRtIKVbXYlp528WFuOUHKkpqOWrEjMd9EJp3zPTq",
});

exports.addResume = async (req, res) => {
  try {
    const { job_desc, user } = req.body;

    // File path
    const pdfPath = req.file.path;

    // Read uploaded PDF
    const dataBuffer = fs.readFileSync(pdfPath);

    // Extract PDF text
    const pdfData = await pdfParse(dataBuffer);

    // Prompt for AI
    const prompt = `
You are a resume screening assistant.

Compare the following resume text with the provided Job Description (JD) and give a match score (0-100) and feedback.

Resume:
${pdfData.text}

Job Description:
${job_desc}

Return the score and brief explanation in this format:

Score: xx
Reason: ...
`;

    // Cohere API
    const response = await cohere.chat({
      model: "command-a-03-2025",
      message: prompt,
      temperature: 0.7,
      maxTokens: 300,
    });

    const result = response.text;

    // Extract score
    const match = result.match(/Score:\s*(\d+)/);
    const score = match ? parseInt(match[1], 10) : null;

    // Extract reason
    const reasonMatch = result.match(/Reason:\s*([\s\S]*)/);
    const reason = reasonMatch ? reasonMatch[1].trim() : null;

    // Save to DB
    const newResume = new ResumeModel({
      user,
      resume_name: req.file.originalname,
      job_desc,
      score,
      feedback: reason,
    });

    await newResume.save();

    // Delete uploaded PDF after processing
    fs.unlinkSync(pdfPath);

    res.status(200).json({
      message: "Your analysis is ready",
      data: newResume,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
};

exports.getAllResumesForUser = async (req, res) => {
  try {
    const { user } = req.params;
    let resumes = await ResumeModel.find({ user: user })
      .sort({
        createdAt: -1,
      })
      .limit(5);
    return res
      .status(200)
      .json({ message: "Your Previous History", resumes: resumes });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
};

exports.getResumeForAdmin = async (req, res) => {
  try {
    let resumes = await ResumeModel.find({})
      .sort({ createdAt: -1 })
      .populate("user");
    return res
      .status(200)
      .json({ message: "Fetched All History", resumes: resumes });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
};
