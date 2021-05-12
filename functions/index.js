'use strict';

/**
 * @typedef Coordinate
 * @type {object}
 * @property latitude: number
 * @property longitude: number
 */

/**
 * @type {Object<number, Coordinate>}
 */
let coords = {};
/**
 * @param req {e.Request}
 * @param res {e.Response}
 */
exports.shuttle = (req, res) => {
    // TODO - verify authenticity of sender: https://cloud.google.com/api-gateway/docs/quickstart-console#securing_access_by_using_an_api_key
    const {id} = req.query;
    switch (req.method) {
        case 'GET':
            getShuttle(req, res, id);
            break;
        case 'POST':
            postShuttle(req, res, id);
            break;
        default:
            res.status(405).send({error: 'Something blew up!'});
            break;
    }
};

/**
 * @param req {e.Request}
 * @param res {e.Response}
 * @param id {number}
 */
function getShuttle(req, res, id) {
    let coordData = coords[id];
    if (coordData) {
        res.status(200)
            .header("Access-Control-Allow-Origin", "*")
            .send({
                latitude: coordData.latitude,
                longitude: coordData.longitude
            });
    } else {
        res.status(503)
            .header("Access-Control-Allow-Origin", "*")
            .send('Location data not available');
    }
}

/**
 * @param req {e.Request}
 * @param res {e.Response}
 * @param id {number}
 */
function postShuttle(req, res, id) {
    coords[id] = req.body;
    res.status(200)
        .header("Access-Control-Allow-Origin", "*")
        .send('Success!');
}
