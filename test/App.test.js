const app = require('../App');
const expect = require('chai').expect;
const request = require('supertest');

describe('GET/ apps', () => {
    it('returns an array of json data', () => {
        return request(app)
            .get('/apps')
            .query({genres: 'action', sort: 'Rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
              expect(res.body).to.be.an('array');
            })
    });

    it('returns 400 if sort value is incorrect', () => {
        return request(app)
        .get('/apps')
        .query({sort: 'mistake'})
        .expect(400)
    });

    it('should sort by rating', () => {
        return request(app)
        .get('/apps')
        .query({sort: 'Rating'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            let i = 0;
            let sorted = true;
            while (sorted && i < res.body.length) {
                sorted = sorted && res.body[i].Rating > res.body[i + 1].Rating;
                i++;
            }
            expect(sorted).to.be.true;
        });
    });

    it('should filter by genre', () => {
            
    });
})