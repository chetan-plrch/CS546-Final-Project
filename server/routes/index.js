import user from './user.js';
import feedback from './feedBack.js';
import chat from './chat.js';
import { authenticate } from '../middleware/index.js';
const routeConstructor = (app) => {
    app.use('/user', user)
    app.use('/feedbacks',feedback)
    app.use('/chat', authenticate)
    app.use('/chat', chat)

    app.use("*", (req, res) => {
        res.status(404).json({  error: 'Not Found'  })
    })
}

export default routeConstructor;