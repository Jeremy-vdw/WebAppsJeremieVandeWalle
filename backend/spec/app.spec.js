let Request = require('request');
describe("server", () => {
    let server;
    let summaryId;
    beforeAll(() =>{
        server = require('../app');
    });

    describe("POST /api/summaries", () => {
        let data = {};
        beforeAll((done)=> {
            Request({
                method: 'POST',
                uri: 'http://localhost:3000/api/summaries/',
                json: true,
                body: {
                    "name": "TestSummary",
                    "link": "AnalyseI.pdf",
                    "academicYear": {
                      "_id": "5a2302f64bfba31a30dbfdfc",
                      "name": "2017 - 2018"
                    },
                    "course": {
                      "_id": "5a231ed6b1adde1dfefd223b",
                      "courseName": "Analyse I",
                      "courseYear": "1TIN"
                    },
                    "comments": [],
                    "ratings": []
                  }},
                (error, response, body) =>  {
                    data.status = response.statusCode;
                    data.body = body;
                    summaryId = data.body._id;
                    done();
                }
            ).auth(null,null,true,process.env.VALID_TOKEN);
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        })
        it("check summary body", () => {
            expect(data.body.name).toBe("TestSummary");
            expect(data.body.link).toBe("AnalyseI.pdf");
            expect(data.body.academicYear).toBe("5a2302f64bfba31a30dbfdfc");
            expect(data.body.course).toBe("5a231ed6b1adde1dfefd223b");
            expect(data.body.comments.length).toBe(0);
            expect(data.body.ratings.length).toBe(0);
        })
    });

    describe("GET /api/summmary/", () => {
        let data = {};
        beforeAll((done) => {
            Request.get(`http://localhost:3000/api/summary/${summaryId}`, (error, 
            response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            })});
            it("status 200", () => {
                expect(data.status).toBe(200);
            })
            it("check summary", () => {
                expect(data.body.name).toBe("TestSummary");
                expect(data.body.link).toBe("AnalyseI.pdf");
                expect(data.body.course._id).toBe("5a231ed6b1adde1dfefd223b");
                expect(data.body.academicYear._id).toBe("5a2302f64bfba31a30dbfdfc");
                expect(data.body.comments.length).toBe(0);
                expect(data.body.ratings.length).toBe(0);
            })
    });
    describe("DELETE /api/summary/", () => {
        let data = {};
        beforeAll((done) => {
            Request.delete(`http://localhost:3000/api/summary/${summaryId}`, (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            }).auth(null,null,true,process.env.VALID_TOKEN);
        });
        it("status 200", () => {
          expect(data.status).toBe(200);
        })
        it("check summary", () => {
            expect(data.body.name).toBe("TestSummary");
            expect(data.body.link).toBe("AnalyseI.pdf");
            expect(data.body.course._id).toBe("5a231ed6b1adde1dfefd223b");
            expect(data.body.academicYear._id).toBe("5a2302f64bfba31a30dbfdfc");
            expect(data.body.comments.length).toBe(0);
            expect(data.body.ratings.length).toBe(0);
        })
    });
});