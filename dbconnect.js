let mysql = require('mysql');
require('dotenv').config();
let keys = require('./info');
class Connect{
    constructor(){
        this.connection = mysql.createConnection({
            host:keys.host,
            port:keys.port,
            user:keys.user,
            password:keys.password,
            database:keys.dbname
        });
    }
      
    con(admin_menu){
        this.connection.connect(function (error) {
            if (error){
                throw error;
            }
            admin_menu();
        });
    }

    //login
    async login(user,pass){
        let passlog = false;
        let self = this;
        this.connection.query(`SELECT * FROM login WHERE user= 'admin' AND pass = 'pass'`,await function(err,res){
            if(err){
                throw err;
            }
            if(user === res[0].user && pass === res[0].pass){
                passlog = true;
            }else{
                console.log("\nyou are not authorized");
                self.close();
                process.exit(0);
            }
        });
        return passlog;
    }
    //save product
    saveNewProduct(product){
        let price = parseFloat(product[3]);
        let quantity = parseInt(product[4]);
        this.connection.query(`INSERT INTO products(product_name,dep_id,department_name,price,stock_quantity) VALUES ('${product[0]}','${product[1]}','${product[2]}',${price},${quantity})`,function(err){
            if(err){
                throw err;
            }
        });
        return true;
    }
    //update quantity of product
    UpdateProductStore(quantity,product_name){
        let storeQuantity = parseInt(quantity);
        let secConnection = this.connection;
        this.connection.query(`SELECT * FROM products WHERE product_name = '${product_name}'`,function(err,res){
            if(err){
                throw err;
            }
            storeQuantity += res[0].stock_quantity;
            secConnection.query(`UPDATE products SET stock_quantity = ${storeQuantity} WHERE product_name = '${product_name}'`,function(err){
                if(err){
                    throw err;
                } 
            });  
        });  
        return true; 
    }
    //update price for product
    updateProductPrice(product_name,product_price){
        let price = parseFloat(product_price);
        this.connection.query(`UPDATE products SET price = ${price} WHERE product_name = '${product_name}'`,function(err){
            if(err){
                return err;
            }
        });
        return true;
    }
    //display the stock for specific product
    checkProductStock(product_name){
        this.connection.query(`SELECT * FROM products WHERE product_name = '${product_name}'`,function(err,res){
            if(err){
                throw err;
            }
            console.log('\n');
            console.table([{Product:res[0].product_name,Quantity:res[0].stock_quantity}]);
        });
        return true;
    }
    //disply the stock for all products
    checkAllProductsStock(){
        this.connection.query(`SELECT * FROM products`,function(err,res){
            if(err){
                throw err;
            }
            let products = [];

            res.forEach(el=>{
                products.push({product:el.product_name,quantity:el.stock_quantity});
            });
            console.table(products);

        });
        return true;
    }
    //order departments according to the sale
    topSellDep(){
        this.connection.query(`SELECT * FROM track ORDER BY stock_quantity DESC`,function(err,res){
            if(err){
                throw err;
            }
            let products = [];

            res.forEach(el=>{
                products.push({department:el.department_name,quantity:el.stock_quantity});
            });
            console.log('\n');
            console.table(products);

        });
        return true;
    }
    //register a customer
    saveCustomerInfo(info){
        this.connection.query(`INSERT INTO customers(cus_firstname,cus_lastname,cus_email,cus_phone) VALUES('${info[0]}','${info[1]}','${info[2]}','${info[3]}')`,function(err){
            if(err){
                throw err;
            }
        });
        return true;
    }
    //buy product
    buyProduct(product_name,quantity){
        let q = parseInt(quantity);
        let secConnection = this.connection;
        let visitor = this;
        this.connection.query(`SELECT * FROM products WHERE product_name = "${product_name}"`,function(err,res){
            if(err){
                throw err;
            }
            let product_quantity = res[0].stock_quantity - q;
            let department_id = res[0].dep_id;
            secConnection.query(`UPDATE products SET stock_quantity = ${product_quantity} WHERE product_name = '${product_name}'`,function(err,result){
                if(err){
                    throw err;
                }
                visitor.updateTrackStock(department_id,q);
            })
        })
        return true;
    }
    //update the stock in the track table to track the sale
    updateTrackStock(department_id,quantity){
        this.connection.query(`UPDATE track SET stock_quantity = ${quantity} WHERE item_id = '${department_id}'`,function(err){
            if(err){
                throw err;
            }
        })
        return true;
    }
    //display all products to the customer
    displayProducts() {
        this.connection.query(`SELECT * FROM products`,function(err,res){
            if(err){
                throw err;
            }
            let products = [];
            console.log('\n');
            res.forEach(el=>{
                products.push({product:el.product_name,price:el.price});
            });
            console.table(products);
        });
        return true;
    }
    close(){
        this.connection.end();
        process.exit(0);
    }
}
module.exports = Connect;