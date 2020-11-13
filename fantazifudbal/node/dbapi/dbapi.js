const express = require('express');
const  Joi = require('joi');
const mysql = require('mysql');

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const pool = mysql.createPool({
    connectionLimit:100,
    host: 'localhost',
    user: 'projekat',
    password: 'skript',
    database: 'bazafudbal'
})

const route = express.Router();

const fudbaleriSema = Joi.object().keys({
    ime: Joi.string().trim().max(30).required(),
    prezime: Joi.string().trim().max(30).required(),
    osvojeni_poeni: Joi.number(),
    minuti_odigrani: Joi.number()
});

const timoviSema = Joi.object().keys({
    ime_tima : Joi.string().min(3).max(24).required(),
    osvojeni_poeni : Joi.number()
})

route.get('/test', (req, res)=>{
    res.send('cao');
})

route.get('/fudbaleri',(req,res) => {
    pool.query('select * from fudbaleri', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    })
})

route.get('/timovi',(req,res) => {
    pool.query('select * from timovi', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    })
})

route.post('/fudbaleri', jsonParser, (req, res)=> {
    let { error } = fudbaleriSema.validate(req.body);

    if (error)
        res.status(400).send(error.details[0].message);
    else{
        let query = 'insert into fudbaleri (ime, prezime, osvojeni_poeni, odigrani_minuti) values (?, ?, ?, ?)';
        let formatted = mysql.format(query, [req.body.ime, req.body.prezime, req.body.osvojeni_poeni, req.body.minuti_odigrani]);

        pool.query(formatted, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from fudbaleri where idFudbaleri=?';
                formatted = mysql.format(query, [response.insertId]);

                pool.query(formatted, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

route.post('/timovi', jsonParser, (req, res)=> {
    let { error } = timoviSema.validate(req.body);


    if (error)
        res.status(400).send(error.details[0].message);
    else{
        let query = 'insert into timovi (ime_tima, osvojeni_poeni) values (?, ?)';

        let formatted = mysql.format(query, [req.body.ime_tima, req.body.osvojeni_poeni]);

        pool.query(formatted, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {

                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from timovi where idTimovi=?';
                formatted = mysql.format(query, [response.insertId]);

                pool.query(formatted, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

route.delete('/fudbaleri/:id', (req, res) => {
    let query = 'select * from poruke where idFudbaleri=?';
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let fudbaler = rows[0];

            let query = 'delete from fudbaleri where idFudbaleri=?';
            let formatted = mysql.format(query, [req.params.id]);

            pool.query(formatted, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(fudbaler);
            });
        }
    });
});

route.delete('/timovi/:id', (req, res) => {
    let query = 'select * from timovi where idTimovi=?';
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let tim = rows[0];

            let query = 'delete from timovi where idTimovi=?';
            let formatted = mysql.format(query, [req.params.id]);

            pool.query(formatted, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(tim);
            });
        }
    });
});

route.get('/timovi/:id', (req, res) => {
    let query = 'select * from timovi where idTimovi=?';
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let tim = rows[0];
             res.send(tim);
            }});

});

route.get('/fudbaleri/:id', (req, res) => {
    let query = 'select * from fudbaleri where idFudbaleri=?';
    let formatted = mysql.format(query, [req.params.id]);

    pool.query(formatted, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let fudbaler = rows[0];
            res.send(fudbaler);
        }});

});

route.put('fudbaleri/:id', jsonParser ,(req, res)=>{
    let { error } = fudbaleriSema.validate(req.body);

    if (error)
        res.status(400).send(error.details[0].message);
    else{
        let query = 'update fudbaleri set ime=?, prezime=?, osvojeni_poeni=?, odigrani_minuti=? where idFudbaleri = ?';
        let formatted = mysql.format(query, [req.body.ime, req.body.prezime, req.body.osvojeni_poeni, req.body.minuti_odigrani, req.params.id]);

        pool.query(formatted, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from fudbaleri where idFudbaleri=?';
                formatted = mysql.format(query, [req.params.id]);

                pool.query(formatted, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

route.put('/timovi/:id', jsonParser ,(req, res)=>{
    let { error } = timoviSema.validate(req.body);

    if (error)
        res.status(400).send(error.details[0].message);
    else{
        let query = 'update timovi set ime_tima=?, osvojeni_poeni=? where idTimovi = ?';
        let formatted = mysql.format(query, [req.body.ime_tima, req.body.osvojeni_poeni, req.params.id]);
        console.log(formatted);
        pool.query(formatted, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {
                // Ako nema greske dohvatimo kreirani objekat iz baze i posaljemo ga korisniku
                query = 'select * from timovi where idTimovi=?';
                formatted = mysql.format(query, [req.params.id]);

                pool.query(formatted, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                });
            }
        });
    }
});

module.exports = route;