const express = require('express');
const app = express();
const urlRoutes = require('./routes/url');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', urlRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));