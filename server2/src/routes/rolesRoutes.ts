import { Router } from 'express';
import { rolesController } from '../controllers/rolesController';
class RolesRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.post('/nuevoRol/', rolesController.crear);
        this.router.get('/mostrarRoles/', rolesController.listar);
        this.router.get('/verRol/:id', rolesController.listarUno );
        this.router.put('/actualizarRol/:id', rolesController.actualizar);
        this.router.delete('/eliminarRol/:id', rolesController.eliminar);
    }
}
const rolesRoutes= new RolesRoutes();
export default rolesRoutes.router;