const express = require('express');
const router = express.Router();
const products = require('../../data/data.json');

/* require this if you want to use SGBD 
    const db = require('../../data/connection');
*/


/* this methods for using data FROM JSON file */

    //get All products
    router.get('/', (req,res) => {
        if(products.length > 0){
            res.json({
                products: products
            });
        }else{
            res.status(404).send({
                message: 'There is no data !!'
            })
        }
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        
    });

    //get All products with specific type
    router.get('/:type', (req,res) => {
        const type = req.params.type;
        const product = products.filter(prod => { return prod.productType.toLowerCase() === type });
        if(product.length > 0){
            res.send({
                products: product
            });
        }else{
            res.status(404).send({
                message: 'Ther is no data !!'
            })
        }

       

    });

    //get All products with specific type & name
    router.get('/:type/:name', (req,res) => {
        const type = req.params.type;
        const name = req.params.name;
        const product = products.filter(prod => 
            { 
                return prod.productType.toLowerCase() === type && prod.name.toLowerCase() === name
            });
        if(product.length > 0){
            res.send({
                product: product
            });
        }else{
            res.status(404).send({
                message: `There is no product with the name of ${name}`
            })
        }

    });

    //add a new product
    router.post('/', (req,res) => {
        const newProduct = {
            id : parseInt(req.body.id),
            name : req.body.name,
            brand : req.body.brand,
            productType : req.body.productType,
            description : req.body.description,
            prix : parseFloat(req.body.prix),
            photo : req.body.photo
        } ;
        
        products.push(newProduct);
        res.send({
            message: `product with id ${newProduct.id} added succesfuly`,
            products: products
        });
    });

    //update a product
    router.put('/:id', (req,res) => {
        const found = products.some(prod => prod.id === parseInt(req.params.id));
        if(found){
            const updProduct = req.body;
            products.forEach(prod => {
                if(prod.id === parseInt(req.params.id)){
                    prod.name = updProduct.name ? updProduct.name : prod.name;
                    prod.brand = updProduct.brand ? updProduct.brand : prod.brand;
                    prod.productType = updProduct.productType ? updProduct.productType : prod.productType;
                    prod.descriptions = updProduct.descriptions ? updProduct.descriptions : prod.descriptions;
                    prod.prix = updProduct.prix ? updProduct.prix : prod.prix;
                    prod.photo = updProduct.photo ? updProduct.photo : prod.photo;

                    res.send({
                        message: 'Product updated',
                        product: prod
                    });
                }
            });
        }else{
            res.status(404).send({
                message: `There is no product with id ${req.params.id}`
            })
        }
    });

    //delete a product
    router.delete('/:id', (req,res) => {
            const found = products.some(prod => prod.id === parseInt(req.params.id));
            if(found){
                res.send({
                    message: `Product with id ${req.params.id} deleted`,
                    products: products.filter(prod => prod.id !== parseInt(req.params.id))
                })
            }else{
                res.status(404).send({
                    message: `There is no product with id ${req.params.id}`
                });
            }
    });





/* this methods for using data FROM MySql */

// db.connect( (err) => {
//     if(err) {
//         throw err;
//        //console.log("there is some err");
//     }else{
//         console.log('Mysql connected...');
        
//         //Get all
//         router.get('/', (req, res) => {
//             db.query('SELECT * FROM products', (err, rows, fields) => {
//                 if(err){
//                     res.send({ message: `There is some error => ${err}`});
//                     throw err;
//                 }else{
//                     if(rows.length > 0){
//                         res.send(rows);
                       
//                     }else{
//                         res.send({
//                         message: "there no data..."
//                         });
//                     }
                    
//                 }
//             });
//             res.header('Access-Control-Allow-Origin', '*');
//             res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//             res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//         });

//         //Get by #Type
//         router.get('/:type', (req, res) => {
//             db.query(`SELECT * FROM products WHERE productType = ?`,req.params.type, (err, rows, fields) => {
//                 if(err){
//                     res.send({ message: `There is some error => ${err}` });
//                     throw err;
//                 }else{
//                     if(rows.length > 0){
//                         res.send(rows);
//                     }else{
//                         res.send({ message: "there no data..." });
//                     }
                    
//                 }
//             });
//         });

//         //Get by type & name
//         router.get('/:type/:name', (req, res) => {
//             db.query('SELECT * FROM products WHERE productType = ? AND name = ?',[req.params.type, req.params.name], (err, rows, fields) => {
//                 if(err){
//                     throw err;
//                 }else{
//                     if(rows.length > 0){
//                         res.send({
//                             data: rows
//                         });
//                     }else{
//                         res.send({
//                         message: `there is no ${req.params.name} match...`
//                         });
//                     }
                    
//                 }
//             });
//         });

//         //DELETE by id
//         router.delete('/:id', (req, res) => {
//             db.query('DELETE FROM products WHERE id = ?',[req.params.id], (err, rows, fields) => {
//                 if(err){
//                     throw err;
//                 }else{
//                     if(rows.affectedRows == 1){
//                         res.send({
//                             message: `Products with id ${req.params.id} has been deleted`,
//                             rowAffected: rows.affectedRows
//                             });
//                     }else{
//                         res.send({
//                             message: `There is no product with id ${req.params.id} !!`,
//                             affectedRows: rows.affectedRows,
//                             changedRows: rows.changedRows
//                             });
//                         }
//                     }
                    
//                 });
//             });

//         //CREATE
//         router.post('/', (req, res) => {

//             let sql = 'INSERT INTO products SET ?';
//             let product = req.body;
//             db.query(sql, product, (err, rows) => {
//                  if(err){
//                     res.send({
//                         message: `There is some error => ${err}`
//                         });
//                     throw err;
//                  }else{
//                          res.send({
//                              message: 'Product added with succed !!',
//                              affectedRows: rows.affectedRows,
//                              changedRows: rows.changedRows
//                              });
//                      }
//                   });
            
//             });

//         //UPDATE
//         router.put('/:id', (req, res) => {

//             let product = req.body;
//             let sql = `UPDATE products SET name = '${product.name}', brand = '${product.brand}', productType = '${product.productType}', description = '${product.description}',
//                         prix = '${product.prix}', photo = '${product.photo}' WHERE id = '${req.params.id}'`;

//             db.query(sql, (err, rows) => {
//                  if(err){
//                     res.send({
//                         message: `There is some error => ${err}`
//                         });
//                     throw err;
//                  }else{
//                      if(rows.affectedRows == 1){
//                         res.send({
//                             message: `Product with id ${req.params.id} updated with succed !!`,
//                             affectedRows: rows.affectedRows,
//                             changedRows: rows.changedRows
//                             });
//                      }else{
//                         res.send({
//                             message: `Ther is no product with id ${req.params.id}  !!`,
//                         });
//                      }
                        
//                      }
//                   });
        
//             });
            
//     }
    
// } );



module.exports = router;