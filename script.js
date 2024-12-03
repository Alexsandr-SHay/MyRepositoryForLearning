"use strict";

let title = "MyRepositoryForLearning";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = Math.random() * 100000;
let rollback = Math.random() * 100;
let fullPrice = 1000000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(
  "Стоимость верстки экранов " +
    screenPrice.toFixed(2) +
    " рублей, " +
    "Стоимость разработки сайта " +
    fullPrice.toFixed(2) +
    " рублей."
);
console.log(screens.toLowerCase().split(", "));
console.log(
  "Процент отката посреднику за работу " +
    (fullPrice * (rollback / 100)).toFixed(2)
);

title = prompt("Как называется наш проект");
screens = prompt("Какие типы экранов нужно разработать");
screenPrice = +prompt("Сколько будет стоить данная работа");
adaptive = confirm("Нужен ли адаптив на сайте");
let service1 = prompt("Какой тип услуги нужен");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой тип услуги нужен");
let servicePrice2 = +prompt("Сколько это будет стоить?");
fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

console.log(title + " " + screens + " " + screenPrice + " " + adaptive);
console.log(
  service1 + ", " + servicePrice1 + ", " + service2 + ", " + servicePrice2
);
console.log("Фул присе" + fullPrice);
console.log(servicePercentPrice);

switch (true) {
  case fullPrice > 30000:
    console.log("Даем скидку в 10%");
    break;
  case fullPrice > 15000 && fullPrice <= 30000:
    console.log("Даем скидку в 5%");
    break;
  case fullPrice > 0 && fullPrice <= 15000:
    console.log("Скидка не предусмотрена");
    break;
  default:
    console.log("Что то пошло не так");
}
