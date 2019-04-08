module.exports = function (app, redFabric, swig) {

    app.get("/", function (req, res) {
        redFabric.getNumBlocks().then(function (numBlocks) {
            redFabric.getAllBlocks().then(function (blocks) {
                var times = blocks.map(x => x.timestamp);
                var charTimes = [];
                times.forEach(t => {
                    var date = new Date(t.toString());
                    var formattedTime = date.getDay() + '/' + date.getMonth();
                    var exist = false;
                    for (let i = 0; i < charTimes.length; i++) {
                        const e = charTimes[i];
                        if(e.time === formattedTime) {
                            exist = true;
                            charTimes[i].count = charTimes[i].count+1;
                        }
                    }
                    if(!exist) charTimes.push({time:formattedTime,count:1});
                });
                times = ["29/2"];
                counts = [1];
                charTimes.forEach(x => times.push(x.time));
                charTimes.forEach(x => counts.push(x.count));
                res.send(swig.renderFile('views/home.html', {
                    title: 'ArcelorMittal Blockchain Dashboard',
                    numBlocks: numBlocks.toString(),
                    peers: redFabric.getPeers(),
                    blocks: blocks,
                    times: times,
                    counts: counts
                }));
            }).catch(err => {
                res.status(500).send("Vaya por dios: " + err);
            });
        }).catch(err => {
            res.status(500).send("Vaya por dios: " + err);
        });
    });
};