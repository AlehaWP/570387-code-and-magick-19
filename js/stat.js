'use strict';

var GAP = 10;
var TEXT_HEIGHT = 16;
var Player = {
  NAME: 'Вы',
  COLOR: 'rgba(255, 0, 0, 1)'
};

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  CONTENT_X: 120,
  CONTENT_Y: 30,
  CONTENT_RIGHT_X: 500,
  CONTENT_BOTTOM_Y: 240,
  COLOR: '#fff',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
};

var Column = {
  WIDTH: 40,
  MAX_HEIGHT: 150 - GAP - TEXT_HEIGHT,
  MARGIN_RIGHT: 50,
  BASE_COLOR: '240'
};

var writeInCloud = function (ctx, x, y, text) {
  ctx.font = 'none ' + TEXT_HEIGHT + 'px PT Mono';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#000';
  ctx.fillText(text, x, y);
};

// Функция рисования  облака
var renderCloud = function (ctx) {
  ctx.fillStyle = Cloud.SHADOW_COLOR;
  ctx.fillRect(Cloud.X + GAP, Cloud.Y + GAP, Cloud.WIDTH, Cloud.HEIGHT);
  ctx.fillStyle = Cloud.COLOR;
  ctx.fillRect(Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT);
};

var getMaxValue = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomColor = function () {
  var saturationValue = Math.round(Math.random() * 100);
  return 'hsl(' + Column.BASE_COLOR + ',' + saturationValue + '%,50%)';
};


var getColumnColorByName = function (name) {
  if (name.toLowerCase() === Player.NAME.toLowerCase()) {
    return Player.COLOR;
  }
  return getRandomColor();
};

var paintHistogram = function (ctx, names, times) {
  var maxTime = getMaxValue(times);
  var oneSecInPixel = Column.MAX_HEIGHT / maxTime;
  var cursorX = Cloud.CONTENT_X + 2 * GAP;
  // Все рисуется от низа отсюда - в перемещении курсора по Y
  for (var i = 0; i < names.length; i++) {
    var columnHeight = oneSecInPixel * times[i];
    var cursorY = Cloud.CONTENT_BOTTOM_Y;
    writeInCloud(ctx, cursorX, cursorY, names[i]);
    ctx.fillStyle = getColumnColorByName(names[i]);
    cursorY -= GAP;
    ctx.fillRect(cursorX, cursorY, Column.WIDTH, -columnHeight);
    cursorY -= (2 * GAP + columnHeight);
    writeInCloud(ctx, cursorX, cursorY, Math.round(times[i]));
    // Передвигаем курсор на новую точку для рисования следующей колонки
    cursorX += Column.WIDTH + Column.MARGIN_RIGHT;
  }
};

window.renderStatistics = function (ctx, names, times) {
  var cursorX = Cloud.CONTENT_X;
  var cursorY = Cloud.CONTENT_Y;
  renderCloud(ctx);
  writeInCloud(ctx, cursorX, cursorY, 'Ура вы победили!');
  cursorY = cursorY + TEXT_HEIGHT + GAP;
  writeInCloud(ctx, cursorX, cursorY, 'Список результатов:');
  paintHistogram(ctx, names, times);
};
