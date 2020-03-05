const request = require("supertest");
const server = require("../api/server.js");

const db = require("../database/dbConfig");

describe('messages router', function() {
    it('should return status 403 without admin login', function() {
        return request(server)
            .get('/api/messages')
            .then(res => {
                expect(res.status).toBe(403);
            })
    })
})