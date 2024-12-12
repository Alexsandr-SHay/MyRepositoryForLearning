"use strict";

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

  // asking: function () {
  //   appData.title = prompt("Как называется наш проект", "Калькулятор верстки");

  //   for (let i = 0; i < 2; i++) {
  //     let name = prompt("Какие типы экранов нужно разработать");
  //     let price = 0;

  //     do {
  //       price = prompt("Сколько будет стоить данная работа");
  //     } while (!appData.isNumber(price));

  //     appData.screens.push({ id: i, name: name, price: price });
  //   }

  //   for (let i = 0; i < 2; i++) {
  //     let name = prompt("Какой тип услуги нужен");
  //     let price = 0;

  //     do {
  //       price = prompt("Сколько будет стоить данная работа");
  //     } while (!appData.isNumber(price));

  //     appData.services[name] = +price;
  //     //appData.services[indexServise] = i;
  //   }

  //   appData.adaptive = confirm("Нужен ли адаптив на сайте");
  // },

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
      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа");
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
      //appData.services[indexServise] = i;
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
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

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

appData.start();
