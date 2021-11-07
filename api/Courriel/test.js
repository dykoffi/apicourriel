"use strice"

const frisby = require('frisby')

const URL = "http://localhost:3983"

describe('Courriel routes tester', () => {

    it("/POST Create new Courriel", () => {
        return frisby
            .post(`${URL}/Courriel`)
            .expectNot("status", 500);
    });

    it("/GET get all Courriel", () => {
        return frisby
            .get(`${URL}/Courriel`)
            .expectNot("status", 500)
    });

    it("/GET/id Show specify Courriel", () => {
        return frisby
            .get(`${URL}/Courriel/1`)
            .expectNot("status", 500)
    });

    it("/PUT/id Modify specify Courriel", () => {
        return frisby
            .put(`${URL}/Courriel/1`)
            .expectNot("status", 500)
    });

    it("/DELETE/id Delete specify Courriel", () => {
        return frisby
            .del(`${URL}/Courriel/1`)
            .expectNot("status", 500)
    });

});