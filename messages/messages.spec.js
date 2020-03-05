const request = require("supertest");
const server = require("../api/server.js");

const Messages = require("./messages-model");
const Users = require("../users/users-model");

describe("messages router", function() {
  it("should return status 403 without admin login", function() {
    return request(server)
      .get("/api/messages")
      .then(res => {
        expect(res.status).toBe(403);
      });
  });
});

describe("add", function() {
    it("adds a message", async function() {
      const newMessage = await Messages.add({
        name: "testMessage",
        message: "a test message",
        student_id: 1,
        professor_id: 2
      });
      expect(newMessage.name).toBe("testMessage");
    });
  });
