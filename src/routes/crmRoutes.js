import { addNewContact, deleteContact, getContacts, getContactWithID, updateContact } from "../controllers/crmController";
import { login, loginRequired, register } from '../controllers/userController';

const routes = (app) => {
    app.route('/contacts')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${ req.originalUrl }`);
            console.log(`Request type: ${ req.method }`);
            next();
        }, loginRequired, getContacts)
        .post(loginRequired,addNewContact); 
    app.route('/contact/:contactID')
        .get(loginRequired,getContactWithID)
        .put(loginRequired,updateContact)
        .delete(loginRequired, deleteContact);
    
    //registration route
    app.route('/auth/register').post(register);

    //login route
    app.route('/login').post(login);

}

export default routes;