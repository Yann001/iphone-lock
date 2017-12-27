/**
 * Pass 类构造函数
 * @constructor
 */
function Pass() {
  this.pwd = '123456';
  this.cache = '';
  this.lightPanel = document.querySelector('.light');
  this.lights = document.querySelectorAll('.light>span');
  this.btnDelete = document.querySelector('#delete-js');
  this.homePage = document.querySelector('.home');
  this.lockApp = document.querySelector('.home .lock');
}
// Pass 类原型方法
Pass.prototype = {
  /**
   * 初始化函数，绑定删除按钮及锁屏按钮事件
   */
  init: function () {
    var that = this;
    that.btnDelete.addEventListener('click', function () {
      that.sub();
      that.renderLight();
      that.renderBtnText();
    });
    that.lockApp.addEventListener('click', function () {
      that.lock();
    });
  },
  /**
   * 添加一位密码到缓存区
   * @param {Number} num 需要添加的数字
   */
  add: function (num) {
    if (this.cache.length === 6) {
      this.cache = num;
    } else {
      this.cache += num;
    }
  },
  /**
   * 从缓存区移除最后一位密码
   */
  sub: function () {
    this.cache = this.cache.substring(0, this.cache.length - 1);
  },
  /**
   * 验证密码是否正确
   * @return {Boolean} true: 正确，false: 不正确
   */
  validate: function () {
    if (this.cache === this.pwd) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 渲染按键样式
   * @param {Element} key dom节点
   */
  renderKey: function (key) {
    key.classList.add('active');
  },
  /**
   * 渲染提示圆点样式
   */
  renderLight: function () {
    this.lights.forEach(function (item) {
      item.className = '';
    });
    for (var i = 0, len = this.cache.length; i < len; i++) {
      this.lights[i].className = 'active';
    }
  },
  /**
   * 渲染按钮文字
   */
  renderBtnText: function () {
    if (this.cache) {
      this.btnDelete.innerText = 'Delete';
    } else {
      this.btnDelete.innerText = 'Cancel';
    }
  },
  /**
   * 晃动提示圆点
   */
  shakeLight: function () {
    this.lightPanel.style.animation = 'shake 250ms';
    var that = this;
    setTimeout(function () {
      that.lightPanel.style.animation = '';
    }, 300);
  },
  /**
   * 重置页面配置
   */
  reset: function () {
    this.cache = '';
    this.btnDelete.innerText = 'Cancel';
    this.renderLight();
  },
  /**
   * 解锁操作
   */
  unlock: function () {
    this.homePage.style.left = 0;
    this.homePage.style.opacity = 1;
  },
  /**
   * 锁屏操作
   */
  lock: function () {
    this.homePage.style.left = '-375px';
    this.homePage.style.opacity = 0;
  }
};
// 实例化Pass类
var pass = new Pass();
// 获取按键区域dom
var keyArea = document.querySelector('.key');
// 解锁初始化
pass.init();
// 绑定键盘区事件
keyArea.addEventListener('click', function (e) {
  var num, key;
  if (e.target.tagName === 'DIV' && e.target.classList.contains('item')) {
    key = e.target;
    num = key.querySelector('.num').innerText;
  } else if (e.target.tagName === 'SPAN') {
    key = e.target.parentNode;
    num = key.querySelector('.num').innerText;
  }
  if (key) {
    pass.add(num);
    pass.renderKey(key);
    pass.renderLight();
    pass.renderBtnText();
    if (pass.cache.length === 6) {
      if (pass.validate()) {
        pass.unlock();
        pass.reset();
      } else {
        pass.reset();
        pass.shakeLight();
      }
    }
  }
});
// 获取所有按键
var keys = keyArea.querySelectorAll('.item');
// 单个按键事件绑定（PC）
keys.forEach(function (key) {
  key.addEventListener('mouseout', function () {
    this.classList.remove('active');
  });
});
// 单个按钮事件绑定（Phone）
keys.forEach(function (key) {
  key.addEventListener('touchend', function () {
    this.classList.remove('active');
  });
});
