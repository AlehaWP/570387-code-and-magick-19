'use strict';

// Функция рисования  облака
var renderRect = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderCloud = function (ctx, gap) {
  var CLOUD = {
    width: 420,
    height: 270,
    x: 100,
    y: 10,
  };

  var content = {
    x: CLOUD.x + 2 * gap,
    y: CLOUD.y + 2 * gap,
    bottomY: CLOUD.y + CLOUD.height - 3 * gap,
    bottomX: CLOUD.x + CLOUD.width - 2 * gap
  };

  renderRect(ctx, CLOUD.x + gap, CLOUD.y + gap, 'rgba(0, 0, 0, 0.7)', CLOUD.width, CLOUD.height);
  renderRect(ctx, CLOUD.x, CLOUD.y, '#fff', CLOUD.width, CLOUD.height);
  return content;
};

var setCtxFont = function (ctx, height) {
  ctx.font = 'none ' + height + 'px PT Mono';
  ctx.textBaseline = 'top';
};

var writeInCloud = function (ctx, x, y, text) {
  ctx.fillStyle = '#000';
  ctx.fillText(text, x, y);
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

var paintPlayerStatistics = function (ctx, x, y, name, time, secInPixel, margin) {
  var columnHeight = Math.round(secInPixel * time);
  var columnWidth = 40;
  var columnMargin = 50;
  writeInCloud(ctx, x, y, name);
  renderRect(ctx, x, y - margin, getColumnColor(name), columnWidth, -columnHeight);
  writeInCloud(ctx, x, y - columnHeight - 3 * margin, Math.round(time));

  return x + columnWidth + columnMargin;
};

window.renderStatistics = function (ctx, names, times) {
  var GAP = 10;
  var textHeight = 16;

  setCtxFont(ctx, textHeight);
  // Рисуем облако, возвращаем координаты области контента
  var contentArea = renderCloud(ctx, GAP);
  var cursorX = contentArea.x;
  var cursorY = contentArea.y;

  writeInCloud(ctx, cursorX, cursorY, 'Ура вы победили!');
  cursorY = cursorY + textHeight + GAP;
  writeInCloud(ctx, cursorX, cursorY, 'Список результатов:');

  // Определяем начальную велечину отступа слева для колонки
  cursorX += 2 * GAP;
  cursorY = contentArea.bottomY;
  // Рисуем гистограмму
  var oneSecInPixel = getOneSecInPixel(150 - GAP - textHeight, times);
  for (var i = 0; i < names.length; i++) {
    cursorX = paintPlayerStatistics(ctx, cursorX, cursorY, names[i], times[i], oneSecInPixel, GAP);
  }
};
