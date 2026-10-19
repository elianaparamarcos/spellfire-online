const path = require('path');
const fs = require('fs');

exports.getCards = (req, res) => {
  // Caminho absoluto para o JSON dentro de public/
  const filePath = path.join(__dirname, '../../public/DataBase/PT/cartas_pt.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler ficheiro JSON:", err);
      return res.status(500).json({
        success: false,
        message: 'Erro ao ler a base de dados de cartas.'
      });
    }

    try {
      const cards = JSON.parse(data);
      return res.json({
        success: true,
        source: "json_file",
        count: cards.length,
        data: cards
      });
    } catch (parseErr) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao processar o formato do JSON.'
      });
    }
  });
};
