import $ from 'jquery';

$(function () {
  var index = 0;
  var cfg = {
    step: parseInt($('.swiper-slide').height()),
    max: 70,
    min: parseInt($('.swiper-container').height()) - parseInt($('.swiper-wrapper').height()) - 70
  };

  $('.swiper-slide').removeClass('active').eq(index).addClass('active')
  $('.swiper-slide').eq(index+1).addClass('active');
  $('#slide').bind("touchstart",function(e){
    //记录初始位置
    cfg.start = e.originalEvent.targetTouches[0].clientY;
    cfg.cur = parseInt($('.swiper-wrapper').css('top'));
  }).bind('touchmove', function(e) {
    e.preventDefault();
  });

  //touch结束
  $('#slide').bind("touchend", function(e) {
    var end = e.originalEvent.changedTouches[0].clientY;

    $('.bao-wrap img').removeClass('to-bottom').removeClass('to-top')
    
    if(end - cfg.start > 10) {
      up();
    } else if(end - cfg.start < -10) {
      down();
    }

    $('.move-tip').hide();
    
    $('.swiper-slide').removeClass('active').eq(index).addClass('active')
    $('.swiper-slide').eq(index+1).addClass('active');
  })

  function up() {
    var res = parseInt($('.swiper-wrapper').css('top')) + cfg.step;
    if(res > cfg.max) {
      return;
    }
    $('.swiper-wrapper').css('top', res);
    index--;
    hasR = [];
    $('.bao-wrap img').eq(getRandomIndexLeft()).addClass('to-bottom').css('animationDelay', getDelay() + 's');
    $('.bao-wrap img').eq(getRandomIndexRight()).addClass('to-bottom').css('animationDelay', getDelay() + 's');
  }

  function down() {
    var res = parseInt($('.swiper-wrapper').css('top')) - cfg.step;

    if(res < cfg.min) {
      setTimeout(function () {
        $('#end').show();
        $('#slide').remove();
      }, 2000)

      setTimeout(function () {
        $('.share-tip').show();
      }, 5000);
      
      return;
    }
    $('.swiper-wrapper').css('top', res);
    index++;
    hasR = [];
    $('.bao-wrap img').eq(getRandomIndexLeft()).addClass('to-top').css('animationDelay', getDelay() + 's');
    $('.bao-wrap img').eq(getRandomIndexRight()).addClass('to-top').css('animationDelay', getDelay() + 's');
  }

})
var hasR = [];

function getRandomIndex() {
  var res = parseInt(6 * Math.random());

  if(hasR.indexOf(res) >= 0) {
    return getRandomIndex();
  } 
  return res;
}

function getRandomIndexLeft() {
  var res = getRandomIndex();

  hasR.push(res);

  return res;
}

function getRandomIndexRight() {
  var res = 6 + getRandomIndex();

  hasR.push(res);

  return res;
}

function getDelay() {
  return Math.random();
}