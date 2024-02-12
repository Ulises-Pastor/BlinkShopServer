"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevoUsuario/', usuariosController_1.usuariosController.crear);
        this.router.get('/mostrarUsuarios/', usuariosController_1.usuariosController.listar);
        this.router.get('/verUsuario/:id', usuariosController_1.usuariosController.listarUno);
        this.router.put('/actualizarUsuario/:id', usuariosController_1.usuariosController.actualizar);
        this.router.delete('/eliminarUsuario/:id', usuariosController_1.usuariosController.eliminar);
        this.router.post('/iniciarSesion/', usuariosController_1.usuariosController.iniciarSesion);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
