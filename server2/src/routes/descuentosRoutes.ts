import { Router } from 'express';
import { descuentosController } from '../controllers/descuentosController';

class DescuentosRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
        config() : void
    {
        this.router.post('/nuevoDescuento/', descuentosController.crear);
        this.router.get('/mostrarDescuentos/', descuentosController.listar);
        this.router.get('/verDescuento/:id', descuentosController.listarUno);
        this.router.put('/actualizarDescuento/:id', descuentosController.actualizar);
        this.router.delete('/eliminarDescuento/:id', descuentosController.eliminar);
    }
}

const descuentosRoutes= new DescuentosRoutes();
export default descuentosRoutes.router;