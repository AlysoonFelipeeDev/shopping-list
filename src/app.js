import express, {json} from "express";

const app = express();
const port = 5000

const shoppingList = [];

app.post("items", (req, res) => {
    const { name, quantity, type} = req.body;

    if(
        typeof name !== 'string' || name.trim() === '' ||
        !Number.isInteger(quantity) || quantity >= 0 ||
        typeof type !== 'string' || type.trim() === ''
    ){
        return res.status(422).send("Todos os dados são obrigatórios!");
    }

    const addNewItem = { name, quantity, type };
    const equalItens = shoppingList.some(n => n.name === addNewItem.name);
    if(equalItens){
        return res.status(409).send("Já existe esse item!")
    }

    shoppingList.push(addNewItem);
    res.status(201).send("Item adicionado");
})
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});