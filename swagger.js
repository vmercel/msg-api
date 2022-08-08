const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        version: "1.0.0",
        title: "Msg API",
        description: "Blog API."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "Messages",
            "description": "Messages endpoints"
        },

    ],
    

        MessageModel: {
            $id: "1001",
            $subject: "Message Subject",
            $content: "Elon Musk Admits He Wants to Travel to Mars Because No One Hates Him There Yet",
            $isRead: false,
            $owner: "Mercel"
        }
    
};

const outputFile = "./swagger_output.json";
const endpointFiles = ["./routes/message-routes.js"];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require("./routes/message-routes.js");
});