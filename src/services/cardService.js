const fs = require('fs');
const path = require('path');
const CardModel = require('../models/cardModel');

class CardService {
  constructor() {
    this.ptJsonPath = path.join(__dirname, '../../DataBase/PT/cartas_pt.json');
    this.enJsonPath = path.join(__dirname, '../../DataBase/EN/cards_en.json');
  }

  _readLocalJson(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(rawData);
      }
      return [];
    } catch (error) {
      console.error(`Erro ao ler arquivo local (${filePath}):`, error.message);
      return [];
    }
  }

  async getAllCards(lang = 'pt') {
    try {
      const dbCards = await CardModel.find({ lang });
      if (dbCards && dbCards.length > 0) {
        return { source: 'database', data: dbCards };
      }
    } catch (e) {
      // Segue para o arquivo local em caso de falha
    }

    const targetPath = lang.toLowerCase() === 'pt' ? this.ptJsonPath : this.enJsonPath;
    const cards = this._readLocalJson(targetPath);
    return { source: 'json_file', data: cards };
  }

  async getCardById(id, lang = 'pt') {
    try {
      const dbCard = await CardModel.findOne({ id, lang });
      if (dbCard) return { source: 'database', data: dbCard };
    } catch (e) {
      // Segue para fallback
    }

    const { data: cards } = await this.getAllCards(lang);
    const card = cards.find(c => String(c.id) === String(id) || String(c.number) === String(id));
    return { source: 'json_file', data: card || null };
  }

  async searchCards(query = {}, lang = 'pt') {
    const { data: cards } = await this.getAllCards(lang);
    const filtered = cards.filter(card => {
      let matches = true;
      if (query.q) {
        const searchTerm = query.q.toLowerCase();
        const nameMatch = card.name && card.name.toLowerCase().includes(searchTerm);
        const textMatch = card.description && card.description.toLowerCase().includes(searchTerm);
        matches = matches && (nameMatch || textMatch);
      }
      if (query.type) {
        matches = matches && card.type && card.type.toLowerCase() === query.type.toLowerCase();
      }
      if (query.world) {
        matches = matches && card.world && card.world.toLowerCase() === query.world.toLowerCase();
      }
      return matches;
    });
    return { source: 'json_file', data: filtered };
  }
}

module.exports = new CardService();
