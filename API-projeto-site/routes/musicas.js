var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Musica = require('../models').Musica;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N leituras */
router.get('/ultimas/:idUsuario', function(req, res, next) {

	var idUsuario = req.params.idUsuario;

	console.log(`Recuperando as ultimas musicas`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		musica, 
		artista, 
		genero 
		from musicas 
		where fkUsuario = ${idUsuario}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select
		temperatura, 
		umidade, 
		momento,
		FORMAT(momento,'HH:mm:ss') as momento_grafico
		from musicas
		where fkcaminhao = ${idUsuario}
		order by id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		model: Musica,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/publicar/:idUsuario', function(req, res, next) {
    console.log("Iniciando Publicação...")
    
	let idUsuario = req.params.idUsuario_usuario_meuapp;

    Musica.create({
        musica: req.body.musica,
		artista: req.body.artista,
		genero: req.body.genero,
		fkusuario: req.body.idUsuario
    }).then(resultado => {
        console.log("Post realizado com sucesso!!");
        res.send(resultado);
    }).catch(erro => {
        console.log('DEU UM ERRINHO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
})

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
    let instrucaoSql = `SELECT 
    musica,
    artista,
	genero
    FROM musicas
    INNER JOIN usuario
    ON musicas.fkUsuario = usuario.idUsuario
	ORDER BY musica`;

	sequelize.query(instrucaoSql, {
		model: Musica,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/:idUsuario', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
	var idUsuario = req.params.idUsuario;

    let instrucaoSql = `select 
	musica, 
	artista, 
	genero 
	from musicas 
	where fkUsuario = ${idUsuario}`;

	sequelize.query(instrucaoSql, {
		model: Musica,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;
