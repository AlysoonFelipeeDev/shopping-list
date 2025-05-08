import express, {json} from "express";

const app = express();
const port = 5000
app.use(json())

const shoppingList = [];

app.post("/items", (req, res) => {
    const { name, quantity, type} = req.body;

    if(
        typeof name !== 'string' || name.trim() === '' ||
        !Number.isInteger(quantity) || quantity <= 0 ||
        typeof type !== 'string' || type.trim() === ''
    ){
        return res.status(422).send("Todos os dados são obrigatórios!");
    }

    const addNewItem = { id: shoppingList.length +1, ...req.body };
    const equalItens = shoppingList.some(n => n.name === addNewItem.name);
    if(equalItens){
        return res.status(409).send("Já existe esse item!")
    }

    shoppingList.push(addNewItem);
    res.status(201).send("Item adicionado");
})

app.get("/items", (req, res) => {
    const { categoria } = req.query

    if(categoria){
        const categories = shoppingList.filter(t => {
            return t.type.toLowerCase().includes(categoria.toLowerCase());
        })
        return res.send(categories)
    }

    res.send(shoppingList);
})

app.get("/items/:id", (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
        return res.sendStatus(400)
    }

    const itemId = shoppingList.find(i => {
        return i.id === id
    })
    if(!itemId){
        return res.sendStatus(404)
    }

    res.send(itemId);
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});