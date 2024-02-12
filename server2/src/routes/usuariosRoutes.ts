import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';

class UsuariosRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
        config() : void
    {
        this.router.post('/nuevoUsuario/', usuariosController.crear);
        this.router.get('/mostrarUsuarios/', usuariosController.listar);
        this.router.get('/verUsuario/:id', usuariosController.listarUno);
        this.router.put('/actualizarUsuario/:id', usuariosController.actualizar);
        this.router.delete('/eliminarUsuario/:id', usuariosController.eliminar);
        this.router.post('/iniciarSesion/', usuariosController.iniciarSesion);
    }
}

const usuariosRoutes= new UsuariosRoutes();
export default usuariosRoutes.router;