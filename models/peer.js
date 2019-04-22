module.exports = class Peer{

    constructor(
        mspid,
        signature,
        name
    ) {
       this.mspid = mspid;
       this.signature = signature;
       this.name = name;
    }
}