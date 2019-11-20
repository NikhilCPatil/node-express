let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../app");
let should = chai.should();


chai.use(chaiHttp);
describe('Users', () => {
      it('it should Unauthorized error status of 401', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                  res.should.have.status(401);                
              done();
            });
      });

});