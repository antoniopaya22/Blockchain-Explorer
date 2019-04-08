module.exports = function (app, redFabric, swig) {

    app.get("/", function (req, res) {
        redFabric.getNumBlocks().then(function (numBlocks) {
            redFabric.getLastBlock().then(function (lastBlock) {
                res.send(swig.renderFile('views/home.html', {
                    title: 'ArcelorMittal Blockchain Dashboard',
                    numBlocks: numBlocks,
                    peers: redFabric.getPeers(),
                    lastBlock: lastBlock
                }));
            }).catch(err => {
                res.status(500).send("Vaya por dios: " + err);
            });
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });
};