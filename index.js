const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/database');
const cardRoutes = require('./src/routes/cardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir ficheiros estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota de teste inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rotas da API de Cartas
app.use('/api/cards', cardRoutes);

// Inicialização da Base de Dados e Servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
  });
});
