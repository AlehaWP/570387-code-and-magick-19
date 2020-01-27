'use strict';

var GAP = 10;
var TEXT_HEIGHT = 16;

var CLOUD = {
  width: 420,
  height: 270,
  x: 100,
  y: 10,
  contentX: 120,
  contentY: 30,
  contentRightX: 500,
  contentBottomY: 240
};

var writeInCloud = function (ctx, x, y, text) {
  ctx.font = 'none ' + TEXT_HEIGHT + 'px PT Mono';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#000';
  ctx.fillText(text, x, y);
};

// Функция рисования  облака
var renderCloud = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD.x + GAP, CLOUD.y + GAP, CLOUD.width, CLOUD.height);
  ctx.fillStyle = '#fff';
  ctx.fillRect(CLOUD.x, CLOUD.y, CLOUD.width, CLOUD.height);
};

var getMaxValue = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomColor = function () {
  var saturationValue = Math.round(Math.random() * 100);
  return 'hsl(240,' + saturationValue + '%,50%)';
};


var getColumnColorByName = function (name) {
  if (name.toLowerCase() === 'вы') {
    return 'rgba(255, 0, 0, 1)';
  }
  return getRandomColor();
};

var paintHistogram = function (ctx, names, times) {
  var columnWidth = 40;
  var columnMargin = 50;
  var histogramHeight = 150;
  var placeForColumnsHeight = histogramHeight - GAP - TEXT_HEIGHT;
  var maxTime = getMaxValue(times);
  var oneSecInPixel = placeForColumnsHeight / maxTime;
  var cursorX = CLOUD.contentX + 2 * GAP;
  var cursorY = CLOUD.contentBottomY;
  // Все рисуется от низа отсюда - в перемещении курсора по Y
  for (var i = 0; i < names.length; i++) {
    var columnHeight = oneSecInPixel * times[i];
    writeInCloud(ctx, cursorX, cursorY, names[i]);
    ctx.fillStyle = getColumnColorByName(names[i]);
    cursorY -= GAP;
    ctx.fillRect(cursorX, cursorY, columnWidth, -columnHeight);
    cursorY -= (2 * GAP + columnHeight);
    writeInCloud(ctx, cursorX, cursorY, Math.round(times[i]));
    // Передвигаем курсор на новую точку для рисования следующей колонки
    cursorX += columnWidth + columnMargin;
    cursorY = CLOUD.contentBottomY;
  }
};

window.renderStatistics = function (ctx, names, times) {
  var cursorX = CLOUD.contentX;
  var cursorY = CLOUD.contentY;
  renderCloud(ctx);
  writeInCloud(ctx, cursorX, cursorY, 'Ура вы победили!');
  cursorY = cursorY + TEXT_HEIGHT + GAP;
  writeInCloud(ctx, cursorX, cursorY, 'Список результатов:');
  paintHistogram(ctx, names, times);
};
