const request = require("supertest");
const server = require("../api/server.js");

const db = require("../database/dbConfig");

describe('tasks router', function() {
    it('should return status 200', function() {
        return request(server)
            .get('/api/tasks')
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})