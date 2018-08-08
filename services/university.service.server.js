module.exports = function (app) {
    app.get('/api/university', findAllUniversities);

    var universityModel = require('../models/university/university.model.server');

    function findAllUniversities(req, res) {
        universityModel.findAllUniversities()
            .then(function (universities) {
                res.send(universities);
            })
    }
}