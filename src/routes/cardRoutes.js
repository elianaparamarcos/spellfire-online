const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../../public/DataBase/PT/cartas_pt.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler a base de dados de cartas.' });
    }
    
    const cards = JSON.parse(data);
    
    // Responde com o formato correto que o frontend espera
    res.json({
      success: true,
      source: "json_file",
      count: cards.length,
      data: cards
    });
  });
});

module.exports = router;
