"use strice"

const frisby = require('frisby')

const URL = "http://localhost:3983"

describe('Etat routes tester', () => {

    it("/POST Create new Etat", () => {
        return frisby
            .post(`${URL}/Etat`)
            .expectNot("status", 500);
    });

    it("/GET get all Etat", () => {
        return frisby
            .get(`${URL}/Etat`)
            .expectNot("status", 500)
    });

    it("/GET/id Show specify Etat", () => {
        return frisby
            .get(`${URL}/Etat/1`)
            .expectNot("status", 500)
    });

    it("/PUT/id Modify specify Etat", () => {
        return frisby
            .put(`${URL}/Etat/1`)
            .expectNot("status", 500)
    });

    it("/DELETE/id Delete specify Etat", () => {
        return frisby
            .del(`${URL}/Etat/1`)
            .expectNot("status", 500)
    });

});