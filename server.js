const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DEV_DATABASE;

mongoose
    .connect(DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connection Established"))
    .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});