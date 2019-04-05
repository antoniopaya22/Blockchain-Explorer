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

    /**
     * GET LastBlock
     */
    app.get("/lastblock", function (req, res) {
        redFabric.getLastBlock().then(function (block) {
            var block = {
                "number":block.header.number,
                "prevHash":block.header.previous_hash,
                "dataHash":block.header.data_hash,
                "channel":block.data.data[0].payload.header.channel_header.channel_id,
                "timestamp":block.data.data[0].payload.header.channel_header.timestamp,
                "txid":block.data.data[0].payload.header.channel_header.tx_id
            }
            res.send(block);
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });


};