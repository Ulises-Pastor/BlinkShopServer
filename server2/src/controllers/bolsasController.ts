import {Request,Response} from 'express';
import pool from '../database';
class BolsasController
{
    public async listar(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM bolsas_de_compra');
        res.json( respuesta );
    }
    public async listarBolsa(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT prendas.descripcion AS Prenda, tallas.talla_prenda AS Talla, unidades, bolsas_de_compra.precio_unitario, precio_total FROM bolsas_de_compra LEFT JOIN prendas ON prendas.clave = clave_prenda LEFT JOIN tallas ON tallas.id = id_talla WHERE id_usuario = ?', [id]);
        if(respuesta.length > 0){
            res.json(respuesta);
            return ;
        }
        res.status(404).json({'mensaje': 'Bolsa de Compra vacía'});
    }
    public async agregar(req: Request, res: Response): Promise<void> {
        const {id_usuario, clave_prenda, id_talla, unidades} = req.body;
        const existe = await pool.query("SELECT clave_prenda FROM bolsas_de_compra WHERE id_usuario = ? AND clave_prenda = ? AND id_talla = ?", [id_usuario, clave_prenda, id_talla]);
        const precio_unitario = await pool.query("SELECT precio_unitario FROM prendas WHERE clave = ?", [clave_prenda]);
        if(existe.length == 0){
            const result = await pool.query("SELECT TRUNCATE(? * ?, 2) AS precio_total", [precio_unitario[0].precio_unitario, unidades]);
            const precio_total = result[0].precio_total;
            const resp = await pool.query("INSERT INTO bolsas_de_compra SET id_usuario = ?, clave_prenda = ?, id_talla = ?, unidades = ?, precio_unitario = ?, precio_total = ?", [id_usuario, clave_prenda, id_talla, unidades, precio_unitario[0].precio_unitario, precio_total]);
            res.json(resp);
            return;
        }
        const unidadesActual = await pool.query("SELECT unidades FROM bolsas_de_compra WHERE id_usuario = ? AND clave_prenda = ? AND id_talla = ?", [id_usuario, clave_prenda, id_talla]);
        const suma = await pool.query('SELECT (? + ?) AS Suma', [unidadesActual[0].unidades, unidades]);
        const unidadesNuevo = suma[0].Suma;
        const result = await pool.query("SELECT TRUNCATE(? * ?, 2) AS precio_total", [precio_unitario[0].precio_unitario, unidadesNuevo]);
        const precio_total = result[0].precio_total;
        const resp = await pool.query("UPDATE bolsas_de_compra SET unidades = ?, precio_total = ? WHERE id_usuario = ? AND clave_prenda = ? AND id_talla = ?", [unidadesNuevo, precio_total, id_usuario, clave_prenda, id_talla]);
        res.json(resp);
    }
    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM bolsas_de_compra WHERE id = ${id}`);
        res.json(resp);
    }
}
export const bolsasController = new BolsasController();