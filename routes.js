module.exports = function(app) {


    app.get("/", async function ( _ , res) {
        res.render("index", {name: process.env.NAME, current_time: Date.now()})
    })

    return app;
}