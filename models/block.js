module.exports = class Block{

    constructor(
        number,
        prevHash,
        dataHash,
        channel,
        timestamp,
        txid,
        org
    ) {
        this.number = number;
        this.prevHash = prevHash;
        this.dataHash = dataHash;
        this.channel = channel;
        this.timestamp = timestamp;
        this.txid = txid;
        this.org = org;
    }
}