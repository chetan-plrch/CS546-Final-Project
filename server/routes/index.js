import user from "./user.js";

const routeConstructor = (app)=>{
    app.use('/users', user);
    app.use('/user', user)
    app.use("*", (req,res) =>{
        res.status(404).json({error: "Route Not Found"});
    });
    
};

export default routeConstructor;