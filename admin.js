let mysql = require('mysql');
let inquirer = require('inquirer');
let Con = require('./dbconnect');
//array to store the product's entries
let productEntries = [];
//connect to the database
let connection = new Con();
connection.con(admin_panel);
//show the admin panel
function admin_panel(){
    //display list of operations for the store admin
    inquirer.prompt([
        {
            type: "list",
            message: "Chose the operation:",
            choices:["Add new product","update product price","Add to an existance product","Check statistics","Display by Top Sell Departments","exit"],
            name: "menu"
        }
    ]).then(function(response){
        switch (response.menu) {
            case "Add new product":
                addNewProduct(["Product name?","Department?","Price?","Quantity?"],0);
                break;
            case "update product price":
                updateProductPrice();
                break;
            case "Add to an existance product":
                addToExistProduct();
                break;
            case "Check statistics":
                checkStock();
                break;
            case "Display by Top Sell Departments":
                displayTopSellDep();
                break;
            case "exit":
                connection.close();
                break;
        }
    })
}
//add new product
function addNewProduct(msg,counter){
    inquirer.prompt([
        {
            message: msg[counter],
            name: "addnew"
        }
    ]).then(function(answer){
        if(answer.addnew){
            productEntries.push(answer.addnew);
        }
        if(counter < msg.length-1){
            counter++;
            addNewProduct(msg,counter);
        }else{
            if(connection.saveNewProduct(productEntries)){
                console.log(productEntries[0] + " saved successfully");
                admin_panel();
            }else{
                console.log("something went wrong");
                admin_panel();
            }
        }
    })
}
//add quantity of product
function addToExistProduct(){
    let product_name = "";
    inquirer.prompt([
        {
            message:"Enter the product name",
            name:"productname"
        }
    ]).then(function(name){
        if(name.productname){
            product_name = name.productname;
            inquirer.prompt([
                {
                    message: "Enter the quantity to add to store",
                    name: "addstore"
                }
            ]).then(function(answer){
                if(answer.addstore){
                    if(connection.UpdateProductStore(answer.addstore,product_name)){
                        console.log(prod_name + " stock quantity updated successfully");
                        inquirer.prompt([
                            {
                                type: "confirm",
                                message: "do you want to update the product price",
                                name: "updateprice"
                            }
                        ]).then(function(resp){
                            if(resp.updateprice){
                                inquirer.prompt([
                                    {
                                        message:"Enter the new price",
                                        name:"updateprice"
                                    }
                                ]).then(function(price){
                                    if(price.updateprice){
                                        if(connection.updateProductPrice(product_name,price.updateprice)){
                                            console.log(product_name + " price updated successfully");
                                            admin_panel();
                                        }else{
                                            console.log("something went wrong");
                                            admin_panel();
                                        }
                                    }
                                })
                            }
                        })
                    }else{
                        console.log("something went wrong");
                        admin_panel();
                    }
                }
                
            })
        }
    })
    
}
//update the price for product
function updateProductPrice(){
    inquirer.prompt([
        {
            message: "Enter the product name",
            name:"pname"
        }
    ]).then(function(result){
        if(result.pname){
            let prod_name = result.pname;
            inquirer.prompt([
                {
                    message:"Enter the new price",
                    name: "newprice"
                }
            ]).then(function(price){
                if(price.newprice){
                    if(connection.updateProductPrice(prod_name,price.newprice)){
                        console.log(prod_name + " price updated successfully");
                        admin_panel();
                    }
                }
            })
        }
    })
}
//check products stock
function checkStock(){
    inquirer.prompt([
        {
            type:"list",
            message:"chose how to check store",
            choices:['Specific product','All store products'],
            name:'storecheck'
        }
    ]).then(function(result){
        if(result.storecheck){
            switch (result.storecheck) {
                case 'Specific product':
                    CheckProductStock();
                    break;
                case 'All store products':
                    CheckAllProductsStock();
                    break;
            }
        }
    })
}
//check specific product stock
function CheckProductStock(){
    inquirer.prompt([
        {
            message: "Enter the product name",
            name: "prod_name"
        }
    ]).then(function(response){
        if(response.prod_name){
            if(connection.checkProductStock(response.prod_name)){
                admin_panel();
            }else{
                console.log("something wrong");
                admin_panel();
            }
        }
    })
}
//check all products stock
function CheckAllProductsStock(){
    if(connection.checkAllProductsStock()){
        admin_panel();
    }else{
        console.log("something wrong");
        admin_panel();
    }
}
function displayTopSellDep(){
    if(connection.topSellDep()){
        admin_panel();
    }else{
        console.log("something wrong");
        admin_panel();
    }
}