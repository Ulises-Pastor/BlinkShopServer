"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prendasController_1 = require("../controllers/prendasController");
class PrendasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevaPrenda/', prendasController_1.prendasController.crear);
        this.router.get('/mostrarPrendas/', prendasController_1.prendasController.listar);
        this.router.get('/verPrenda/:clave', prendasController_1.prendasController.listarUno);
        this.router.put('/actualizarPrenda/:clave', prendasController_1.prendasController.actualizar);
        this.router.delete('/eliminarPrenda/:clave', prendasController_1.prendasController.eliminar);
    }
}
const prendasRoutes = new PrendasRoutes();
exports.default = prendasRoutes.router;
