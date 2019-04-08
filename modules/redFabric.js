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
                return  {
                    "number":block.header.number,
                    "prevHash":block.header.previous_hash,
                    "dataHash":block.header.data_hash,
                    "channel":block.data.data[0].payload.header.channel_header.channel_id,
                    "timestamp":block.data.data[0].payload.header.channel_header.timestamp,
                    "txid":block.data.data[0].payload.header.channel_header.tx_id
                }
            });
        });
    }

    getBlockByNum(num){ 
        var channel = this.client.getChannel();
        return channel.queryBlock(num).then(function (block){
            return  {
                "number":block.header.number,
                "prevHash":block.header.previous_hash,
                "dataHash":block.header.data_hash,
                "channel":block.data.data[0].payload.header.channel_header.channel_id,
                "timestamp":block.data.data[0].payload.header.channel_header.timestamp,
                "txid":block.data.data[0].payload.header.channel_header.tx_id
            }
        });
    }

    getAllInfoBlock(num){
        var channel = this.client.getChannel();
        return channel.queryBlock(num).then(function (block){
            return  block;
        });
    }

    getBlockGenesis(){ 
        var channel = this.client.getChannel();
        return channel.getGenesisBlock().then(function (block){
            return  block;
        });
    }

    getTranstaction(txId) {
        var channel = this.client.getChannel();
        return channel.queryTransaction(txId).then(function (transaction){
            return  {
                "channel":transaction.transactionEnvelope.payload.header.channel_header.channel_id,
                "timestamp":transaction.transactionEnvelope.payload.header.channel_header.timestamp,
                "creator":transaction.transactionEnvelope.payload.header.signature_header.creator,
                "chaincode":transaction.transactionEnvelope.payload.data.actions[0].payload.action.proposal_response_payload.
                extension.chaincode_id.name,
                "data":transaction.transactionEnvelope.payload.data.actions[0].payload.action.proposal_response_payload.
                extension.results.ns_rwset[1].rwset.writes
            };
        });
    }

    getPeers() {
        var channel = this.client.getChannel();
        var peers = channel.getPeers();
        var nodos = [];
        for (let i = 0; i < peers.length; i++) {
            const peer = peers[i];
            nodos.push({
                "mspid": peer.getMspid(),
                "name": peer.getName() 
            });
        }
        return nodos;
    }

    getAllBlocks() {
        var blocks = [];
        var promises = [];
        var fabric = this;
        return this.getNumBlocks().then(start => {
            var i = 0;
            while(i < start){
                promises.push(new Promise((resolve, reject) => {
                    fabric.getBlockByNum(i).then(block => {
                        resolve(block);
                    });
                }));
                i++;
            }
            return Promise.all(promises).then(values => { 
                for(var j = 0; j < values.length; j++){
                    blocks.push(values[j]);
                }
                return blocks;
            }).catch(reason => { 
                console.log(reason)
            });
        })
    }

    getBlocksBt(start) {
        var blocks = [];
        var promises = [];
        var i = start;
        while(i > start-5 && i>=0){
            promises.push(new Promise((resolve, reject) => {
                this.getBlockByNum(i).then(block => {
                    resolve(block);
                });
            }));
            i--;
        }
        return Promise.all(promises).then(values => { 
            for(var j = 0; j < values.length; j++){
                blocks.push(values[j]);
            }
            return blocks;
        }).catch(reason => { 
            console.log(reason)
        });
    }

}

module.exports = RedFabric;

