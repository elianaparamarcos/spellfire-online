const CardService = require('../services/cardService');

class CardController {
  async getCards(req, res) {
    try {
      const lang = req.query.lang || 'pt';
      const result = await CardService.getAllCards(lang);
      return res.json({
        success: true,
        source: result.source,
        count: result.data.length,
        data: result.data
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getCardById(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || 'pt';
      const result = await CardService.getCardById(id, lang);
      
      if (!result.data) {
        return res.status(404).json({ success: false, message: 'Carta não encontrada.' });
      }

      return res.json({
        success: true,
        source: result.source,
        data: result.data
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async searchCards(req, res) {
    try {
      const lang = req.query.lang || 'pt';
      const result = await CardService.searchCards(req.query, lang);
      return res.json({
        success: true,
        source: result.source,
        count: result.data.length,
        data: result.data
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new CardController();
