const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[DB] Nenhuma string de conexão fornecida. Operando em modo JSON Fallback.');
    return false;
  }
  try {
    await mongoose.connect(uri);
    console.log('[DB] Conexão com o banco de dados original estabelecida com sucesso.');
    return true;
  } catch (error) {
    console.error('[DB] Erro ao conectar ao banco original:', error.message);
    console.log('[DB] Alternando para modo de redundância local (JSON).');
    return false;
  }
};

module.exports = connectDB;
