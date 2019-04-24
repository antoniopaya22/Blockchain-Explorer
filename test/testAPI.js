let chai = require('chai');
let mocha = require('mocha');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let should = chai.should();
chai.use(chaiHttp);
const url= 'http://localhost:8090';

mocha.describe('Prueba las rutas de bloques: ',function () {
    this.timeout(5000);

    it('Get last block', (done) => {
        chai.request(url)
            .get('/lastblock')
            .end( function(err,res){
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('number');
                res.body.should.have.property('prevHash');
                res.body.should.have.property('dataHash');
                res.body.should.have.property('channel');
                res.body.should.have.property('timestamp');
                res.body.should.have.property('txid');
                res.body.should.have.property('org');
                done();
            });
    });  

    it('Get block by num', (done) => {
        chai.request(url)
            .get('/get/0')
            .end( function(err,res){
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('number');
                res.body.should.have.property('prevHash');
                res.body.should.have.property('dataHash');
                res.body.should.have.property('channel');
                res.body.should.have.property('timestamp');
                res.body.should.have.property('txid');
                res.body.should.have.property('org');
                done();
            });
    }); 

    it('Get allBlocks', (done) => {
        chai.request(url)
            .get('/allBlocks')
            .end( function(err,res){
                expect(res).to.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    }); 

    it('Get all info block', (done) => {
        chai.request(url)
            .get('/allInfoBlock/0')
            .end( function(err,res){
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    }); 
});

mocha.describe('Prueba las rutas de orgs: ',function () {
    this.timeout(5000);

    it('Get peers', (done) => {
        chai.request(url)
            .get('/getpeers')
            .end( function(err,res){
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('nodos');
                done();
            });
    }); 
});
