'use strict';

/**
 * Responds to a GET request with "Hello World!". Forbids a PUT request.
 *
 * @example
 * gcloud functions call helloHttp
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloHttp = (req, res) => {
    switch (req.method) {
        case 'GET':
            res.status(200).send(`Hello World!<p>Your random number is: ${Math.floor(Math.random() * 100)}`);
            break;
        case 'PUT':
            res.status(403).send('Forbidden!');
            break;
        default:
            res.status(405).send({error: 'Something blew up!'});
            break;
    }
};

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
exports.shuttleCoord = (req, res) => {
    // TODO - verify authenticity of sender: https://cloud.google.com/api-gateway/docs/quickstart-console#securing_access_by_using_an_api_key
    const {id} = req.query;
    switch (req.method) {
        case 'GET':
            getShuttleCoord(req, res, id);
            break;
        case 'POST':
            postShuttleCoord(req, res, id);
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
function getShuttleCoord(req, res, id) {
    let coordData = coords[id];
    if (coordData) {
        res.status(200).send(`Last seen shuttle location ${coordData.latitude}, ${coordData.longitude}`);
    } else {
        res.status(503).send('Location data not available');
    }
}

/**
 * @param req {e.Request}
 * @param res {e.Response}
 * @param id {number}
 */
function postShuttleCoord(req, res, id) {
    coords[id] = req.body;
    res.status(200).send('Success!');
}
