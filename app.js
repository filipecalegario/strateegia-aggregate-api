const express = require("express");
const axios = require("axios"); // Usaremos axios para fazer as chamadas HTTP
let strateegia;

import("strateegia-api")
    .then((module) => {
        strateegia = module;
        // o restante do seu código que usa strateegia vai aqui
    })
    .catch((err) => {
        console.error("Erro ao importar o módulo strateegia-api:", err);
    });

const app = express();
const port = process.env.PORT || 3001;

// Middleware para extrair Bearer token
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .send({ error: "Token não fornecido ou inválido." });
    }

    const token = authHeader.split(" ")[1];
    req.token = token; // Anexamos o token à request para uso posterior
    next();
});

app.get("/aggregate-data", async (req, res) => {
    const projectId = req.query.projectId;
    const mode = req.query.mode;

    // Validação básica dos parâmetros recebidos
    if (!projectId) {
        return res.status(400).send({ error: "ID do projeto é obrigatório." });
    }

    if (!mode || (mode !== "project" && mode !== "user")) {
        return res
            .status(400)
            .send({ error: 'Modo inválido. Deve ser "project" ou "user".' });
    }

    console.log(
        `Recebida requisição para o projeto ${projectId} no modo ${mode}.`
    );

    try {
        // Aqui, faça suas chamadas à API da Strateegia usando o Bearer token

        const config = {
            headers: { Authorization: `Bearer ${req.token}` },
        };

        const response1 = await strateegia.getAllProjects(req.token);

        // Agregue os dados conforme necessário. Isso é apenas um exemplo básico:
        const aggregatedData = response1;

        res.json(aggregatedData);
    } catch (error) {
        res.status(500).send({
            error: "Erro ao buscar dados da API Strateegia.",
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
