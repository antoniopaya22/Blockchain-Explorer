let chai = require('chai');
let mocha = require('mocha');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let should = chai.should();
chai.use(chaiHttp);
const url= 'http://localhost:8090';

mocha.describe('Buscar bloques tests: ',function () {
    this.timeout(5000);

    it('Buscar el ultimo bloque', (done) => {
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

    it('Buscar bloque existente por su numero', (done) => {
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

    it('Buscar bloque no existente por su numero', (done) => {
        chai.request(url)
            .get('/get/0121212121212121212112121212')
            .end( function(err,res){
                expect(res).to.have.status(500);
                done();
            });
    }); 

    it('Buscar todos los bloques', (done) => {
        chai.request(url)
            .get('/allBlocks')
            .end( function(err,res){
                expect(res).to.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    }); 

    it('Buscar toda la informacion de un bloque existente dado su numero', (done) => {
        chai.request(url)
            .get('/allInfoBlock/0')
            .end( function(err,res){
                expect(res).to.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    }); 

    it('Buscar toda la informacion de un bloque no existente dado su numero', (done) => {
        chai.request(url)
            .get('/allInfoBlock/0121212121212121212112121212')
            .end( function(err,res){
                expect(res).to.have.status(500);
                done();
            });
    }); 

    it('Buscar todos los nodos', (done) => {
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
