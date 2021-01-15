const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");

app.use(express.json());

app.use(cors());

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/matches", require("./api/v1/matches"));
// app.use("/api/v1/questions", require("./api/v1/questions"));
app.use("/api/v1/questions1", require("./api/v1/questions1"));
app.use("/api/v1/questions2", require("./api/v1/questions2"));
app.use("/api/v1/user-answers", require("./api/v1/user-answers"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3046;

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});
