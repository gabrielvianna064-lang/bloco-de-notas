const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Arquivos estáticos
app.use(express.static(__dirname));

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "espelhar-celular.html"));
});

// Se a rota não existir
app.use((req, res) => {
    res.status(404).send("Página não encontrada.");
});

// Porta do Render ou localhost
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});