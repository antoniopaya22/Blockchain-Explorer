module.exports = function (app, redFabric) {

    /**
     * GET LastBlock
     */
    app.get("/lastblock", function (req, res) {
        redFabric.getLastBlock().then(function (block) {
            res.send(block);
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });


    /**
     * GET LastBlock
     */
    app.get("/get/:num", function (req, res) {
        redFabric.getBlockByNum(parseInt(req.params.num)).then(function (block) {
            res.send(block);
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });

    /**
     * GET GenesisBlock
     */
    app.get("/getGenesis", function (req, res) {
        redFabric.getBlockGenesis().then(function (block) {
            res.send(block);
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });

    app.get("/allBlocks", function (req, res) {
        redFabric.getBlocksBt(8).then(function (blocks) {
            res.send(blocks);
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });

};