const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());


// Arquivos estáticos
app.use(express.static(__dirname));


// Página inicial
app.get("/", (req, res) => {

    const arquivo = path.join(__dirname, "espelhar-celular.html");

    res.sendFile(arquivo, (erro) => {

        if (erro) {

            res.status(404).send(
                "Arquivo espelhar-celular.html não encontrado."
            );

        }

    });

});


// Download de arquivo
// Exemplo:
// /download/arquivo.zip

app.get("/download/:nome", (req, res) => {

    const nomeArquivo = req.params.nome;

    const arquivo = path.join(__dirname, nomeArquivo);


    console.log("Tentando baixar:", arquivo);


    if (!fs.existsSync(arquivo)) {

        return res.status(404).send(
            "Arquivo não encontrado no servidor."
        );

    }


    res.download(arquivo);

});


// Erro 404

app.use((req, res) => {

    res.status(404).send(
        "Página não encontrada."
    );

});


// Porta Render ou localhost

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});
