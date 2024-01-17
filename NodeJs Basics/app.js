const readline = require('readline');
const fs = require('fs');
const http = require('http');
const { parse } = require('path');
const url = require('url');
// const events = require('events');
const ReplaceHtml = require('./Moduls/RepaceHtml');
const user = require('./Moduls/user');

/*LECTURE 4: CODE EXAMPLE************
READING INPUT & WRITING OUTPUT
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please enter your naame: ", (name) => {
    console.log("You entered: "+name);
    rl.close();
})

rl.on('close', () => {
    console.log("Interface closed");
    process.exit(0);
})

*/

// READING & WRITING TO A FILE
// *************************************
// let readtext=fs.readFileSync('./files/input.txt','utf-8');
// console.log(readtext);
// let contentData = `data read from input.txt\ncreated at ${new Date()}`;
// fs.writeFileSync('./files/output.txt',contentData);



// READING & WRITING TO FILE ASYNCHRONOUSLY
// ***************************************
// fs.readFile('./files/start.txt','utf-8',(error1,data1)=>{
//     console.log(data1);
//     fs.readFile(`./files/${data1}`,'utf-8',(error2,data2)=>{
//         console.log(data2);
//     });
// });
// console.log("reading files");


// CREATING A SIMPLE WEB SERVER
// ***************************************
//const html = fs.readFileSync('./Template/index.html', 'utf-8');
//let products = JSON.parse(fs.readFileSync('./Data/Data.json', 'utf-8'));
//const ProductListhtml = fs.readFileSync('./Template/ProductList.html', 'utf-8');
//const ProductDetailhtml = fs.readFileSync('./Template/ProductDetail.html', 'utf-8');
// const ProdcutListhtmlmodifyied = products.map((product) => {
//     let output = ProductListhtml.replace('{{%IMAGE%}}', product.productImage);
//     output = output.replace('{{%NAME%}}', product.name);
//     output = output.replace('{{%MODELNAME%}}', product.modeName);
//     output = output.replace('{{%MODELNO%}}', product.modelNumber);
//     output = output.replace('{{%SIZE%}}', product.size);
//     output = output.replace('{{%CAMERA%}}', product.camera);
//     output = output.replace('{{%PRICE%}}', product.price);
//     output = output.replace('{{%COLOR%}}', product.color);
//     output = output.replace('{{%ID%}}', product.id);
//     output = output.replace('{{%ROM%}}', product.ROM);
//     output = output.replace('{{%DESC%}}', product.Description);
//     return output;
// });


// function ReplaceHtml(template, product) {
//     let output = template.replace('{{%IMAGE%}}', product.productImage);
//     output = output.replace('{{%NAME%}}', product.name);
//     output = output.replace('{{%MODELNAME%}}', product.modeName);
//     output = output.replace('{{%MODELNO%}}', product.modelNumber);
//     output = output.replace('{{%SIZE%}}', product.size);
//     output = output.replace('{{%CAMERA%}}', product.camera);
//     output = output.replace('{{%PRICE%}}', product.price);
//     output = output.replace('{{%COLOR%}}', product.color);
//     output = output.replace('{{%ID%}}', product.id);
//     output = output.replace('{{%ROM%}}', product.ROM);
//     output = output.replace('{{%DESC%}}', product.Description);
//     return output;
// }


// const server = http.createServer((request, response) => {
//     let { query, pathname: path } = url.parse(request.url, true);
//     // console.log(x);
//     // let path = request.url;

//     if (path === '/' || path.toLowerCase() === '/home') {

//         response.writeHead(200, {
//             'content-type': 'text/html',
//             'my-header': 'true',
//         });
//         response.end(html.replace('{{%CONTENT%}}', 'Welcome To Home'));

//     } else if (path.toLowerCase() === '/products') {
//         if (query.id) {
//           let  product= products[query.id];
//           let ProdcutDetailhtmlmodifyied= ReplaceHtml(ProductDetailhtml,product)
//             response.end(html.replace('{{%CONTENT%}}', ProdcutDetailhtmlmodifyied));
//         } else {
//             response.writeHead(200, {
//                 'content-type': 'text/html',
//             });
//             let ProdcutListhtmlmodifyied = products.map((product) => {
//                 return ReplaceHtml(ProductListhtml, product);
//             });
//             response.end(html.replace('{{%CONTENT%}}', ProdcutListhtmlmodifyied.join(',')));
//         }
//         // response.writeHead(200, {
//         //     'content-type': 'application/json',
//         // });
//         // response.end(JSON.stringify(products));


//     } else if (path.toLowerCase() === '/about') {

//         response.writeHead(200);
//         response.end(html.replace('{{%CONTENT%}}', 'Welcome To About'));

//     } else if (path.toLowerCase() === '/contact') {

//         response.writeHead(200);
//         response.end(html.replace('{{%CONTENT%}}', 'Welcome To Contact'));

//     } else {

//         response.writeHead(404);
//         response.end(html.replace('{{%CONTENT%}}', 'Page Not Found'));

//     }
// });


//step 2 : start server

// const PORT = 800;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// const server = http.createServer();
// server.listen(800, '127.0.0.1', () => {
//     console.log("server stated");
// });



// UNDERSTANDING EVENT DRIVEN ARCHITECTURE
// ***************************************

// let myEmitter = new user();
// myEmitter.on('user created',(id,name)=>{
//     console.log(`A new user ${name} with id ${id} created`);
// });
// myEmitter.on('user created',(id,name)=>{
//     console.log(`A new user ${name} with id ${id} created`);
// });

// myEmitter.emit('user created',101,'sanny');

// UNDERSTANDING STREAMS IN PRACTICE
// ***************************************
//SOLUTION 1: WITHOUT READABLE OR WRITABLE STREAM
// server.on('request', (req, res) =>{
//     fs.readFile('./files/LargeFile.txt', (err, data) =>{
//         if(err){
//             res.end('Something went wrong!');
//             return;
//         }
//         res.end(data);
//     })
// });

//SOLUTION 2: WITH READABLE OR WRITABLE STREAM
// server.on('request', (req, res) =>{
//     let rs= fs.createReadStream('./files/LargeFile.txt');

//     rs.on('data',(chunk)=>{
//         res.write(chunk);
//     });
//     rs.on('end',()=>{
//         res.end();
//     })
//     rs.on('error',(error)=>{
//         res.end(error.message);
//     });
// });

//SOLUTION 2: Using Pipe Method

// server.on('request', (req, res) =>{
//     let rs= fs.createReadStream('./files/LargeFile.txt');
//     rs.pipe(res);
//     // ReadableStream.pipe(WritableStream)
//     //pipe method can be used only on readable stream
// });



// console.log("started");

// //stored in 1st phase
// setTimeout(()=>{
//     console.log("time clock executed");
// },0);

// fs.readFile('./files/input.txt',()=>{
// console.log("read file exuted");
// });


// //stored in 3rd phase
// setImmediate(()=>{
// console.log('immediate excuted');
// });

// console.log("Ended");
