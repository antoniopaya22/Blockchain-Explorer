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
        this.creator = new Peer(creator.Mspid,creator.IdBytes,data[0].value.node);
        this.chaincode = chaincode;
        this.data = new Data(
            data[0].Key,
            data[0].value.temperature,
            data[0].value.hour,
            data[0].value.gps,
            data[0].value.device,
            data[0].value.node
            );
        this.isDelete = Boolean.valueOf(data.is_delete);
    }
}