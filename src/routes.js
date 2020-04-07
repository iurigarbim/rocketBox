const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

/**routes.get('/teste', (req, res) => { // o req representa a requisição feita no servidor / o res representa a resposta para o cliente 
    return res.send('Hello Rocket');
})
*/

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);

routes.post(
    "/boxes/:id/files", multer(multerConfig).single('file'), 
    FileController.store
    );

module.exports = routes; // Ele exporta a informação do arquivo (ele tá exportando a variável routes)