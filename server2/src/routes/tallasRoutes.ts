import { Router } from 'express';
import { tallasController } from '../controllers/tallasController';

class TallasRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
        config() : void
    {
        this.router.post('/nuevaTalla/', tallasController.crear);
        this.router.get('/mostrarTallas/', tallasController.listar);
        this.router.get('/verTalla/:id', tallasController.listarUno);
        this.router.put('/actualizarTalla/:id', tallasController.actualizar);
        this.router.delete('/eliminarTalla/:id', tallasController.eliminar);
    }
}

const tallasRoutes= new TallasRoutes();
export default tallasRoutes.router;