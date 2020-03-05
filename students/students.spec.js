const request = require("supertest");
const server = require("../api/server.js");

const db = require("../database/dbConfig");

describe('students router', function() {
    it('should return status 401 without admin login', function() {
        return request(server)
            .get('/api/students')
            .then(res => {
                expect(res.status).toBe(401);
            })
    })
})