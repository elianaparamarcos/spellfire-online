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
    res.json(JSON.parse(data));
  });
});

module.exports = router;
