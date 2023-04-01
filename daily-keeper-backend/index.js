const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
var bodyParser = require('body-parser');
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

//Routes

//Create a todo

app.post("/api/tasks", async(req, res) => {
    try {
        const { id, content, date, is_done, tag_id, is_important, is_urgent } = req.body;
        const newTodo = 
            await pool.query("INSERT INTO tasks (id, content, date, is_done, tag_id, is_important, is_urgent) VALUES ($1, $2, $3, $4, $5, $6, $7) ",
            [id, content, date, is_done, tag_id, is_important, is_urgent]);
        res.json(newTodo);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all todo

app.get("/api/tasks", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM tasks");
        res.json(allTodos.rows);
    } catch(err) {
        console.log(err.message);
    }
})

//Update a todo

app.put("/api/tasks/:id", async(req, res) => {
    try {
        const { id, content, date, is_done, tag_id, is_important, is_urgent } = req.body;
        const updateTodo = await pool.query("UPDATE tasks SET \
            content = $1, \
            date = $2, \
            is_done = $3, \
            tag_id = $4, \
            is_important = $5, \
            is_urgent = $6 WHERE id = $7",
            [content, date, is_done, tag_id, is_important, is_urgent, id]);
            res.json("Successfully!");
    } catch(err) {
        console.log(err.message);
    }
    
})

//Delete a todo

app.delete("/api/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM tasks WHERE id = $1",[id]);
        res.json("Todo deleted!")
    } catch(err) {
        console.log(err.message);
    }
})

//Create a tag

app.post("/api/tags", async(req, res) => {
    try {
        const { id, name, color } = req.body;
        const newTag = 
            await pool.query("INSERT INTO tags (id, name, color) VALUES ($1, $2, $3) ",
            [id, name, color]);
        res.json(newTag);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all tags

app.get("/api/tags", async(req, res) => {
    try {
        const allTags = await pool.query("SELECT * FROM tags");
        res.json(allTags.rows);
    } catch(err) {
        console.log(err.message);
    }
})

//Update a tag

app.put("/api/tags/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const { name, color } = req.body;
        const query = {
            text: 'UPDATE tags SET \
            name = $1, \
            color = $2 \
            WHERE id = $3',
            values: [name, color, id],
        }
        const updateTag = await pool.query(query);
        res.json("Successfully");
    } catch(err) {
        console.log(err.message);
    }
})

//Delete a tag

app.delete("/api/tags/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTag = await pool.query("DELETE FROM tags WHERE id = $1",[id]);
        res.json("Tag deleted!")
    } catch(err) {
        console.log(err.message);
    }
})

app.listen(port, () => {
    console.log("Listening on port " + port);
})