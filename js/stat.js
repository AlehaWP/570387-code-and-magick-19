'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var bottomY = CLOUD_Y + CLOUD_HEIGHT;
var GAP = 10;
var textHeight = 16;
var figureWidth = 40;
var figureMargin = 50;

var renderCloud = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  var paddingLeft = CLOUD_X + 2 * GAP;

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)', CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.font = 'none ' + textHeight + 'px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'top';

  ctx.fillText('Ура вы победили!', paddingLeft, CLOUD_Y + 2 * GAP);
  ctx.fillText('Список результатов:', paddingLeft, CLOUD_Y + 3 * GAP + textHeight);
  paddingLeft = CLOUD_X + 4 * GAP;
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], paddingLeft, bottomY - 3 * GAP);
    paddingLeft += (figureWidth + figureMargin);
  }

};
