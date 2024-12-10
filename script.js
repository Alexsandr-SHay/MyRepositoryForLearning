"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  fullPrice: 0,
  allServicePrices: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",

  asking: function () {
    appData.title = prompt("Как называется наш проект", "Калькулятор верстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать",
      "Простые, Сложные"
    );

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа");
    } while (!appData.isNumber(appData.screenPrice));
    appData.adaptive = confirm("Нужен ли адаптив на сайте");
  },

  isNumber: function (num) {
    //Проверка на пустоту, на число
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
      return num[0] !== " " && num.at(-1) !== " ";
    }
  },

  getAllServicePrices: function () {
    // возвращает сумму всех дополнительных услуг
    let sum = 0;
    let num;
    for (let i = 0; i < 2; i++) {
      num = NaN;
      if (i === 0) {
        appData.service1 = prompt("Какой тип услуги нужен");
      } else if (i === 1) {
        appData.service2 = prompt("Какой тип услуги нужен");
      }
      while (!appData.isNumber(num)) {
        num = prompt("Сколько будет стоить данная работа");
      }
      sum += Number(num);
    }

    return sum;
  },

  getAllServicePrices: function () {
    // возвращает сумму всех дополнительных услуг
    let sum = 0;
    let num;
    for (let i = 0; i < 2; i++) {
      num = NaN;
      if (i === 0) {
        appData.service1 = prompt("Какой тип услуги нужен");
      } else if (i === 1) {
        appData.service2 = prompt("Какой тип услуги нужен");
      }
      while (!appData.isNumber(num)) {
        num = prompt("Сколько будет стоить данная работа");
      }
      sum += Number(num);
    }

    return sum;
  },

  getFullPrice: function () {
    // Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг

    return Number(appData.screenPrice) + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  getTitle: function () {
    // Исправление названия (Удаление лишних пробелов, оформление названия с большой буквы)
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase()
    );
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
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(
      appData.screenPrice,
      appData.allServicePrices
    );
    appData.servicePercentPrice = appData.getServicePercentPrices(
      appData.fullPrice,
      appData.rollback
    );
    appData.title = appData.getTitle();
    for (let key in appData) {
      console.log("Ключ: " + key + " Значение: " + appData[key]);
    }
  },

  start: function () {
    appData.asking();
    appData.logger();
  },
};

appData.start();

console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);
