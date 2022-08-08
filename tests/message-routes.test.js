const express = require("express"); // import express
const messageRoutes = require("../routes/message-routes"); //import file we are testing
const { saveMessage } = require("../controllers/save_message_json");
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const bodyParser = require("body-parser");

jest.mock("../controllers/save_message_json", () => ({
  saveMessage: jest.fn(),
}));

jest.mock("../database/Messages.json", () => [
{
      "id": "1",
      "subject": "Hello Friend",
      "content": "Hello friend, where you been so long?  Time goes by, so easy it sleeps away  Just like a shadow at the end of the day Hello friend, how are things for you these days? Some guy from way-back-when, he mentioned your name Did he ever get back to you? Ah, you know I told him to",
      "isRead": true,
      "owner": "Demo"
  },
  {
      "id": "2",
      "subject": "Me Again",
      "content": "From the outside looking in, Rich Chaplin (David A.R. White) has everything that any Pastor and family man could ever want. In reality he has lost sight of everything that matters the most, including his family. When he wishes for a life other than his own, he suddenly finds himself trapped within the lives of everyone his apathy has affected.",
      "isRead": false,
      "owner": "Demo"
  },
]); //callback function with mock data

const app = express(); //an instance of an express // a fake express app
app.use(bodyParser.json()); //this made it work
app.use("/messages", messageRoutes); //



describe("testing-message-routes", () => {
  it("GET /messages - success", async () => {
    const { body } = await request(app).get("/messages"); //use the request function that we can use the app// save the response to body variable
    expect(body).toEqual([
{
      "id": "1",
      "subject": "Hello Friend",
      "content": "Hello friend, where you been so long?  Time goes by, so easy it sleeps away  Just like a shadow at the end of the day Hello friend, how are things for you these days? Some guy from way-back-when, he mentioned your name Did he ever get back to you? Ah, you know I told him to",
      "isRead": true,
      "owner": "Demo"
  },
  {
      "id": "2",
      "subject": "Me Again",
      "content": "From the outside looking in, Rich Chaplin (David A.R. White) has everything that any Pastor and family man could ever want. In reality he has lost sight of everything that matters the most, including his family. When he wishes for a life other than his own, he suddenly finds himself trapped within the lives of everyone his apathy has affected.",
      "isRead": false,
      "owner": "Demo"
  },
    ]);
    firstPost = body[0];
    // console.log(firstPost);
  });
  it("GET /messages/1 - succes", async () => {
    const { body } = await request(app).get(`/messages/${firstPost.id}`);
    expect(body).toEqual(firstPost);
  });

  it("POST /messages - success", async () => {
    let stateObj =   {
      "id": "3",
      "subject": "How far?",
      "content": "This unforgettable journey brings Rich to view life through the eyes of a diverse cast of characters including an elderly woman (Della Reese), a top fashion model (Logan White), his own wife (Ali Landry) and even a goldfish! It might even take an encounter with a strangely familiar angel, (Bruce McGill) to help him realize that he is wasting his chance to love and impact the most important people in his life. Join Rich as he finds himself on a wild and hilarious ride that will change his life forever.",
      "isRead": true,
      "owner": "Demo"
  };
    const { body } = await request(app).post("/messages").send(stateObj);
    expect(body).toEqual({
      status: "success",
      stateInfo:   {
      "id": "3",
      "subject": "How far?",
      "content": "This unforgettable journey brings Rich to view life through the eyes of a diverse cast of characters including an elderly woman (Della Reese), a top fashion model (Logan White), his own wife (Ali Landry) and even a goldfish! It might even take an encounter with a strangely familiar angel, (Bruce McGill) to help him realize that he is wasting his chance to love and impact the most important people in his life. Join Rich as he finds himself on a wild and hilarious ride that will change his life forever.",
      "isRead": true,
      "owner": "Demo"
  },
    });
    expect(saveMessage).toHaveBeenCalledWith([
{
      "id": "1",
      "subject": "Hello Friend",
      "content": "Hello friend, where you been so long?  Time goes by, so easy it sleeps away  Just like a shadow at the end of the day Hello friend, how are things for you these days? Some guy from way-back-when, he mentioned your name Did he ever get back to you? Ah, you know I told him to",
      "isRead": true,
      "owner": "Demo"
  },
  {
      "id": "2",
      "subject": "Me Again",
      "content": "From the outside looking in, Rich Chaplin (David A.R. White) has everything that any Pastor and family man could ever want. In reality he has lost sight of everything that matters the most, including his family. When he wishes for a life other than his own, he suddenly finds himself trapped within the lives of everyone his apathy has affected.",
      "isRead": false,
      "owner": "Demo"
  },
  {
      "id": "3",
      "subject": "How far?",
      "content": "This unforgettable journey brings Rich to view life through the eyes of a diverse cast of characters including an elderly woman (Della Reese), a top fashion model (Logan White), his own wife (Ali Landry) and even a goldfish! It might even take an encounter with a strangely familiar angel, (Bruce McGill) to help him realize that he is wasting his chance to love and impact the most important people in his life. Join Rich as he finds himself on a wild and hilarious ride that will change his life forever.",
      "isRead": true,
      "owner": "Demo"
  },
    ]);
    expect(saveMessage).toHaveBeenCalledTimes(1);
  });
  it("PUT /messages/1 - success", async () => {
    let stateObj = {
      "id": "1",
      "subject": "Hello Friend",
      "content": "Hello friend, where you been so long?  Time goes by, so easy it sleeps away  Just like a shadow at the end of the day Hello friend, how are things for you these days? Some guy from way-back-when, he mentioned your name Did he ever get back to you? Ah, you know I told him to",
      "isRead": true,
      "owner": "Demo"
  };
    const response = await request(app).put("/messages/1").send(stateObj);
    expect(response.body).toEqual({
      status: "success",
      stateInfo: {
      "id": "1",
      "subject": "Hello Friend",
      "content": "Hello friend, where you been so long?  Time goes by, so easy it sleeps away  Just like a shadow at the end of the day Hello friend, how are things for you these days? Some guy from way-back-when, he mentioned your name Did he ever get back to you? Ah, you know I told him to",
      "isRead": true,
      "owner": "Demo"
  },
    });
    expect(saveMessage).toHaveBeenCalledWith([
{
      "id": "1",
      "subject": "Hello Friend",
      "content": "Hello friend, where you been so long?  Time goes by, so easy it sleeps away  Just like a shadow at the end of the day Hello friend, how are things for you these days? Some guy from way-back-when, he mentioned your name Did he ever get back to you? Ah, you know I told him to",
      "isRead": true,
      "owner": "Demo"
  },
  {
      "id": "2",
      "subject": "Me Again",
      "content": "From the outside looking in, Rich Chaplin (David A.R. White) has everything that any Pastor and family man could ever want. In reality he has lost sight of everything that matters the most, including his family. When he wishes for a life other than his own, he suddenly finds himself trapped within the lives of everyone his apathy has affected.",
      "isRead": false,
      "owner": "Demo"
  },
  {
      "id": "3",
      "subject": "How far?",
      "content": "This unforgettable journey brings Rich to view life through the eyes of a diverse cast of characters including an elderly woman (Della Reese), a top fashion model (Logan White), his own wife (Ali Landry) and even a goldfish! It might even take an encounter with a strangely familiar angel, (Bruce McGill) to help him realize that he is wasting his chance to love and impact the most important people in his life. Join Rich as he finds himself on a wild and hilarious ride that will change his life forever.",
      "isRead": true,
      "owner": "Demo"
  },
    ]);
    expect(response.statusCode).toEqual(200);
  });
  it("DELETE /messages/1 - success", async () => {
    const { body } = await request(app).delete("/messages/1");
    expect(body).toEqual({
      status: "success",
      removed: "1",
      newLength: 2,
    });
    expect(saveMessage).toHaveBeenCalledWith([
  {
      "id": "2",
      "subject": "Me Again",
      "content": "From the outside looking in, Rich Chaplin (David A.R. White) has everything that any Pastor and family man could ever want. In reality he has lost sight of everything that matters the most, including his family. When he wishes for a life other than his own, he suddenly finds himself trapped within the lives of everyone his apathy has affected.",
      "isRead": false,
      "owner": "Demo"
  },
  {
      "id": "3",
      "subject": "How far?",
      "content": "This unforgettable journey brings Rich to view life through the eyes of a diverse cast of characters including an elderly woman (Della Reese), a top fashion model (Logan White), his own wife (Ali Landry) and even a goldfish! It might even take an encounter with a strangely familiar angel, (Bruce McGill) to help him realize that he is wasting his chance to love and impact the most important people in his life. Join Rich as he finds himself on a wild and hilarious ride that will change his life forever.",
      "isRead": true,
      "owner": "Demo"
  },
    ]);
  });
});




