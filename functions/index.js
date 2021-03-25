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

class coordBuffer {
    #privateBuffer


    constructor(size) {
        this.size = size;
        this.#privateBuffer = {};
    }

    /**
     * @param {number | object} id
     */
    set addCoord(id, coordData) {
        if( this.#privateBuffer[id] ) {
            this.#privateBuffer[id].append(coordData);
        } else {
            this.#privateBuffer[id] = [coordData];
        }
        this.checkSize(id);
    }

    get lastCoord(id) {
        if( this.#privateBuffer[id] ) {
            return this.#privateBuffer[id].slice(-1)[0];
        } else {
            return 0;
        }
    }

    checkSize(id) {
        if( this.#privateBuffer[id].size > this.size ) {
            let half = Math.ceil(this.#privateBuffer[id].size / 2);
            this.#privateBuffer[id].splice(0, half);
        }
    }

}

let buffer = new coordBuffer(100);
/**
 * @param req {e.Request}
 * @param res {e.Response}
 */
exports.shuttleCoord = (req, res) => {
    let coordData = {};
    let data = '';
    // TODO - verify authenticity of sender
    switch (req.method) {
        case 'GET':
            coordData = buffer.lastCoord();
            if( coordData == 0 ) {
                res.status(503).send('Location data not available')
            }
            else {
                res.status(200).send(`Last seen shuttle location ${coordData}`);
            }
            break;
        case 'POST':
            req.on('data', chunk => {
                data += chunk;
            });
            req.on('end', () => {
                coordData = JSON.parse(data);
            });
            buffer.addCoord(coordData);
            res.status(200).send('Success!');
            break;
        default:
            res.status(405).send({error: 'Something blew up!'});
            break;
    }
};