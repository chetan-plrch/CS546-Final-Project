import user from './user/index.js';

const routeConstructor = (app) => {
    app.use('/user', user)

    app.use("*", (req, res) => {
        res.status(404).json({  error: 'Not Found'  })
    })
}

export default routeConstructor;