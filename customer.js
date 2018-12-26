let mysql = require('mysql');
let inquirer = require('inquirer');
let Con = require('./dbconnect');

//connect to the database
let connection = new Con();
connection.con(customer_panel);
//customer info
let cus_info = [];
//show the menu to the customer
function customer_panel(){
    inquirer.prompt([
        {
            type: "list",
            message: "what you like to do",
            choices: ["Buy product","Just watching","exit"],
            name: "cus_choice"
        }
    ]).then(function(response){
        if(response.cus_choice){
            switch (response.cus_choice) {
                case "Buy product":
                    saveCustomerInfo(["First Name","Last Name","Email","Phone Number"],0);
                    break;
                case "Just watching":
                    displayProducts();
                    break;
                case "exit":
                    connection.close();
                    break;
            }
        }
    })
}
//save the customer infor
function saveCustomerInfo(msg,counter){
    inquirer.prompt([
        {
            message:msg[counter],
            name: "info"
        }
    ]).then(function(response){
        if(response.info){
            cus_info.push(response.info);
            counter++;
            if(counter < msg.length){
                saveCustomerInfo(msg,counter);
            }else{
                if(connection.saveCustomerInfo(cus_info)){
                    console.log("you are successfully registered");
                    buyProduct();
                }else{
                    console.log("registeration failed");
                }          
            }
        }else{
            console.log("invalid entry");
            customer_panel();
        }
    })
}
//buy product function
function buyProduct(){
    inquirer.prompt([
        {
            message: "Enter the product name",
            name: "buy"
        }
    ]).then(function(response){
        if(response.buy){
            product_name = response.buy;
            inquirer.prompt([
                {
                    message:"Enter the quantity",
                    name: "quantity"
                }
            ]).then(function(response){
                if(response.quantity){
                    if(connection.buyProduct(product_name,response.quantity)){
                        console.log("thanks for shopping from us , your order is processing\n");
                        console.log("your order number: "+Math.floor((Math.random()+1)*8475735487687));
                        customer_panel();
                    }else{
                        console.log("something went wrong");
                        customer_panel();
                    }
                }
            })
        }
    })
}
function displayProducts(){
    if(connection.displayProducts()){
        customer_panel();
    }else{
        console.log("something wrong");
        customer_panel();
    }
}