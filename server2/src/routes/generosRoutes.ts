import { Router } from 'express';
import { generosController } from '../controllers/generosController';

class GenerosRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
        config() : void
    {
        this.router.post('/nuevoGenero/', generosController.crear);
        this.router.get('/mostrargeneros/', generosController.listar);
        this.router.get('/verGenero/:id', generosController.listarUno);
        this.router.put('/actualizarGenero/:id', generosController.actualizar);
        this.router.delete('/eliminarGenero/:id', generosController.eliminar);
    }
}

const generosRoutes= new GenerosRoutes();
export default generosRoutes.router;