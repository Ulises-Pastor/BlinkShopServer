"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generosController_1 = require("../controllers/generosController");
class GenerosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevoGenero/', generosController_1.generosController.crear);
        this.router.get('/mostrargeneros/', generosController_1.generosController.listar);
        this.router.get('/verGenero/:id', generosController_1.generosController.listarUno);
        this.router.put('/actualizarGenero/:id', generosController_1.generosController.actualizar);
        this.router.delete('/eliminarGenero/:id', generosController_1.generosController.eliminar);
    }
}
const generosRoutes = new GenerosRoutes();
exports.default = generosRoutes.router;
