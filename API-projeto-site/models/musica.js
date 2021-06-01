'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Musica = sequelize.define('Musica',{	
		idMusica: {
			field: 'idMusica',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		musica: {
			field: 'musica',
			type: DataTypes.STRING,
			allowNull: false
		},
		artista: {
			field: 'artista',
			type: DataTypes.STRING,
			allowNull: false
		},
		genero: {
			field: 'genero',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'musicas', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Musica;
};
