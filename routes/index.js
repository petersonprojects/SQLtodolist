
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../models/database');

//render our index view
router.get('/', (req,res) => {

    res.render('index');

});

router.get('/api', (req, res) => {
    //return all of the current todos
    db.query(`SELECT * FROM todos`)
    .then(results=>{
        res.json(results);
    })
    .catch((error)=>{
        res.send(error);
    });
});

router.use(bodyParser.json()); //req.body (fill everything that client is sending back to us)
router.use(bodyParser.urlencoded({extended: false}));

router.post('/api', (req, res) => {
    //insert a todo
    let description = req.body.description;

    db.none(`INSERT INTO todos VALUES (DEFAULT, $1)`, [description])
    .then(()=>{
        db.query(`SELECT * FROM todos`)
        .then(results=>{
            res.json(results);
        })
        .catch((error)=>{
            res.send(error);
        });
    })
    .catch(error =>{
        res.send(error);
    });

});

router.patch('/api', (req, res) => {
    //update a todo description
    let id = req.body.id;
    let description = req.body.description;

    db.none(`UPDATE todos SET description = $1 WHERE id = $2`, [description,id])
    .then(()=>{
        db.query(`SELECT * FROM todos`)
        .then(results=>{
            res.json(results);
        })
        .catch((error)=>{
            res.send(error);
        });
    })
    .catch((error)=>{
        res.send(error);
    })
});

router.delete('/api/:id', (req, res) => {
    let id = req.params.id;
    db.none(`DELETE FROM todos WHERE id=$1`, [id])
    .then(()=>{
        db.query(`SELECT * FROM todos`)
        .then(results=>{
            res.json(results);
        })
        .catch((error)=>{
            res.send(error);
        });
    })
    .catch(error=>{
        res.send(error)
    });
});

// router.delete('/api/all', (req, res) => {
//     //deletes all entries
    
// });

module.exports = router;