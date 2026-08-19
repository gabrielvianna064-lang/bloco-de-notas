const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();


// =====================================================
// CONFIGURAÇÕES
// =====================================================

app.use(cors());

app.use(express.json());


// =====================================================
// ARQUIVOS ESTÁTICOS
// =====================================================

app.use(
    express.static(__dirname)
);


// =====================================================
// PÁGINA PRINCIPAL
// =====================================================

app.get("/", (req, res) => {

    const arquivo = path.join(
        __dirname,
        "espelhar-celular.html"
    );


    if (!fs.existsSync(arquivo)) {

        return res.status(404).send(`
            <h1>Arquivo não encontrado</h1>

            <p>
                O arquivo
                <strong>espelhar-celular.html</strong>
                não está na pasta do servidor.
            </p>
        `);

    }


    res.sendFile(arquivo);

});


// =====================================================
// ROTA DO ESPELHAMENTO
// =====================================================

app.get("/espelho", (req, res) => {

    const arquivo = path.join(
        __dirname,
        "espelhar-celular.html"
    );


    if (!fs.existsSync(arquivo)) {

        return res.status(404).send(
            "Arquivo espelhar-celular.html não encontrado."
        );

    }


    res.sendFile(arquivo);

});


// =====================================================
// DOWNLOAD DE ARQUIVO
// =====================================================
//
// Exemplo:
//
// http://localhost:3000/download/arquivo.zip
//
// =====================================================

app.get("/download/:nome", (req, res) => {

    const nomeArquivo = req.params.nome;


    // Evita caminhos como ../arquivo
    const nomeSeguro = path.basename(nomeArquivo);


    const arquivo = path.join(
        __dirname,
        nomeSeguro
    );


    console.log(
        "Tentando baixar:",
        arquivo
    );


    if (!fs.existsSync(arquivo)) {

        return res.status(404).send(
            "Arquivo não encontrado no servidor."
        );

    }


    res.download(
        arquivo,
        nomeSeguro,
        (erro) => {

            if (erro) {

                console.error(
                    "Erro no download:",
                    erro
                );

            }

        }
    );

});


// =====================================================
// STATUS DO SERVIDOR
// =====================================================

app.get("/status", (req, res) => {

    res.json({

        conectado: true,

        servidor: "Express",

        espelhamento: true,

        firebase: true,

        webRTC: true,

        porta: PORT,

        horario:
            new Date().toISOString()

    });

});


// =====================================================
// ERRO 404
// =====================================================

app.use((req, res) => {

    res.status(404).send(`
        <h1>404</h1>

        <p>
            Página não encontrada.
        </p>

        <a href="/">
            Voltar para o espelhamento
        </a>
    `);

});


// =====================================================
// PORTA
// =====================================================

const PORT =
    process.env.PORT || 3000;


// =====================================================
// INICIAR SERVIDOR
// =====================================================

app.listen(PORT, () => {

    console.log("");
    console.log("======================================");
    console.log("       ESPELHAMENTO DE TELA 2");
    console.log("======================================");
    console.log("");
    console.log(
        `Servidor rodando na porta ${PORT}`
    );
    console.log("");
    console.log(
        `Página: http://localhost:${PORT}/`
    );
    console.log(
        `Espelho: http://localhost:${PORT}/espelho`
    );
    console.log(
        `Status: http://localhost:${PORT}/status`
    );
    console.log("");
    console.log(
        "Express: CONECTADO"
    );
    console.log(
        "Firebase: CONFIGURADO NO HTML"
    );
    console.log(
        "WebRTC: CONFIGURADO NO HTML"
    );
    console.log("");
    console.log("======================================");
    console.log("");

});
