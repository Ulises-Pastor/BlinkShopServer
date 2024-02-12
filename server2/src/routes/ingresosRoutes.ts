import { Router } from 'express';
import { ingresosController } from '../controllers/ingresosController';

class IngresosRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
        config() : void
    {
        this.router.post('/nuevoIngreso/', ingresosController.crear);
        this.router.get('/mostrarIngresos/', ingresosController.listar);
        this.router.get('/verIngreso/:id', ingresosController.listarUno);
        this.router.put('/actualizarIngreso/:id', ingresosController.actualizar);
        this.router.delete('/eliminarIngreso/:id', ingresosController.eliminar);
    }
}

const ingresosRoutes= new IngresosRoutes();
export default ingresosRoutes.router;