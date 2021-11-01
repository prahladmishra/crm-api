const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${ req.originalUrl }`);
            console.log(`Request type: ${ req.method }`);
            next();
        }, (req,res, next) =>{
            res.send(`Get Request Successful!`);
        })
        .post((req, res) => {
            res.send(`POST Request Successful!`);
        });
    app.route('/contact/:contactID')
        .put((req, res) => {
            res.send(`PUT Request Successful!`);
        })
        .delete((req, res) => {
            res.send(`DELETE Request Successful!`);
        });
}

export default routes;