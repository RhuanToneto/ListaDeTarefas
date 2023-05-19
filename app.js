const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    tasks.push({ name: task });
    res.redirect('/');
});

app.post('/remove/:index', (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.sendStatus(200);
});

app.post('/update/:index', (req, res) => {
    const index = req.params.index;
    const updatedTask = req.body;

    tasks[index] = { ...tasks[index], ...updatedTask };

    res.sendStatus(200);
});

app.post('/removeAll', (req, res) => {
    tasks = [];
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
