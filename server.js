const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* SAVE CUSTOMER */
app.post("/customers", async (req, res) => {
    try {
        const customer = await prisma.customer.create({
            data: req.body
        });

        res.json({
            message: "Saved successfully",
            data: customer
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* GET ALL DATA (for checking in browser/Postman) */
app.get("/customers", async (req, res) => {
    try {
        const customers = await prisma.customer.findMany();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});