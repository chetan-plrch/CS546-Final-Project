import user from './user.js';
import feedback from './feedBack.js';
import chat from './chat.js';
import { authenticate, destroyToken } from '../middleware/index.js';
import journal from './journal.js';
import feeds from './feeds.js';

const routeConstructor = (app) => {
    app.use('/user', user)
    app.use('/feedbacks', authenticate, feedback)
    app.use('/chat', authenticate, chat)
    app.use('/logout',destroyToken)
    app.use('/journal',authenticate, journal)
    app.use('/feeds',authenticate,feeds)
    app.use("*", (req, res) => {
        res.status(404).json({  error: 'Not Found'  })
    })
}

export default routeConstructor;