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
     * GET Block by num
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
        redFabric.getAllBlocks().then(function (blocks) {
            res.send(blocks);
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });

    app.get("/allInfoBlock/:num", function (req, res) {
        redFabric.getAllInfoBlock(parseInt(req.params.num)).then(function (blocks) {
            res.send(blocks);
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });

};