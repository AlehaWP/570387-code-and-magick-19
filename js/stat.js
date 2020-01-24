'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var bottomY = CLOUD_Y + CLOUD_HEIGHT;
var GAP = 10;
var textHeight = 16;
// Функция рисования  облака
var renderCloud = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  var columnWidth = 40;
  var columnMargin = 50;
  var histogramHeight = 150;
  var textColor = '#000';
  var paddingLeft = CLOUD_X + 2 * GAP;
  var i;
  var saturationValue = 0;
  var maxColumnHeight = histogramHeight - GAP - textHeight;
  var oneSecondPixel = 0;
  var columnHeight = 0;
  var myIndex;
  var tempTime;
  var maxTime = 0;
  // Ищем максимальное время
  for (i = 0; i < times.length; i++) {
    times[i] = Math.round(times[i]);
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  // Вычисляем вес одной секунды в пикселях
  oneSecondPixel = maxColumnHeight / maxTime;

  // Рисуем облако
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', CLOUD_WIDTH, CLOUD_HEIGHT);

  // Определяем шрифт и цвет текста по умолчанию
  ctx.font = 'none ' + textHeight + 'px PT Mono';
  ctx.fillStyle = textColor;
  ctx.textBaseline = 'top';
  // Пишем заголовок
  ctx.fillText('Ура вы победили!', paddingLeft, CLOUD_Y + 2 * GAP);
  ctx.fillText('Список результатов:', paddingLeft, CLOUD_Y + 3 * GAP + textHeight);
  // Переставляем Вы на первое место
  myIndex = names.indexOf('Вы');
  if (!myIndex.isNan) {
    names[myIndex] = names[0];
    names[0] = 'Вы';
    tempTime = times[0];
    times[myIndex] = times[0];
    times[0] = tempTime;
  }
  // Определяем начальную велечину отступа слева для колонки
  paddingLeft = CLOUD_X + 4 * GAP;
  // Рисуем гистограмму
  for (i = 0; i < names.length; i++) {
    // Вычисляем высоту колонки
    columnHeight = Math.round(oneSecondPixel * times[i]);

    // Устанавливаем цвет колонки. Первая красная, остальные оттенки синего с рандомным смещением
    if (i === 0) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      saturationValue = Math.round(Math.random() * 100);
      ctx.fillStyle = 'hsl(240,' + saturationValue + '%,50%)';
    }

    // Рисуем колонку и подписываем. Все отсчитываем от низ облака
    ctx.fillRect(paddingLeft, bottomY - 4 * GAP, columnWidth, -columnHeight);
    ctx.fillStyle = textColor;
    ctx.fillText(times[i], paddingLeft, bottomY - 6 * GAP - columnHeight);
    ctx.fillText(names[i], paddingLeft, bottomY - 3 * GAP);
    // Смещаем отступ для следующей колонки
    paddingLeft += (columnWidth + columnMargin);
  }

};
