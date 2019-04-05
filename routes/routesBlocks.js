module.exports = function (app, redFabric) {

    /**
     * GET HomePage
     */
    app.get("/", function (req, res) {
        redFabric.getNumBlocks().then(function (numBlocks) {
            res.render('index', {
                title: 'Express',
                numBlocks: numBlocks
            });
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });

};