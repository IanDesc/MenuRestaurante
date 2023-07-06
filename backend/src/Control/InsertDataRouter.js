const express = require('express');
const router = express.Router();
const Drink = require('../models/drink');
const Burguer = require('../models/burger');
const User = require('../models/user');

router.get("/", (req, res) => {

    const burguerList = [
        {
            name: "X-Frango",
            description: "Com pena e tudo",
            weight: 600,
            vegan: false,
            price: 1500,
        },
        {
            name: "X-Burguer",
            description: "é isso",
            weight: 600,
            vegan: false,
            price: 1500,
        },
        {
            name: "X-Lanche",
            description: "Lanche recheado com lanche",
            weight: 600,
            vegan: false,
            price: 1500,
        },
        {
            name: "X-Segredo",
            description: "Meia noite eu te conto",
            weight: 600,
            vegan: false,
            price: 1500,
        },
        {
            name: "X-Vegano",
            description: "Vegano é o recheio ou o público alvo?",
            weight: 600,
            vegan: true,
            price: 1500,
        },
        {
            name: "X-Token",
            description: "HDIUSABNDh38973h7328hd2uSDiuHSDU1d73287234783hnc",
            weight: 600,
            vegan: false,
            price: 1500,
        },
        {
            name: "X-X",
            description: "(づ X o X)づ",
            weight: 600,
            vegan: false,
            price: 1500,
        },
        {
            name: "X-Não pode ser",
            description: "Não acredito nisso",
            weight: 600,
            vegan: false,
            price: 1500,
        },
    ];

    const drinkList = [
        {
            name: "Cerveja Genérica N1",
            milliliters: 473,
            alcoholic: true,
            price: 500,
        },
        {
            name: "Cervejajajaja rindo em espanhol",
            milliliters: 473,
            alcoholic: true,
            price: 500,
        },
        {
            name: "Refrigerante de fruta olho",
            milliliters: 473,
            alcoholic: false,
            price: 500,
        },
        {
            name: "Refrigerante de planta q se eu plantar em casa vou preso",
            milliliters: 473,
            alcoholic: false,
            price: 500,
        },
        {
            name: "Agua, açucar e corante (Sem glúten)",
            milliliters: 2000,
            alcoholic: false,
            price: 1000,
        },
        {
            name: "Refrigerante vazio",
            milliliters: 0,
            alcoholic: false,
            price: 1000,
        },
    ];

    const userList = [
        {
            name: "Ricardo",
            role: "Socio",
            email: "adm1@test.com",
            password: "123456",
            adm: true,
        },
        {
            name: "Sandra",
            role: "Socio",
            email: "adm2@test.com",
            password: "123456",
            adm: true,
        },
        {
            name: "Pedro",
            role: "gerente",
            email: "user1@test.com",
            password: "123456",
            adm: false,
        },
        {
            name: "Julia",
            role: "atendente",
            email: "user2@test.com",
            password: "123456",
            adm: false,
        },
        {
            name: "Paulo",
            role: "cozinha",
            email: "user3@test.com",
            password: "123456",
            adm: false,
        },
    ];

    burguerList.map(item => {
        Burguer.insertBurguer(
            item.name,
            item.description,
            item.weight,
            item.vegan,
            item.price
        );
    });

    drinkList.map(item => {
        Drink.insertDrink(
            item.name,
            item.milliliters,
            item.alcoholic,
            item.price
        );
    });

    userList.map(item => {
        User.insertUser(
            item.name,
            item.role,
            item.email,
            item.password,
            item.adm,
        );
    });

    return res.status(422).json("Todos os campo preenchidos");
});

module.exports = router;