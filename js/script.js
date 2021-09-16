console.log("这是脚本注入 :>> ");

var getarr = [];
let successCont = 0;
var arrlegth = 0;
let arrcont = 1;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("这是花瓣网的 message :>> ", message);
  this.getarr = message;
  arrlegth = message.length;
  // var arr = [
  //   {
  //     timeout: 3000,
  //     board_id: 73462421,
  //     text: "数组1",
  //     img_url:
  //       "https://img.ivsky.com/img/tupian/slides/202011/21/fuhuodao_shixiang-010.jpg",
  //     video: 0,
  //     link: "https://www.ivsky.com/tupian/fuhuodao_shixiang_v64465/",
  //     var: 2,
  //     check: false,
  //   },
  //   {
  //     board_id: 73462421,
  //     check: true,
  //     img_url: "https://www.ztupic.com/new20198/images1/lazyload.png",
  //     // img_url: "http://www.viewstock.com/storage2/thumbs/775000/775819x400.jpg",
  //     link: "https://www.ztupic.com/sucai/1548.html",
  //     text: "健身会所专用cad-众图网",
  //     timeout: 3000,
  //     var: 2,
  //     video: 0,
  //   },
  //   {
  //     timeout: 3000,
  //     board_id: 73462421,
  //     text: "数组4",
  //     img_url: "http://www.viewstock.com/storage2/thumbs/775000/775819x400.jpg",
  //     video: 0,
  //     link: "https://www.ivsky.com/tupian/fuhuodao_shixiang_v64465/",
  //     var: 2,
  //     check: false,
  //   },
  //   {
  //     timeout: 3000,
  //     board_id: 73462421,
  //     text: "数组5",
  //     img_url:
  //       "https://img.ivsky.com/img/tupian/slides/202011/21/fuhuodao_shixiang-010.jpg",
  //     video: 0,
  //     link: "https://www.ivsky.com/tupian/fuhuodao_shixiang_v64465/",
  //     var: 2,
  //     check: false,
  //   },
  //   {
  //     timeout: 3000,
  //     board_id: 73462421,
  //     text: "数组6",
  //     img_url: "http://www.viewstock.com/storage2/thumbs/775000/775878x400.jpg",
  //     video: 0,
  //     link: "https://www.ivsky.com/tupian/fuhuodao_shixiang_v64465/",
  //     var: 2,
  //     check: false,
  //   },
  // ];
  let borid = document
    .getElementById("bookmarklet_multiple")
    .childNodes[0].getAttribute("data-board-id");
  arr = message;
  // arr.map(item => {//这是让文件夹中的id等于选择的文件夹id
  //   item.board_id = borid
  // })

  // for (let i = 0; i <= arr.length; i++) {
  //   setTimeout((timer) => {
  //     // console.log(i);
  //     this.httpPostHuaBan(arr[i]);

  //   }, i * 10);
  // }
  for (let i = 0; i <= arr.length; i++) {
    // console.log(i);
    this.httpPostHuaBan(arr[i]);
  }
});

function urlChange(key, value) {
  if (value === null || value === "" || value === undefined) {
    return key + "=";
  }
  return key + "=" + value;
}
let arr = [
  {
    timeout: 3000,
    board_id: 73462421,
    text: "数组1",
    img_url:
      "https://img.ivsky.com/img/tupian/slides/202011/21/fuhuodao_shixiang-010.jpg",
    video: 0,
    link: "https://www.ivsky.com/tupian/fuhuodao_shixiang_v64465/",
    var: 2,
    check: false,
  },
  {
    timeout: 3000,
    board_id: 73462421,
    text: "数组3",
    img_url: "http://www.viewstock.com/storage2/thumbs/636000/636063x400.jpg",
    video: 0,
    link: "https://www.ivsky.com/tupian/fuhuodao_shixiang_v64465/",
    var: 2,
    check: false,
  },
  {
    timeout: 3000,
    board_id: 73462421,
    text: "数组4",
    img_url: "http://www.viewstock.com/storage2/thumbs/775000/775819x400.jpg",
    video: 0,
    link: "https://www.ivsky.com/tupian/fuhuodao_shixiang_v64465/",
    var: 2,
    check: false,
  },
  {
    timeout: 3000,
    board_id: 73462421,
    text: "数组5",
    img_url:
      "https://img.ivsky.com/img/tupian/slides/202011/21/fuhuodao_shixiang-010.jpg",
    video: 0,
    link: "https://www.ivsky.com/tupian/fuhuodao_shixiang_v64465/",
    var: 2,
    check: false,
  },
  {
    timeout: 3000,
    board_id: 73462421,
    text: "数组6",
    img_url: "http://www.viewstock.com/storage2/thumbs/775000/775878x400.jpg",
    video: 0,
    link: "https://www.ivsky.com/tupian/fuhuodao_shixiang_v64465/",
    var: 2,
    check: false,
  },
];
let id = 73462421; //这是收藏夹id
// for(let i=0;i<=arr.length;i++){
// 	setTimeout ( timer=> {
//     console.log(i)

//      httpPostHuaBan(arr[i],id)
//     }, i*3000)
// }

async function httpPostHuaBan(msg) {
  // console.log("getarr :>> ", this.getarr);
  let obj = msg;
  let timeout = urlChange("?timeout", obj.timeout);
  let board_id = urlChange("&board_id", obj.board_id);
  let text = urlChange("&text", obj.text);
  let img_url = urlChange("&img_url", obj.img_url);
  let link = urlChange("&link", obj.link);
  let check = urlChange("&check", obj.check);
  let via = urlChange("&via", obj.via);
  let baseUrl = timeout + board_id + text + img_url + link + check + via;

  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  // console.log("arrcont :>> ", arrcont);
  // console.log("arrlegth :>> ", arrlegth);

  xhr.addEventListener("readystatechange", function () {
    // console.log("arrcont :>> ", arrcont);
    // console.log("arrlegth :>> ", arrlegth);
    if (this.readyState === 4) {
      arrcont++; //这是计数用的

      let str = xhr.response;
      let res = eval("(" + str + ")");
      // console.log("str :>> ", str);
      if (res.warning === 100) {
        console.log("该图片已被采集过!!!  ");
      }
      if (!res.warning && res.pin) {
        successCont++;
        console.log("成功采集 :>> ", successCont);
      }
      if (arrcont == arrlegth) {
        alert("采集已完成!" + "共成功采集" + successCont);
      }
    }
  });

  xhr.open("POST", "https://huaban.com/pins/");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.send(baseUrl);
}

// setTimeout(() => {
//   httpPostHuaBan(arr,id)
// }, 3000);

// function urlChange(key, value) {
//   if (value === null || value === '' || value === undefined) {
//     return key + '='
//   }
//   return key + '=' + value
// }

// // let id = 73462421//这是收藏夹id
// for(let i=0;i<=arr.length;i++){
// 	setTimeout ( timer=> {
//     console.log(i)

//      httpPostHuaBan(arr[i])
//     }, i*3000)
// }

// async function httpPostHuaBan(msg) {

//     let obj = msg
//     let timeout =  this.urlChange('?timeout', obj.timeout)
// let board_id =  this.urlChange('&board_id', obj.board_id)
// let text =  this.urlChange('&text', obj.text)
//   let via = this.urlChange('&via', obj.via)
//   let media_type = 0
//   let  video = 0
// let img_url = this.urlChange('&img_url', obj.img_url)
// let link = this.urlChange('&link', obj.link)
//   let check = this.urlChange('&check', obj.check)

//     let baseUrl = timeout + board_id + text + via  + media_type+ img_url  + video+ link + check
//     console.log('baseUrl :>> ', baseUrl);
//     let xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function() {
//   if (this.readyState === 4) {
//   //  this.responseText =  JSON.parse(this.responseText)
//     if (this.responseText.warning === this.responseText) {
//       console.log('该图片已被采集过!!!  ',);
//     } else {
//       console.log('成功采集:', typeof this.responseText,this.responseText.pin);
//     }

//   }
// });

// xhr.open("POST", "https://huaban.com/pins/");
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

//  xhr.send(baseUrl);
//   }
