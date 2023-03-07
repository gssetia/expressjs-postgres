import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
const cors = require('cors');

// Connect to the database using the DATABASE_URL environment
//   variable injected by Railway
const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors({
	origin:"*",
}));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM brainmapperdata");
//   res.send(`Hello, World! The time from the DB is ${rows}`);
// Output all the data as a json to be grabbed by the api
  res.json(rows)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
