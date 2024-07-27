require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const db = require("./db");

app.use(cors());
app.use(helmet());
app.use(express.json());


//get all beans
app.get("/beans", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM products");

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                beans: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error" , message: "Internal Server Error" });
    }
});

//get specific beans
app.get("/beans/:id", async (req, res) => {
    console.log(req.params.id);
    
    try {
        const results = await db.query("SELECT * FROM products where id = $1", [req.params.id]);
        if(results.rows.length > 0) {
            res.status(200).json({
                status: "success",
                data: {
                    product: results.rows[0],
            }
        });
    } else {
        res.status(404).json({ status:"error", message: "Bean not found" });
    }

    } catch (err) {
        console.log(err);
        res.status(500).json({ status:"error", message: "Internal Server Error" });
    }
});

//create beans
app.post("/beans", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO products (name, price) values ( $1, $2) returning *", [req.body.name, req.body.price] )
        res.status(201).json({
            status: "success",
            data: {
                product: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

//update beans
app.put("/beans/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE products SET name = $1, price = $2, on_sale = $3 where id = $4 returning *", [req.body.name, req.body.price, req.body.on_sale, req.params.id] );
        if (results.rows.length > 0) {
        res.status(200).json({
            status: "success",
            data: {
                product: results.rows[0],
            }
        });
    } else {
        res.status(404).json({ status: "error", message: "Bean not found" });
    }
    } catch (err) {
        res.status(500).json({ status: "error", message: "Internal Server Erorr"});
    }
});


//delete beans
app.delete("/beans/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM products where id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });

    } catch (err) {
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});


const port = process.env.PORT  || 3001;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});