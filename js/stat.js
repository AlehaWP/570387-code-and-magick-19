'use strict';

// Функция рисования  прямоугольника
var renderRect = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var setCtxFont = function (ctx, height) {
  ctx.font = 'none ' + height + 'px PT Mono';
  ctx.textBaseline = 'top';
};

var writeInCloud = function (ctx, x, y, text) {
  ctx.fillStyle = '#000';
  ctx.fillText(text, x, y);
};
// Функция рисования  облака
var renderCloud = function (ctx, gap, cloud) {
  var content = {
    x: cloud.x + 2 * gap,
    y: cloud.y + 2 * gap,
    bottomY: cloud.y + cloud.height - 3 * gap,
    bottomX: cloud.x + cloud.width - 2 * gap
  };

  renderRect(ctx, cloud.x + gap, cloud.y + gap, 'rgba(0, 0, 0, 0.7)', cloud.width, cloud.height);
  renderRect(ctx, cloud.x, cloud.y, '#fff', cloud.width, cloud.height);
  return content;
};

var getOneSecInPixel = function (maxHeight, arrTimes) {
  return maxHeight / Math.max.apply(null, arrTimes);
};

var getRandomColor = function (color) {
  var saturationValue = Math.round(Math.random() * 100);
  return 'hsl(' + color + ',' + saturationValue + '%,50%)';
};

var getColumnColor = function (name) {
  if (name.toLowerCase() === 'вы') {
    return 'rgba(255, 0, 0, 1)';
  }
  return getRandomColor('240');
};

var paintPlayerStatistics = function (ctx, x, y, column) {
  writeInCloud(ctx, x, y, column.name);
  renderRect(ctx, x, y - column.gap, column.color, column.width, -column.height);
  writeInCloud(ctx, x, y - column.height - 3 * column.gap, column.result);
};

var paintHistogram = function (ctx, cursorX, cursorY, names, times, histogramHeight, textHeight, gap) {
  var oneSecInPixel = getOneSecInPixel(histogramHeight - gap - textHeight, times);
  var column = {
    width: 40,
    margin: 50,
    gap: gap
  };
  for (var i = 0; i < names.length; i++) {
    column.height = oneSecInPixel * times[i];
    column.name = names[i];
    column.result = Math.round(times[i]);
    column.color = getColumnColor(names[i]);
    paintPlayerStatistics(ctx, cursorX, cursorY, column);
    cursorX += column.width + column.margin;
  }
};

window.renderStatistics = function (ctx, names, times) {
  var cloud = {
    width: 420,
    height: 270,
    x: 100,
    y: 10,
  };
  var gap = 10;
  var textHeight = 16;
  var histogramHeight = 150;

  setCtxFont(ctx, textHeight);
  // Рисуем облако, возвращаем координаты области контента
  var contentArea = renderCloud(ctx, gap, cloud);
  var cursorX = contentArea.x;
  var cursorY = contentArea.y;

  writeInCloud(ctx, cursorX, cursorY, 'Ура вы победили!');
  cursorY = cursorY + textHeight + gap;
  writeInCloud(ctx, cursorX, cursorY, 'Список результатов:');

  // Определяем начальную велечину отступа слева для колонки
  cursorX += 2 * gap;
  cursorY = contentArea.bottomY;
  // Рисуем гистограмму
  paintHistogram(ctx, cursorX, cursorY, names, times, histogramHeight, textHeight, gap);
};
