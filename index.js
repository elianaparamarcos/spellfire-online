const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const cardRoutes = require('./src/routes/cardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de teste inicial
app.get('/', (req, res) => {
  res.json({ status: 'online', message: 'API do Spellfire Online a funcionar com sucesso!' });
});

// Rotas da API de Cartas
app.use('/api/cards', cardRoutes);

// Inicialização da Base de Dados e Servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
  });
});
