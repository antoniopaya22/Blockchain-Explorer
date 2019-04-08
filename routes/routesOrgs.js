module.exports = function (app, redFabric) {

    /**
     * GET Peers
     */
    app.get("/getpeers", function (req, res) {
        var nodos = redFabric.getPeers();
        res.send({nodos});
    });


};