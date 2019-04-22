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
        this.creator = new Peer(creator.Mspid,creator.IdBytes,data.value.node);
        this.chaincode = chaincode;
        this.data = new Data(
            data.key,
            data.value.temperature,
            data.value.hour,
            data.value.gps,
            data.value.device,
            data.value.node
            );
        this.isDelete = Boolean.valueOf(data.is_delete);
    }
}