const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect("mongodb+srv://mowneesh2905_db_user:yLnkXaS7C2CRbTCg@cluster0.ktki7ds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB connected")).catch(err => console.log("DB connection error:", err));
const thingsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
});

const expinfo = mongoose.model("expinfo", thingsSchema);

app.post('/inserts', async (req, res) => {
    const { title, amount } = req.body;
    const newexpinfo = new expinfo({ title, amount });
    try {
        await newexpinfo.save();
        res.status(201).send("info inserted");

    } catch (error) {
        res.status(400).send("error inserting")
    }
})

app.get('/getall', getExpense)

async function getExpense(req, res) {
    try {
        const infos = await expinfo.find();
        res.send(infos)
    }
    catch (error) {
        res.status(400).send("error");
    }
};

app.delete("/deleteExps", deleteExpenses)

async function deleteExpenses(req, res) {

    try {
        const { id } = req.body;
        await expinfo.findByIdAndDelete(id);
        res.send("deleted");
    }
    catch (error) {
        res.status(400).send("error");
    }

}

app.put("/updateExps", updateExpenses)

async function updateExpenses(req, res) {
    try {
        const { id, title, amount } = req.body;
        await expinfo.findByIdAndUpdate(id, { title, amount }, { new: true });
        res.send("expenses updted");
    }
    catch(error){
        res.status(500).send("error in update");
    }
    
}
app.listen(3000, () => console.log("Server running on port 3000"));