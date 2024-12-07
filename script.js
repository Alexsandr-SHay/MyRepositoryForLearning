"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let fullPrice;
12;
let allServicePrices, servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
  //Проверка на пустоту, на число
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется наш проект", "Калькулятор верстки");
  screens = prompt("Какие типы экранов нужно разработать", "Простые, Сложные");

  do {
    screenPrice = prompt("Сколько будет стоить данная работа");
  } while (!isNumber(screenPrice));
  adaptive = confirm("Нужен ли адаптив на сайте");
};

const getAllServicePrices = function () {
  // возвращает сумму всех дополнительных услуг
  let sum = 0;
  let num;
  for (let i = 0; i < 2; i++) {
    num = NaN;
    if (i === 0) {
      service1 = prompt("Какой тип услуги нужен");
    } else if (i === 1) {
      service2 = prompt("Какой тип услуги нужен");
    }
    while (!isNumber(num)) {
      num = prompt("Сколько будет стоить данная работа");
    }
    sum += Number(num);
  }

  return sum;
};

const showTypeOF = function (variable) {
  //функция получения типов
  console.log(variable, typeof variable);
};

const getFullPrice = function () {
  // Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
  return Number(screenPrice) + allServicePrices;
};

const getServicePercentPrices = function () {
  return fullPrice - fullPrice * (rollback / 100);
};

const getTitle = function () {
  // Исправление названия (Удаление лишних пробелов, оформление названия с большой буквы)
  return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
};

const getRollBackMessage = function (price) {
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
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle();

showTypeOF(title);
showTypeOF(screenPrice);
showTypeOF(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(getRollBackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);
console.log(
  "Стоимость верстки экранов " +
    screenPrice +
    " юани и 'Стоимость разработки сайта' " +
    fullPrice +
    " юани"
);
