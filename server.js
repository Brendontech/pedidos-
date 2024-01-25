// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const cardapio = [
  { id: 1, nome: 'Hamburguer', preco: 10.0 },
  { id: 2, nome: 'Pizza', preco: 15.0 },
  { id: 3, nome: 'Batata Frita', preco: 5.0 },
];

const pedidos = [];

app.get('/', (req, res) => {
  res.render('index', { cardapio });
});

app.post('/pedido', (req, res) => {
  const { itemId, quantidade } = req.body;
  const itemSelecionado = cardapio.find(item => item.id == itemId);

  if (itemSelecionado) {
    const total = itemSelecionado.preco * quantidade;
    const pedido = { item: itemSelecionado.nome, quantidade, total };
    pedidos.push(pedido);

    res.render('pedido', { pedido });
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
