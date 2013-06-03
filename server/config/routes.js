var google = require("../routes/google")

module.exports = function(app, config) {
    app.post("/google/auth", google.auth);
    app.post("/share", function(req, res) {
        console.log("got a share");
        console.log(req.body);
        res.send({});
    });
}