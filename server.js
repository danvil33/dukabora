const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

/* CREATE */
app.post("/customers", async (req, res) => {
    try {
        const customer = await prisma.customer.create({
            data: req.body
        });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* READ */
app.get("/customers", async (req, res) => {
    try {
        const customers = await prisma.customer.findMany();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* UPDATE */
app.put("/customers/:id", async (req, res) => {
    try {
        const customer = await prisma.customer.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* DELETE */
app.delete("/customers/:id", async (req, res) => {
    try {
        await prisma.customer.delete({
            where: { id: Number(req.params.id) }
        });
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});