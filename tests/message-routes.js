const { Router } = require("express");
const { saveMessage } = require("../controllers/save_message_json");

let Messages = require("../database/Messages.json");


const messageRouter = new Router();

messageRouter.get("/", (req, res) => {
  res.json(Messages);
});

messageRouter.get("/:id", (req, res) => {
  const findPost = Messages.find((post) => post.id === req.params.id);
  if (!findPost) {
    res.status(404).send("Message with id was not found");
  } else {
    res.json(findPost);
  }
});

messageRouter.post("/", (req, res) => {
  Messages.push(req.body);
  saveMessage(Messages);
  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

messageRouter.put("/:id", (req, res) => {

  Messages = Messages.map((post) => {
    if (post.id === req.params.id) {
      return req.body;
    } else {
      return post;
    }
  });
  saveMessage(Messages);

  res.json({
    status: "success",
    stateInfo: req.body,
  });
});

messageRouter.delete("/:id", (req, res) => {
  Messages = Messages.filter((post) => post.id !== req.params.id);
  saveMessage(Messages);
  res.json({
    status: "success",
    removed: req.params.id,
    newLength: Messages.length,
  });
});



module.exports = messageRouter;
