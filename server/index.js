
const express = require("express");
const app = express();
const cors = require("cors");
var pgp = require('pg-promise')(/* options */)
const cn = {
  host: process.env.host, // server name or IP address;
  port: process.env.port,
  database: process.env.database,
  user: process.env.user,
  password: process.env.password
};

var db = pgp(cn)


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await db.any(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await db.any("SELECT * FROM todo");
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db.any("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await db.any(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    db.any("DELETE FROM todo WHERE todo_id = $1", [
      id
    ]);
    res.send("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/", async (req, res) => {
  try {
    res.send("Home Page Test")
  }catch (err) {
         console.error(err.message);
       }
  });

app.listen(8080, () => {
    console.log("server has started on port 8080");
}); 

