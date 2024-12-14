"use strict";
const elementHTML = {
  layoutCalculator: document.getElementsByTagName("h1")[0],
  calculateButton: document.getElementsByClassName("handler_btn")[0],
  resetButton: document.getElementsByClassName("handler_btn")[1],
  plusButton: document.querySelector(".screen-btn"),
  elementsClassPersent: document.querySelectorAll(".other-items.percent"),
  elementsClassNumber: document.querySelectorAll(".other-items.number"),
  rollback: document.querySelector(".rollback input"),
  rollback1: document.querySelector(".rollback span"), //Тут всёго один span
  totalInput: document.getElementsByClassName("total-input"),
  input: [],

  getInput: function () {
    for (let i = 0; i < elementHTML.totalInput.length; i++) {
      elementHTML.input.push(elementHTML.totalInput[i]);
    }
  },
  screen: document.querySelectorAll(".screen"),

  print: function () {
    console.log(elementHTML.layoutCalculator);
    console.log(elementHTML.calculateButton);
    console.log(elementHTML.resetButton);
    console.log(elementHTML.plusButton);
    console.log(elementHTML.elementsClassPersent);
    console.log(elementHTML.elementsClassNumber);
    console.log(elementHTML.rollback);
    console.log(elementHTML.rollback1);
    console.log(elementHTML.totalInput);
    console.log(elementHTML.input);
    console.log(elementHTML.screen);
  },
};

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,
  services: {},

  asking: function () {
    appData.title = appData.checkString(
      "Как называется наш проект",
      "Калькулятор верстки"
    );

    for (let i = 0; i < 2; i++) {
      let name = appData.checkString("Какие типы экранов нужно разработать");
      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = appData.checkString("Какой тип услуги нужен");
      name += " " + i; //Усложнённое задание №8 (Лобовое решение задачи, лучше варианта не придумал)
      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа");
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте");
  },

  checkString: function (question) {
    let str;
    do {
      str = prompt(question);
    } while (!Number.isNaN(Number(str)));
    {
      return str;
    }
  },

  addPrices: function () {
    // for (let screen of appData.screens) {
    //   appData.screenPrice += +screen.price;
    // }
    appData.screenPrice = appData.screens.reduce(function (sum, value) {
      //Применение метода reduce
      return sum + +value.price;
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  isNumber: function (num) {
    //Проверка на пустоту, на число
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
      return num[0] !== " " && num.at(-1) !== " ";
    }
  },

  getFullPrice: function () {
    // Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг

    appData.fullPrice = Number(appData.screenPrice) + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  getTitle: function () {
    // Исправление названия (Удаление лишних пробелов, оформление названия с большой буквы)
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase();
  },

  getRollBackMessage: function (price) {
    //Получение скидки клиентом
    switch (true) {
      case price > 30000:
        return "Даем скидку в 10%";
        break;
      case price > 15000 && price <= 30000:
        return "Даем скидку в 5%";
        break;
      case price > 0 && price <= 15000:
        return "Скидка не предусмотрена";
        break;
      default:
        return "Что то пошло не так";
    }
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);

    console.log(appData.title);
    console.log(appData.services);
    console.log(appData.screens);
  },

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.getTitle();
    appData.logger();
  },
};

//appData.start(); Отключил основную программу, пока не перейдём по урокам к её обработке.

elementHTML.getInput();
elementHTML.print();
