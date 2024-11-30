const express = require('express');
const app = express();
const cors = require('cors');


require('dotenv').config()
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://book-store-frontend-nine-red.vercel.app"],
    credentials: true,
}))

//routes define
const saveBooks = require("./src/books/book_route");
const orderRouter = require("./src/orders/order_route");
const userRoutes = require("./src/users/user_route");

app.use("/api/books", saveBooks);
app.use("/api/orders", orderRouter);
app.use("/api/auth", userRoutes);



async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use("/", (req, res) => {
        res.send("server is running");
    })
}


main().then(() => console.log("mongodb is connected successfully")).catch(err => console.log(err));


app.listen(port, () => {
    console.log(`app is run on the ${port}`)
})