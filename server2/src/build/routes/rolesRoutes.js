"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController_1 = require("../controllers/rolesController");
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevoRol/', rolesController_1.rolesController.crear);
        this.router.get('/mostrarRoles/', rolesController_1.rolesController.listar);
        this.router.get('/verRol/:id', rolesController_1.rolesController.listarUno);
        this.router.put('/actualizarRol/:id', rolesController_1.rolesController.actualizar);
        this.router.delete('/eliminarRol/:id', rolesController_1.rolesController.eliminar);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
