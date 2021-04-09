const express = require('express');
const router = express.Router();
const db = require('../../connection');

db.connect( (err) => {
    if(err) {
        throw err;
       //console.log("there is some err");
    }else{
        console.log('Mysql connected...');
        
        //Get all
        router.get('/', (req, res) => {
            db.query('SELECT * FROM products', (err, rows, fields) => {
                if(err){
                    res.send({ message: `There is some error => ${err}`});
                    throw err;
                }else{
                    if(rows.length > 0){
                        res.send(rows);
                    }else{
                        res.send({
                        message: "there no data..."
                        });
                    }
                    
                }
            });
        });

        //Get by #Type
        router.get('/:type', (req, res) => {
            db.query(`SELECT * FROM products WHERE productType = ?`,req.params.type, (err, rows, fields) => {
                if(err){
                    res.send({ message: `There is some error => ${err}` });
                    throw err;
                }else{
                    if(rows.length > 0){
                        res.send(rows);
                    }else{
                        res.send({ message: "there no data..." });
                    }
                    
                }
            });
        });

        //Get by type & name
        router.get('/:type/:name', (req, res) => {
            db.query('SELECT * FROM products WHERE productType = ? AND name = ?',[req.params.type, req.params.name], (err, rows, fields) => {
                if(err){
                    throw err;
                }else{
                    if(rows.length > 0){
                        res.send({
                            data: rows
                        });
                    }else{
                        res.send({
                        message: `there is no ${req.params.name} match...`
                        });
                    }
                    
                }
            });
        });

        //DELETE by id
        router.delete('/:id', (req, res) => {
            db.query('DELETE FROM products WHERE id = ?',[req.params.id], (err, rows, fields) => {
                if(err){
                    throw err;
                }else{
                    if(rows.affectedRows == 1){
                        res.send({
                            message: `Products with id ${req.params.id} has been deleted`,
                            rowAffected: rows.affectedRows
                            });
                    }else{
                        res.send({
                            message: `There is no product with id ${req.params.id} !!`,
                            affectedRows: rows.affectedRows,
                            changedRows: rows.changedRows
                            });
                        }
                    }
                    
                });
            });

        //CREATE
        router.post('/', (req, res) => {

            let sql = 'INSERT INTO products SET ?';
            let product = req.body;
            db.query(sql, product, (err, rows) => {
                 if(err){
                    res.send({
                        message: `There is some error => ${err}`
                        });
                    throw err;
                 }else{
                         res.send({
                             message: 'Product added with succed !!',
                             affectedRows: rows.affectedRows,
                             changedRows: rows.changedRows
                             });
                     }
                  });
            
            });

        //UPDATE
        router.put('/:id', (req, res) => {

            let product = req.body;
            let sql = `UPDATE products SET name = '${product.name}', brand = '${product.brand}', productType = '${product.productType}', description = '${product.description}',
                        prix = '${product.prix}', photo = '${product.photo}' WHERE id = '${req.params.id}'`;

            db.query(sql, (err, rows) => {
                 if(err){
                    res.send({
                        message: `There is some error => ${err}`
                        });
                    throw err;
                 }else{
                     if(rows.affectedRows == 1){
                        res.send({
                            message: `Product with id ${req.params.id} updated with succed !!`,
                            affectedRows: rows.affectedRows,
                            changedRows: rows.changedRows
                            });
                     }else{
                        res.send({
                            message: `Ther is no product with id ${req.params.id}  !!`,
                        });
                     }
                        
                     }
                  });
        
            });
            

    


    }
    
} );

module.exports = router;