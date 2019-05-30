module.exports = function (app, redFabric, swig) {

    app.get("/home", function (req, res) {
        redFabric.getNumBlocks().then(function (numBlocks) {
            redFabric.getAllBlocks().then(function (blocks) {
                var times = blocks.map(x => x.timestamp);
                var charTimes = [];
                times.forEach(t => {
                    var formattedTime = t.toString().split("T")[0];
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
                times = [];
                counts = [];
                charTimes.forEach(x => times.push(x.time.toString()));
                charTimes.forEach(x => counts.push(parseInt(x.count)));
                if(times.length > 5){
                    times = times.slice(-5);
                    counts = counts.slice(-5);
                }
                res.send(swig.renderFile('views/home.html', {
                    title: 'Antonio Blockchain Dashboard',
                    numBlocks: numBlocks.toString(),
                    peers: redFabric.getPeers(),
                    blocks: blocks,
                    times: times,
                    counts: counts,
                    asturias: blocks.filter(x => x.org === "asturiasMSP"),
                    brasil: blocks.filter(x => x.org === "brasilMSP"),
                    chicago: blocks.filter(x => x.org === "chicagoMSP")
                }));
            }).catch(err => {
                var respuesta = swig.renderFile('views/error.html', {
                    message: message,
                    error: err,
                  });
                  res.send(respuesta);
            });
        }).catch(err => {
            var respuesta = swig.renderFile('views/error.html', {
                message: message,
                error: err,
              });
              res.send(respuesta);
        });
    });

    app.get("/bloques", function (req, res) {
        redFabric.getNumBlocks().then(function (numBlocks) {
            var pages = numBlocks%5 == 0 ? parseInt(numBlocks/5) : ((parseInt(numBlocks/5))+1);
            var p = req.query.page;
            if (p === undefined) p = 1;
            var page = (numBlocks-1) - ((p-1)*5);
            redFabric.getBlocksBt(page).then(function (blocks) {
                res.send(swig.renderFile('views/bloques.html', {
                    numBlocks: numBlocks.toString(),
                    peers: redFabric.getPeers(),
                    blocks: blocks,
                    pages: new Array(pages)
                }));
            }).catch(err => {
                var respuesta = swig.renderFile('views/error.html', {
                    message: message,
                    error: err,
                  });
                  res.send(respuesta);
            });
        }).catch(err => {
            var respuesta = swig.renderFile('views/error.html', {
                message: message,
                error: err,
              });
              res.send(respuesta);
        });
    });

    app.get("/buscar", function (req, res) {
        res.send(swig.renderFile('views/buscar.html', {
            
        }));
    });

    app.get("/seeTransaction/:id", function (req, res) {
        redFabric.getTranstaction(req.params.id).then(function (transaction) {
            res.send(swig.renderFile('views/trans.html', {
                id:req.params.id,
                transaction: transaction,
                creator: transaction.creator,
                data: transaction.data,
                isDelete: transaction.isDelete
            }));
        }).catch(err => {
            var respuesta = swig.renderFile('views/error.html', {
                message: message,
                error: err,
              });
              res.send(respuesta);
        });
    });
};