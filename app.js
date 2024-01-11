const readline = require('readline');
const fs = require('fs');
const http = require('http');

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
const html = fs.readFileSync('./Template/index.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('./Data/Data.json', 'utf-8'));

const server = http.createServer((request, response) => {
    let path = request.url;

    if (path === '/' || path.toLowerCase() === '/home') {

        response.writeHead(200, {
            'content-type': 'text/html',
            'my-header': 'true',
        });
        response.end(html.replace('{{%CONTENT%}}', 'Welcome To Home'));

    } else if (path.toLowerCase() === '/products') {

        response.writeHead(200, {
            'content-type': 'application/json',
        });
        response.end(JSON.stringify(products));

    } else if (path.toLowerCase() === '/about') {

        response.writeHead(200);
        response.end(html.replace('{{%CONTENT%}}', 'Welcome To About'));

    } else if (path.toLowerCase() === '/contact') {

        response.writeHead(200);
        response.end(html.replace('{{%CONTENT%}}', 'Welcome To Contact'));

    } else {

        response.writeHead(404);
        response.end(html.replace('{{%CONTENT%}}', 'Page Not Found'));
        
    }
});


//step 2 : start server

// const PORT = 800;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
server.listen(800, '127.0.0.1', () => {
    console.log("server stated");
});