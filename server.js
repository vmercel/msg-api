const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

let Messages = require("./database/Messages.json");


const app = express();

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const saveMessage = () => {
  fs.writeFile(
    "./database/Messages.json",
    JSON.stringify(Messages, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

app.get("/messages", (req, res) => {
  res.json(Messages);
});

app.get("/messages/:id", (req, res) => {
  const findPost = Messages.find((post) => post.id === req.params.id);
  if (!findPost) {
    res.status(404).send("message with id was not found");
  } else {
    res.json(findPost);
  }

});

app.get("/messages/owner/:owner", (req, res) => {
  const findPost = Messages.filter((post) => post.owner === req.params.owner);
  if (!findPost) {
    res.status(404).send("message with id was not found");
  } else {
    res.json(findPost);
  }

});

app.post("/messages", bodyParser.json(), (req, res) => {
  Messages.push(req.body);
  saveMessage();
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

app.put("/messages/:id", bodyParser.json(), (req, res) => {

  Messages = Messages.map((post) => {
    if (post.id === req.params.id) {
      return req.body;
    } else {
      return post;
    }
  });
  saveMessage();

  res.json({
    status: "success",
    stateInfo: req.body,
  });
  //   }
});

app.delete("/messages/:id", (req, res) => {
  Messages = Messages.filter((post) => post.id !== req.params.id);
  saveMessage();
  res.json({
    status: "success",
    removed: req.params.id,
    newLength: Messages.length,
  });
});





app.listen(3000, () => {
  console.log(`Mercel Blog API is running at http://localhost:3000`);
});