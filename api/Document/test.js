"use strice"

const frisby = require('frisby')

const URL = "http://localhost:3983"

describe('Document routes tester', () => {

    it("/POST Create new Document", () => {
        return frisby
            .post(`${URL}/Document`)
            .expectNot("status", 500);
    });

    it("/GET get all Document", () => {
        return frisby
            .get(`${URL}/Document`)
            .expectNot("status", 500)
    });

    it("/GET/id Show specify Document", () => {
        return frisby
            .get(`${URL}/Document/1`)
            .expectNot("status", 500)
    });

    it("/PUT/id Modify specify Document", () => {
        return frisby
            .put(`${URL}/Document/1`)
            .expectNot("status", 500)
    });

    it("/DELETE/id Delete specify Document", () => {
        return frisby
            .del(`${URL}/Document/1`)
            .expectNot("status", 500)
    });

});