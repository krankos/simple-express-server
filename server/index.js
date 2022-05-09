//import express
const express = require("express");

// import express from 'express';
const mongoose = require("mongoose");

const Thing = require("./models/thing");

const bodyParser = require("body-parser");

const app = express();

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://kks:kks951753@cluster0.dbleb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    (err, done) => {
        if (err) {
            console.log(err);
        } else {
            console.log("connected to mongodb");
        }
    }
);

router.get("/irm", (req, res) => {
    res.send("IRM");
});

app.use("/", router);

app.listen(5000, (req, res) => {
    console.log("Server is running on port 5000");
});

app.post("/ajouter_thing", async(req, res) => {
    try {
        let thing = new Thing({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId,
            price: req.body.price,
        });
        await thing.save();
        res.send("Saved successfully");
    } catch (error) {
        res.send(error);
    }
});

app.patch("/modifier_thing/:id", async(req, res) => {
    try {
        await Thing.findByIdAndUpdate(req.params.id, req.body);
        res.send("Updated successfully");
    } catch (error) {
        res.send(error);
    }
});
app.delete("/supprimer_thing/:id", async(req, res) => {
    try {
        await Thing.findByIdAndDelete(req.params.id);
        res.send("Deleted successfully");
    } catch (error) {
        res.send(error);
    }
});
app.get("/afficher_things", async(req, res) => {
    try {
        let things = await Thing.find();
        res.send(things);
    } catch (error) {
        res.send(error);
    }
});