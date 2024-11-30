const express = require('express');
const router = express.Router();
const Book = require("../books/book_model");
const { default: mongoose } = require('mongoose');
const VerifyAdminToken = require('../middlewares/VerifyAdminToken');


//post request
router.post("/create-book", VerifyAdminToken, async (req, res) => {

    try {
        const myBooks = new Book(req.body);
        await myBooks.save();
        res.status(200).send({ message: "Book is send successfully", Book: myBooks });

    } catch (err) {
        console.log("error is occurs during send the book", err);
        res.status(500).send({ message: "Book is not send" });
    }

});

//get request
router.get("/",async (req, res) => {
    try {
        const Books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(Books);
    } catch (err) {
        console.log("error is occured", err);
        res.status(500).send({ message: "error is occured" });
    }
});

//get one book
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid ID format" });
        }
        const oneBook = await Book.findById(id);
        if (!oneBook) {
            return res.status(404).send({ message: 'Book is not found' })
        }
        res.status(200).send(oneBook);
    } catch (err) {
        console.log(" error is occured", err);
        res.status(500).send({ message: "error is occured" });
    }
})

//update the book
router.put("/update/:id", VerifyAdminToken, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).send({ message: "Invalid ID format" });
        }
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!book) {
            return res.status(404).send({ message: "book is not found so it is not updated" });
        }
        res.status(200).send(book);
    } catch (err) {
        console.log("updating error is occured", err);
        res.status(500).send({ message: "updating error is occured" });
    }
})

//delete the book
router.delete("/delete/:id", VerifyAdminToken, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid ID format" });
        }

        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).send({ message: "Book is not found" });
        }
        res.status(200).send(book);
    } catch (err) {
        console.log("Book is not delete", err);
        res.status(500).send({ message: "Book is not delete" });
    }
})
module.exports = router;