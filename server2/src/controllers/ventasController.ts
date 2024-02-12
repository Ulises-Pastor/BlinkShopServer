import {Request,Response} from 'express';
import pool from '../database';

class VentasController
{
    public async listar(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM ventas');
        res.json( respuesta );
    }

    public async listarUno(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM ventas WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Venta no encontrada'});
    }

    public async crear(req: Request, res: Response): Promise<void> {
        const id = req.body.id_usuario;
        console.log(id);
        const resp = await pool.query("INSERT INTO ventas set id_usuario = ?, fecha = CURRENT_DATE", [id]);
        res.json(resp);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const id_nuevo = req.body.id_usuario;
        const resp = await pool.query("UPDATE ventas set id_usuario = ? WHERE id = ?", [id_nuevo, id]);
        res.json(resp);
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("DELETE FROM ventas WHERE id = ?", [id]);
        res.json(resp);
    }
}
export const ventasController = new VentasController();