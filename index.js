const express = require('express');
const bodyParser = require('body-parser');

const realmRoutes = require('./src/routes/realm.route');
const ruleRoutes = require('./src/routes/rules.route');
const userRoutes = require('./src/routes/user.route');
const groupRoute = require('./src/routes/group.route');

const app = express();
const PORT = 4002;

app.use(bodyParser.json());
app.use('/api/realms', realmRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
