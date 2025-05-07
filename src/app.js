import express, {json} from "express";

const app = express();
const port = 5000

const shoppingList = [];


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});