"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const descuentosController_1 = require("../controllers/descuentosController");
class DescuentosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevoDescuento/', descuentosController_1.descuentosController.crear);
        this.router.get('/mostrarDescuentos/', descuentosController_1.descuentosController.listar);
        this.router.get('/verDescuento/:id', descuentosController_1.descuentosController.listarUno);
        this.router.put('/actualizarDescuento/:id', descuentosController_1.descuentosController.actualizar);
        this.router.delete('/eliminarDescuento/:id', descuentosController_1.descuentosController.eliminar);
    }
}
const descuentosRoutes = new DescuentosRoutes();
exports.default = descuentosRoutes.router;
