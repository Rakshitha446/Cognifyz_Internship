const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Home Page (Webpage)
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Student Management API</title>
        <style>
            body{
                margin:0;
                font-family:Arial, Helvetica, sans-serif;
                background:linear-gradient(135deg,#4facfe,#00f2fe);
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
            }
            .card{
                background:white;
                padding:40px;
                border-radius:20px;
                box-shadow:0 10px 25px rgba(0,0,0,0.2);
                text-align:center;
                width:420px;
            }
            h1{
                color:#2563eb;
                margin-bottom:10px;
            }
            p{
                color:#555;
                font-size:18px;
            }
            .status{
                display:inline-block;
                margin-top:20px;
                padding:10px 20px;
                background:#22c55e;
                color:white;
                border-radius:30px;
                font-weight:bold;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🎓 Student Management API</h1>
            <p>Welcome! Your Node.js + Express server is running successfully.</p>
            <div class="status">✅ Server Running on Port 3000</div>
        </div>
    </body>
    </html>
    `);
});

// CRUD API
let students = [];

// Create
app.post("/students", (req, res) => {
    const student = {
        id: students.length + 1,
        ...req.body
    };
    students.push(student);
    res.status(201).json(student);
});

// Read
app.get("/students", (req, res) => {
    res.json(students);
});

// Update
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if(index === -1){
        return res.status(404).json({message:"Student not found"});
    }

    students[index] = { id, ...req.body };
    res.json(students[index]);
});

// Delete
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.id !== id);
    res.json({message:"Student deleted successfully"});
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});