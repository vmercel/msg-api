const fs = require("fs");
const path = require("path");

const saveMessage = (Messages) => {
  fs.writeFile(
    path.join(__dirname, ".", "Messages.json"),
    JSON.stringify(Messages, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};


module.exports = { saveMessage };
