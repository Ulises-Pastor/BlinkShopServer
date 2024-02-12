import {Request,Response} from 'express';
import pool from '../database';

class ExistenciasController
{
    public async listar(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT prendas.clave AS Clave, prendas.descripcion AS Prenda, tallas.talla_prenda AS Talla, unidades AS Unidades FROM existencias LEFT JOIN prendas ON prendas.clave = existencias.clave_prenda LEFT JOIN tallas ON tallas.id = existencias.id_talla');
        res.json( respuesta );
    }

    public async listarPorPrenda(req: Request, res: Response ): Promise<void>
    {
        const {clave_prenda} = req.params;
        const respuesta = await pool.query('SELECT prendas.clave AS Clave, prendas.descripcion AS Prenda, tallas.talla_prenda AS Talla, unidades AS Unidades FROM existencias LEFT JOIN prendas ON prendas.clave = existencias.clave_prenda LEFT JOIN tallas ON tallas.id = existencias.id_talla WHERE clave_prenda = ?', [clave_prenda]);
        if(respuesta.length>0){
            res.json(respuesta);
            return ;
        }
        res.status(404).json({'mensaje': 'Esta prenda no tiene existencias'});
    }

    public async listarUno(req: Request, res: Response): Promise <void>{
        const {clave_prenda, id_talla} = req.params;
        const respuesta = await pool.query('SELECT prendas.clave AS Clave, prendas.descripcion AS Prenda, tallas.talla_prenda AS Talla, unidades AS Unidades FROM existencias LEFT JOIN prendas ON prendas.clave = existencias.clave_prenda LEFT JOIN tallas ON tallas.id = existencias.id_talla WHERE clave_prenda = ? and id_talla = ?', [clave_prenda, id_talla]);
        if(respuesta.length>0){
            res.json(respuesta);
            return ;
        }
        res.status(404).json({'mensaje': 'Sin existencias para esta talla'});
    }

    public async crear(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO existencias set ?", [req.body]);
        res.json(resp);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const {clave_prenda, id_talla} = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE existencias set ? WHERE clave_prenda = ? and id_talla = ?", [req.body, clave_prenda, id_talla]);
        res.json(resp);
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const {clave_prenda, id_talla} = req.params;
        const resp = await pool.query("DELETE FROM existencias WHERE clave_prenda = ? and id_talla = ?", [clave_prenda, id_talla]);
        res.json(resp);
    }
}
export const existenciasController = new ExistenciasController();