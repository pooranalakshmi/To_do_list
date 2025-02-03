const express = require('express');
const connectDB = require('./models/db'); 
const taskRouter = require('./routes/router');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

connectDB();

app.use('/tasks', taskRouter); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
