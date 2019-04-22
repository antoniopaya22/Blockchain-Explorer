var Peer = require('../models/peer.js');
var Data = require('../models/data.js');

module.exports = class Transaction{

    constructor(
        channel,
        timestamp,
        creator,
        chaincode,
        data,
    ) {
        this.channel = channel;
        this.timestamp = timestamp;
        this.creator = new Peer(creator.Mspid,creator.IdBytes,JSON.parse(data[0].value).node);
        this.chaincode = chaincode;
        this.data = new Data(
            data[0].key,
            JSON.parse(data[0].value).temperature,
            JSON.parse(data[0].value).hour,
            JSON.parse(data[0].value).gps,
            JSON.parse(data[0].value).device,
            JSON.parse(data[0].value).node
            );
        this.isDelete = Boolean.valueOf(data[0].is_delete);
    }
}