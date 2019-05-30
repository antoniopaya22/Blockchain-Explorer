module.exports = function (app, redFabric, createError) {

    /**
     * GET Transaction
     */
    app.get("/getTransaction/:id", function (req, res) {
        redFabric.getTranstaction(req.params.id).then(function (transaction) {
            res.send(transaction);
        }).catch(err => {
            next(createError(500));
        });
    });


};