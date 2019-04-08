module.exports = function (app, redFabric, swig) {

    app.get("/", function (req, res) {
        redFabric.getNumBlocks().then(function (numBlocks) {
            redFabric.getAllBlocks().then(function (blocks) {
                res.send(swig.renderFile('views/home.html', {
                    title: 'ArcelorMittal Blockchain Dashboard',
                    numBlocks: numBlocks.toString(),
                    peers: redFabric.getPeers(),
                    blocks: blocks,
                    times: blocks.map(x => x.timestamp)
                }));
            }).catch(err => {
                res.status(500).send("Vaya por dios: " + err);
            });
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });
};