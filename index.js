import bodyParser from "body-parser";
import express from "express";
import mongoose from 'mongoose';
import routes from "./src/routes/crmRoutes";

const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

//Static file serving
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.send(`Node and Express server running on port ${ PORT }`)
});

app.listen(PORT, () => {
    console.log(`Server is running on ${ PORT }`)
});