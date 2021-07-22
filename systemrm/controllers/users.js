const mongoose  = require('mongoose');
const User  = require('../models/User');



const getUser = (req, res) => {
    User.find((err, users) =>{
        err && res.status(500).send(err.message);

        res.status(200).json(users);
    })
}

const getUserId =(req, res) =>{

    let id = req.params.id;
    console.log(req.body);
    console.log(res);
    User.findById(id,(err,user)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion:${err}`})
        if (!user) return res.status(404).send({message:`el usuario no existe ${user} y el user id ${id} params ${req.params.userid}`})

        res.status(200).send({user})
    })
   /* User.findById(req.params.id, (err, user)=>{
        err && res.status(500).send(err.message);

        res.status(200).json(user);
    })*/
}


  
const postUser = (req, res) =>{
    console.log(req.body);
    let user = new User()
        user.nombres = req.body.nombres,
        user.apellidoP= req.body.apellidoP,
        user.apellidoM = req.body.apellidoM,
        user.username = req.body.username,
        user.password = req.body.password,
        user.departamento = req.body.departamento,
        user.userType = req.body.userType

        user.save((err, usrstored) =>{
            if(err) res.status(500).send({message:`Error al salvar en la base de datos:${err}`})

            res.status(200).send({user: usrstored})
            
        })
}

module.exports = {getUser, getUserId, postUser};