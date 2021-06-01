var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Musica = require('../models').Musica;
// var env = process.env.NODE_ENV || 'development';

/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/publicar/:idUsuario', function(req, res, next) {
    console.log("Iniciando Publicação...")
    
	let idUsuario = req.params.idUsuario;

    Musica.create({
        musica: req.body.musica,
		artista: req.body.artista,
		genero: req.body.genero
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

/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
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
