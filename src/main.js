import $ from 'jquery';
import 'common/scss/index.scss';
import { preLoad } from 'common/js/base.js';
// 加载控制
import loader from './loader.js';
// 首屏动画控制
import Animater from './Animater.js';
//分享
import './share.js';
//slider
import './slider.js';

window.canplay = 0;

var animater;

/**
 * 开始动画的控制
 */
document.addEventListener("WeixinJSBridgeReady",function(){
  $('.js-video').get(0).load();
  $('.js-video-2').get(0).load();
  $('#ling')[0].load();
},!1);

function startCb() {
  $('.child').width('100%');

  setTimeout(function () {
    $('#loading').fadeOut();
    $('#masker').fadeIn();

    animater = new Animater();
    animater.init();
  }, 1000)
}

loader(startCb)

//视频可以进行播放的时候
$('.js-video').get(0).addEventListener('canplaythrough',function(){
  window.canplay = 1;

  if(window.imgcan) {
    startCb();
  }
})

//控制铃声时间
$('.js-video').on('playing', function(e) {
  event.preventDefault();

  setTimeout(function () {
    $('#ling')[0].play();
  }, 65 * 1000);
});

//第一段视频播完，展示语音页面
$('.js-video').on('ended',function(){
  showBtn();
  setTimeout(function () {
    $('.js-video-wrapper').remove();
  }, 1000);
})

//点击接听
$('.right').click(function () {
  $('.js-video-wrapper-2').show();
  $('#phone').remove();
  $('#ling').remove()
  $('.js-video-2')[0].play();
});

//第二段视频结束，播放h5  (slide)
$('.js-video-2').on('ended',function(){
  $('#slide').show();
  $('.move-tip').show();

  setTimeout(function () {
    $('.js-video-wrapper-2').remove();
  }, 1000);
})

//left-finger点击，出分享
$('.finger_left').on('touchstart', function() {
  event.preventDefault();
  $('.finger_right').fadeIn();
  $('.share_tip').fadeIn();
  $('.share-tip').fadeOut();
  $('.txt_03').removeClass('fadeIn').addClass('fadeOut').css('animationDelay', '0s');
});

function showBtn() {
  $('#phone').show();
}

var has = 0;

var cfg = {
  max: $('#masker').height() - window.innerHeight
}

//拖动开始播放视频
$('#masker').on('touchstart', function(e) {
  event.preventDefault();
  animater.stop();
  cfg.start = e.originalEvent.targetTouches[0].clientY;
  cfg.cur = parseInt($(this).css('top') )|| 0
}).on('touchmove', function(e) {
  event.preventDefault();

  var changed = e.originalEvent.targetTouches[0].clientY - cfg.start;
  var result = cfg.cur + changed;
  var max = -cfg.max + 10;

  result > 0 ? result = 0 : '';
  result < max ? result = max : '';

  cfg.changed = changed;
  $(this).css('top', result);
}).on('touchend',function(){
  if(has) {
    return;
  }

  if (cfg.changed < -10) {
    has = 1;

    $('#masker').css('top', -215 + 'px');

    setTimeout(function () {
      $('#masker').remove();
      $('.js-video-wrapper').show();
      $('.js-video').get(0).play();
    }, 500);
  } else {
    animater.continue();
  }
})



