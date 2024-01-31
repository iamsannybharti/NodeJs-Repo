
const dotenv = require('dotenv');
dotenv.config('./config.env')

const app = require('./app');
console.log(process.env);
//create a server
const PORT = dotenv.config.PORT || 8000;
app.listen(PORT, () => {
    console.log("server has started");
});