module.exports = function (app, redFabric) {

    /**
     * GET Orgs
     */
    app.get("/getpeers", function (req, res) {
        var peers = redFabric.getPeers();
        res.send({
            peers: peers
        });
    });


};