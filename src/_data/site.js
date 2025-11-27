require('dotenv').config({
    path: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev'
});

module.exports = {
    url: process.env.URL || "https://jordimoreno.cat",
    title: "jordimoreno.cat",
    description: "Jordi Moreno Crespi. Desenvolupador web | Escriptor."
};