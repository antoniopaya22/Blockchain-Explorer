module.exports = function (app, redFabric) {

    /**
     * GET Orgs
     */
    app.get("/getOrgs", function (req, res) {
        redFabric.getOrgs().then(function (orgs) {
            res.send(orgs);
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });


};