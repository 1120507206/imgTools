// const { reject } = require("async");

function ctob() {
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    alert(JSON.stringify(message)); //这里获取消息
  });
}

// var obj = [
//   {a:1},
//   {a:1},
//   {a:2},
// ]
function btoc() {
  //这是后台页向花瓣发送信息
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, obj, function (response) {});
  });
}

// chrome.contextMenus.create({
//   title: "图片获取",
//   onclick: function () {
//     chrome.tabs.executeScript(null, {
//       //这是向众图网注入脚本
//       code: `
//       javascript: console.log('这是获取图片脚本',${this.getid})

//   let arr = []

//   for (item of $(".zuopLs")) {
//    let obj = {
//    timeout: 3000,
// board_id:73462421,
// text: '',
// img_url: '',
// video: 0,
// link: '',
// var:2,
// check: false
//   }
//      if ($(item).children("img").attr("alt")) {
//       obj.text = $(item).children("img").attr("alt");
//     }
//     obj.link = $(item).attr("href");
//     obj.img_url = $(item).children("img").attr("src");
//     if (obj.img_url[0] == "/") {
//       obj.img_url = "https://www.ztupic.com" + obj.img_url;
//     }
//   arr.push(obj)

//   }

// window.open('https://huaban.com/bookmarklet_multiple/')
//     chrome.runtime.sendMessage(arr,function(){

// })
//     `,
//     });
//   },
// });
chrome.contextMenus.create({
  title: "图片发送",
  onclick: function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, array, function (response) {});
    });
  },
});
function test(id) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, id, function (response) {});
  });
}

var array = [];
var backarr = [];
var obj = {};
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  //这是后台页获取到众图网发过来的信息并保存
  if (message.stop) {
    console.log("结束采集 :>> ");
    this.setHuanbanMsg();
  } else {
    obj = message;
    array = array.concat(message.arr);
    if (message.isnoScript) {
      console.log("message.isnoScript :>> ", message.isnoScript);
    } else {
      this.getmessage();
    }
    // alert("这是后台的 arr");
    console.log("这是后台的 array :>> ", array);
    // window.open('https://huaban.com/bookmarklet_multiple/')
  }
});

async function setHuanbanMsg() {
  console.log("进入采集 :>> ");
  window.open("https://huaban.com/bookmarklet_multiple/");
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, array, function (response) {});
  // });
  this.sleep(10000).then(() => {
    console.log("这是延时10000,发送脚本 :>> ");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, array, function (response) {});
    });
  });
}

function openHhuaban() {
  return new Promise((resolve, reject) => {
    window.open("https://huaban.com/bookmarklet_multiple/");
    resolve();
  });
}

function getmessage() {
  alert("可以开始采集");
  array = [];
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, obj, function (response) {});
  });
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function getImgSrc(msg) {
  let page = msg.page;
  let id = msg.id;
  let bigImg = msg.bigImg;
  let titletext = msg.titletext;
  if (!msg.titletext) {
    titletext = false;
  }
  if (!msg.page) {
    page = 1;
  }

  chrome.tabs.executeScript(null, {
    //这是向众图网注入脚本
    code: `
      javascript: console.log('这是获取图片脚本',)



 let msgs  = {
    cont:${page},
    id:${id},
    bigImg: ${bigImg},
    titletext:'${titletext}',
  
  }
this.sleep(500).then(() => { chrome.runtime.sendMessage(msgs ,function(){

});}); 
function sleep (time) { return new Promise((resolve) => setTimeout(resolve, time))};
  
  
    `,
  });
}
