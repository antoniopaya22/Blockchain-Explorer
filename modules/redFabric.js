'use strict';
var fabricClient = require('../config/FabricClient.js');

class RedFabric {

    constructor(user) {
        this.currentUser;
        this.issuer;
        this.userName = user;
        this.client = fabricClient;
    }

    init() {
        var isUser1 = false;
        if (this.userName == "user1") {
            isUser1 = true;
        }
        return this.client.initCredentialStores().then(() => {
            return this.client.getUserContext(this.userName, true);
        }).then((user) => {
            this.issuer = user;
            if (isUser1) {
                return user;
            }
            return this.ping();
        }).then((user) => {
            this.currentUser = user;
            return user;
        });
    }

    getNumBlocks() {
        var channel = this.client.getChannel();
        var peer = this.client.getPeersForOrg()[0];
        return channel.queryInfo(peer).then(function (blockchainInfo) {
            return blockchainInfo.height;
        });
    }

    getLastBlock() {
        var channel = this.client.getChannel();
        var peer = this.client.getPeersForOrg()[0];
        return channel.queryInfo(peer).then(function (blockchainInfo) {
            return channel.queryBlockByHash(blockchainInfo.currentBlockHash).then(function (block) {
                return block;
            });
        });
    }

}

module.exports = RedFabric;

