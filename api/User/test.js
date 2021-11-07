"use strice"

const frisby = require('frisby')

const URL = "http://localhost:3983"

describe('User routes tester', () => {

    it("/POST Create new User", () => {
        return frisby
            .post(`${URL}/User`)
            .expectNot("status", 500);
    });

    it("/GET get all User", () => {
        return frisby
            .get(`${URL}/User`)
            .expectNot("status", 500)
    });

    it("/GET/id Show specify User", () => {
        return frisby
            .get(`${URL}/User/1`)
            .expectNot("status", 500)
    });

    it("/PUT/id Modify specify User", () => {
        return frisby
            .put(`${URL}/User/1`)
            .expectNot("status", 500)
    });

    it("/DELETE/id Delete specify User", () => {
        return frisby
            .del(`${URL}/User/1`)
            .expectNot("status", 500)
    });

});