module.exports = function (app, redFabric) {

    /**
     * GET Peers
     */
    app.get("/getpeers", function (req, res) {
        var nodos = redFabric.getPeers();
        res.send({nodos});
    });

    /**
     * GET Orgs
     */
    app.get("/getorgs", function (req, res) {
        var orgs = redFabric.getOrgs();
        res.send({orgs});
    });


};