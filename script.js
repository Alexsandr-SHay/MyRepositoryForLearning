"use strict";

let title = prompt("Как называется наш проект");
let screens = prompt("Какие типы экранов нужно разработать");
let screenPrice = +prompt("Сколько будет стоить данная работа");
let adaptive = confirm("Нужен ли адаптив на сайте");
let service1 = prompt("Какой тип услуги нужен");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой тип услуги нужен");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = Math.random() * 100;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let allServicePrices, servicePercentPrice;

const showTypeOF = function (variable) {
  console.log(variable, typeof variable);
};

const getRollBackMessage = function (price) {
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

const getAllServicePrices = function (servicePrice1, servicePrice2) {
  // возвращает сумму всех дополнительных услуг
  return servicePrice1 + servicePrice2;
};

const getFullPrice = function (screenPrice, allServicePrices) {
  // Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
  return screenPrice + allServicePrices;
};

const getTitle = function (title) {
  // 3 Корректировка названия проекта
  title = title.trim().toLowerCase();
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const getServicePercentPrices = function (fullPrice, rollback) {
  return fullPrice - Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

showTypeOF(title);
showTypeOF(screenPrice);
showTypeOF(adaptive);
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2); // 1 задание
fullPrice = getFullPrice(screenPrice, allServicePrices); //2 задание
servicePercentPrice = getServicePercentPrices(fullPrice, rollback); // 3 задание

console.log(screens);
console.log("Скидка пользователя " + getRollBackMessage(fullPrice));
console.log(
  "Стоимость услуги без учёта отката " +
    getServicePercentPrices(fullPrice, rollback)
);
