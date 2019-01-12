const request = require('request');
const server = require('../../app');

const endpoint = 'http://localhost:3000/weather';

describe('weather', function () {

    let longitude = -71.0589;
    let latitide = 42.3601;
    let uri = `${endpoint}/${longitude}/${latitide}`;

    it('should return 200 response code', function (done) {
        request.get(uri, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should return 500 response code', function (done) {
        request.get(uri + 'bad-test', function (error, response) {
            expect(response.statusCode).toEqual(500);
            done();
        });
    });

    it('should fail on POST', function (done) {
        request.post(uri, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });
});