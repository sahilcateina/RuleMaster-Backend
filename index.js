const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const realmRoutes = require('./src/routes/realm.route');
const ruleRoutes = require('./src/routes/rules.route');
const userRoutes = require('./src/routes/user.route');
const groupRoute = require('./src/routes/group.route');

const app = express();
const PORT = 4002;


app.use(cors({
    origin: 'http://localhost:3001', // or '*' for all origins
    credentials: true
}));

app.use(express.json());

app.use(bodyParser.json());
app.use('/api/realms', realmRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
