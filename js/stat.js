'use strict';

var GAP = 10;
var CLOUD = {
  width: 420,
  height: 270,
  x: 100,
  y: 10,
  contentX: 120,
  contentY: 30,
  bottomContentY: 250,
  gap: 10,
  text: {
    height: 16,
    color: '#000'
  }
};

var TEXT_PARAMS = {
  height: 16,
  color: '#000'
};

// Функция рисования  облака
var renderCloudRect = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var writeInCloud = function (ctx, x, y, text, textParams, marginBottom) {
  ctx.font = 'none ' + textParams.height + 'px PT Mono';
  ctx.fillStyle = textParams.color;
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
  return y + textParams.height + marginBottom;
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

var paintPlayerStatistics = function (name, time, secInPixel, textParams, ctx, x, y, margin) {
  var columnHeight = Math.round(secInPixel * time);
  var columnWidth = 40;
  var columnMargin = 50;
  writeInCloud(ctx, x, y, name, textParams, margin);
  renderCloudRect(ctx, x, y - margin, getColumnColor(name), columnWidth, -columnHeight);
  writeInCloud(ctx, x, y - columnHeight - 3 * margin, Math.round(time), textParams, margin);

  return x + columnWidth + columnMargin;
};

window.renderStatistics = function (ctx, names, times) {
  var cursorY = CLOUD.contentY;

  // Рисуем облако
  renderCloudRect(ctx, CLOUD.x + GAP, CLOUD.y + GAP, 'rgba(0, 0, 0, 0.7)', CLOUD.width, CLOUD.height);
  renderCloudRect(ctx, CLOUD.x, CLOUD.y, '#fff', CLOUD.width, CLOUD.height);

  cursorY = writeInCloud(ctx, CLOUD.contentX, cursorY, 'Ура вы победили!', TEXT_PARAMS, GAP);
  writeInCloud(ctx, CLOUD.contentX, cursorY, 'Список результатов:', TEXT_PARAMS, GAP);

  // Определяем начальную велечину отступа слева для колонки
  var cursorX = CLOUD.contentX + 2 * GAP;
  // Рисуем гистограмму
  var oneSecInPixel = getOneSecInPixel(150 - GAP - TEXT_PARAMS.height, times);
  for (var i = 0; i < names.length; i++) {
    cursorX = paintPlayerStatistics(names[i], times[i], oneSecInPixel, TEXT_PARAMS, ctx, cursorX, CLOUD.bottomContentY, GAP);
  }
};
