require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

app.use(cors());
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
    }
});

//get specific beans
app.get("/beans/:id", async (req, res) => {
    console.log(req.params.id);
    
    try {
        const results = await db.query("select * from products where id = $1", [req.params.id]);
        
        res.status(200).json({
            status: "success",
            data: {
                product: results.rows[0],
            }
        });

    } catch (err) {
        console.log(err);
    }



});

//create beans
app.post("/beans", async (req, res) => {
    console.log(req.body);

    try {
        const results = await db.query("INSERT INTO products (name, price) values ( $1, $2) returning *", [req.body.name, req.body.price] )
        console.log(results)
        res.status(201).json({
            status: "success",
            data: {
                name: "Peach Cobbler Whole Beans",
                on_sale: true,
                price: 18
                },
            });
    }
        catch (err) {
            console.log(err);
        }


    });

//update beans
app.put("/beans/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE products SET name = $1, price = $2, on_sale = $3 where id = $4 returning *", [req.body.name, req.body.price, req.body.on_sale, req.params.id] );
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                name: "Peach Cobbler Whole Beans",
                on_sale: true,
                price: 18
            }
        });
    } catch (err) {

    }
    console.log(req.params.id);
    console.log(req.body);


});


//delete beans
app.delete("/beans/:id", async (req, res) => {

    try {
        const results = db.query("DELETE FROM products where id = $1", [req.params.id] );
        res.status(204).json({
            status: "success",
        });

    } catch (err) {
        console.log(err);
    }

});


const port = process.env.PORT  || 3001;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

