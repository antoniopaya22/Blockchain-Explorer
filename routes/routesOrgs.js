module.exports = function (app, redFabric) {

    /**
     * GET Orgs
     */
    app.get("/getOrgs", function (req, res) {
        res.send(redFabric.getPeers());
    });


};