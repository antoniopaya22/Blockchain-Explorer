module.exports = function (app, redFabric) {

    /**
     * GET Orgs
     */
    app.get("/getpeers", function (req, res) {
        var peers = redFabric.getPeers();
        console.log(peers);
        var temp = [];
        for (let i = 0; i < peers.length; i++) {
            const peer = peers[i];
            temp.push({
                "mspid": peer.getMspid(),
                "name": peer.getName() 
            });
        }
        res.send({
            peers: peers
        });
    });


};