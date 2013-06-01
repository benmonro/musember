module.exports = {
    development: {
        port: process.env.PORT || 8081,
        root: require("path").normalize(__dirname + "/.."),
        app: {
            name: "Musember"
        }
    },
    production: {

    }
}