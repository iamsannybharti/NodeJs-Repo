const app = require('./app');

//create a server
const PORT = 8000;
app.listen(PORT, () => {
    console.log("server has started");
});