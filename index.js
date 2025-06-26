const express = require('express');
const bodyParser = require('body-parser');

const realmRoutes = require('./src/routes/realm.route');

const app = express();
const PORT = 4002;

app.use(bodyParser.json());
app.use('/api/realms', realmRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
