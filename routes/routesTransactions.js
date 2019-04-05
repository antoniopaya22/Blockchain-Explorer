module.exports = function (app, redFabric) {

    /**
     * GET Transaction
     */
    app.get("/getTransaction/:id", function (req, res) {
        redFabric.getTranstaction(req.params.id).then(function (transaction) {
            res.send(transaction);
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });


};