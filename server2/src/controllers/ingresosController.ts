import {Request, Response} from 'express';
import pool from '../database';

class IngresosController
{
    public async listar(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM ingresos');
        res.json( respuesta );
    }

    public async listarUno(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM ingresos WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
            }
        res.status(404).json({'mensaje': 'Ingreso no encontrado'});
    }

    public async crear(req: Request, res: Response): Promise<void> {
        const {clave_prenda, unidades} = req.body;
        const precio_unitario = await pool.query("SELECT precio_unitario FROM prendas WHERE clave = ?", [clave_prenda]);
        const result = await pool.query("SELECT TRUNCATE(? * ?, 2) AS precio_total", [precio_unitario[0].precio_unitario, unidades]);
        const precio_total = result[0].precio_total;
        const resp = await pool.query("INSERT INTO ingresos SET clave_prenda = ?, unidades = ?, precio_unitario = ?, precio_total = ?", [clave_prenda, unidades, precio_unitario[0].precio_unitario, precio_total]);
        res.json(resp);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const {clave_prenda, unidades} = req.body;
        const precio_unitario = await pool.query("SELECT precio_unitario FROM prendas WHERE clave = ?", [clave_prenda]);
        const result = await pool.query("SELECT TRUNCATE(? * ?, 2) AS precio_total", [precio_unitario[0].precio_unitario, unidades]);
        const precio_total = result[0].precio_total;
        const resp = await pool.query("UPDATE ingresos SET clave_prenda = ?, unidades = ?, precio_unitario = ?, precio_total = ? WHERE id = ?", [clave_prenda, unidades, precio_unitario[0].precio_unitario, precio_total, id]);
        res.json(resp);
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM ingresos WHERE id = ${id}`);
        res.json(resp);
    }
}
export const ingresosController = new IngresosController();