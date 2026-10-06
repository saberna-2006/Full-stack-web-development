const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let feedbacks = [];

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Feedback System</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      background: #f2f5f9;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      width: 450px;
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 8px;
    }

    .subtitle {
      text-align: center;
      color: #777;
      margin-bottom: 25px;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: bold;
      color: #333;
    }

    input, select, textarea {
      width: 100%;
      padding: 12px;
      margin-bottom: 18px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 15px;
    }

    textarea {
      resize: none;
    }

    button {
      width: 100%;
      padding: 13px;
      background: #4a90e2;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background: #357abd;
    }

    .success {
      margin-top: 20px;
      padding: 12px;
      text-align: center;
      background: #e8f5e9;
      color: #2e7d32;
      border-radius: 8px;
      font-weight: bold;
    }
  </style>
</head>

<body>

  <div class="container">

    <h1>Feedback System</h1>

    <p class="subtitle">
      We value your feedback
    </p>

    <form action="/feedback" method="POST">

      <label>Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        required
      >

      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
      >

      <label>Rating</label>
      <select name="rating" required>
        <option value="">Select Rating</option>
        <option value="5">★★★★★ Excellent</option>
        <option value="4">★★★★ Very Good</option>
        <option value="3">★★★ Good</option>
        <option value="2">★★ Fair</option>
        <option value="1">★ Poor</option>
      </select>

      <label>Feedback</label>
      <textarea
        name="feedback"
        rows="5"
        placeholder="Write your feedback here..."
        required
      ></textarea>

      <button type="submit">
        Submit Feedback
      </button>

    </form>

  </div>

</body>
</html>
  `);
});

app.post("/feedback", (req, res) => {

  const { name, email, rating, feedback } = req.body;

  if (!name || !email || !rating || !feedback) {
    return res.send(`
      <h2>Please fill all the fields.</h2>
      <a href="/">Go Back</a>
    `);
  }

  feedbacks.push({
    name,
    email,
    rating,
    feedback
  });

  console.log("New Feedback Received");
  console.log("---------------------");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Rating:", rating);
  console.log("Feedback:", feedback);

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Feedback Submitted</title>

  <style>
    body {
      font-family: Arial;
      background: #f2f5f9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .box {
      background: white;
      padding: 40px;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    }

    h1 {
      color: #2e7d32;
    }

    p {
      margin: 20px 0;
    }

    a {
      display: inline-block;
      padding: 12px 20px;
      background: #4a90e2;
      color: white;
      text-decoration: none;
      border-radius: 8px;
    }
  </style>
</head>

<body>

  <div class="box">

    <h1>✓ Feedback Submitted!</h1>

    <p>Thank you for your valuable feedback.</p>

    <a href="/">Submit Another Feedback</a>

  </div>

</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`Feedback System running at http://localhost:${PORT}`);
});