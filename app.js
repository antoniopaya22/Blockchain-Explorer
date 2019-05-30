'use strict';
/**
 *
 *    ===========================================================================
 *    Aplicacion realizada en NodeJS que se conecta con una red Hyperledger Fabric
 *    para mostrar el estado de la red
 *    ======================
 *    @author Antonio Paya
 *
 */
//==========MODULOS===============
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const RedFabric = require("./modules/redFabric");
var swig = require('swig');


//==========VARIABLES===============
app.set('port', 8090);
app.set('views', path.join(__dirname, 'views'));
let redFabric = new RedFabric("user1");

//==========INICIACION=============
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//==========RUTAS================
require("./routes/routesViews.js")(app, redFabric, swig, createError);
require("./routes/routesBlocks.js")(app, redFabric);
require("./routes/routesTransactions.js")(app, redFabric, createError);
require("./routes/routesOrgs.js")(app, redFabric);
app.get('/', function (req, res) {
  res.redirect("/home");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  var message = err.message;
  var error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  var respuesta = swig.renderFile('views/error.html', {
    message: message,
    error: error,
  });
  res.send(respuesta);
});


//===========RUN===============
// Lanza el servidor
redFabric.init().then(() => {
    app.listen(app.get("port"), function () {
        console.log("===================================");
        console.log("Hyperledger Fabric Explorer");
        console.log("===================================");
        console.log("Autor: Antonio Paya Gonzalez");
        console.log("Servidor activo en el puerto: " + app.get("port"));
    });
}).catch(err => {
    console.log("Error al conectarse con la blockchain");
});
