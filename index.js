const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI || "mongodb+srv://alexaraujosj:PROGRAMA@cluster0.uovxtp9.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  tls: true,  
  tlsAllowInvalidCertificates: true,  
});

// Configurar o middleware
app.use(cors()); // Permite requisições de qualquer origem
app.use(express.json()); // Para ler JSON no corpo das requisições

async function connectToDb() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

async function getDb() {
  try {
    return client.db('loja-roupa');
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    throw error;
  }
}

// Definir rotas
app.get('/', (req, res) => {
  res.status(200).send('Cadastre novas roupas\n');
});

app.post('/add-roupa', async (req, res) => {
  try {
    const { nome, tamanho, tipo, preco } = req.body;  
    const db = await getDb();
    const collection = db.collection('roupas');  
    const result = await collection.insertOne({ nome, tamanho, tipo, preco }); 
    console.log('Nova roupa cadastrada:', result.insertedId);
    res.status(201).json({ message: 'Roupa cadastrada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Dados inválidos' });
  }
});

app.use((req, res) => {
  res.status(404).send('Página não encontrada\n');
});

(async () => {
  await connectToDb();
  app.listen(port, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${port}/`);
  });
})();

