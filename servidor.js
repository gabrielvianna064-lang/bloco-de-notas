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

    const arquivo = path.join(__dirname, "espelhar-celular.html");

    res.sendFile(arquivo, (erro) => {

        if (erro) {

            res.status(404).send(
                "Arquivo espelhar-celular.html não encontrado."
            );

        }

    });

});


// Download do arquivo
// coloque o arquivo na mesma pasta do servidor
// exemplo: arquivo.zip

app.get("/download/arquivo.zip", (req, res) => {

    const arquivo = path.join(__dirname, "arquivo.zip");

    res.download(arquivo, "arquivo.zip", (erro) => {

        if (erro) {

            res.status(404).send(
                "Arquivo para download não encontrado."
            );

        }

    });

});


// Se a rota não existir

app.use((req, res) => {

    res.status(404).send(
        "Página não encontrada."
    );

});


// Porta do Render ou localhost

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});
