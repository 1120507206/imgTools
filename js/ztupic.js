chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  getid = message.id;
  console.log("j接收消息 :>> ", message);
  let cont = parseInt(0);
  let bigImg = message.bigImg;
  let titletext = message.titletext;
  // window.localStorage.removeItem('pri');
  console.log("接收消息中的contcont1 :>> ", cont);
  console.log("message.cont :>> ", message.cont);
  if (message.cont) {
    cont = parseInt(message.cont) - parseInt(cont);
  } else {
    cont = parseInt(0);
  }

  console.log("接收消息中的cont 计算过后 :>> ", cont);
  window.sessionStorage.setItem("start", true);
  window.localStorage.setItem("cont", cont);
  window.localStorage.setItem("getid", getid);
  window.localStorage.setItem("titletext", titletext);
  window.localStorage.setItem("bigImg", bigImg);

  this.test(getid);
});
let cont = parseInt(window.localStorage.getItem("cont"));
let id = window.localStorage.getItem("getid");
console.log("cont :>> ", cont);
console.log("typeof cont :>> ", typeof cont);
if (typeof cont == NaN) {
  console.log("进入if :>> ");
  cont = 0;
  window.localStorage.setItem("cont", 0);
}
if (cont > 0 && window.sessionStorage.getItem("start")) {
  console.log("这是本地的cont :>> ", cont);
  test(id);
  cont = cont - 1;
  window.localStorage.setItem("cont", cont);
}
if (cont == 0 && window.sessionStorage.getItem("start")) {
  console.log("这是准备结束 :>> ", cont);
  window.sessionStorage.setItem("stop", true);
  window.sessionStorage.removeItem("start");
}

if (window.sessionStorage.getItem("stop")) {
  console.log("这是准备结束1 :>> ");
  chrome.runtime.sendMessage({ stop: true }, function () {});
  // this.sleep(6000).then(() => {
  //     chrome.runtime.sendMessage({ stop: true }, function () {});
  //   });

  window.sessionStorage.removeItem("stop");
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function pageChange() {
  console.log("翻页 :>> ");
  let allPageDom = $(".page-item").children(".page-link");
  let text = $(".active").children(".page-link").text();
  let currentPage = $(".active").children(".page-link").text();
  currentPage = parseInt(currentPage);
  // console.log("currentPage :>> ", typeof currentPage);
  let goPage = parseInt(currentPage) + 1;

  let golink = $(allPageDom);
  // golink = $(golink).attr("href")
  let baserul = "https://www.ztupic.com/";
  let newlink = "";
  for (let i = 0; i < golink.length; i++) {
    if (goPage == $(golink[i]).text()) {
      let url = $(golink[i]).attr("href");
      if (url[0] == "/") {
        // console.log("这是老方法 :>> ", url);
        newlink = baserul + $(golink[i]).attr("href");
      } else {
        // console.log("这是新方法 :>> ", url);
        newlink = url;
      }
    }
  }

  console.log("当前页", currentPage);
  // console.log("newlink", newlink);
  console.log("跳转页", goPage);
  window.location.href = newlink;

  // $(allPageDom[goPage])[0].click();
}

function test(id) {
  console.log("id", id);
  // alert("这是最先注入的众图脚本,test");
  function scroll(i) {
    let scrollTop;
    let DocScroTop = document.documentElement.scrollTop;
    console.log("DocScroTop :>> ", DocScroTop);
    console.log("i :>> ", i);
    DocScroTop === 0 ? (scrollTop = 1000) : (scrollTop = DocScroTop + 1000);
    window.scrollTo(0, scrollTop);
    if (i == 6) {
      getData();
    }
  }
  for (let i = 0; i <= 6; i++) {
    setTimeout((timer) => {
      scroll(i);
    }, i * 100);
  }
  function getData() {
    let borid = id;

    let arr = [];

    for (item of $(".zuopLs")) {
      let obj = {
        timeout: 3000,
        board_id: id,
        text: "",
        img_url: "",
        video: 0,
        link: "",
        via: 3,
        check: true,
      };
      let isbigImg = window.localStorage.getItem("bigImg");
      let titletext = window.localStorage.getItem("titletext");

      if ($(item).children("img").attr("alt")) {
        obj.text = $(item).children("img").attr("alt");
      }

      if (titletext !== "false") {
        obj.text = titletext;
      }

      obj.link = $(item).attr("href");
      // obj.img_url = $(item).children("img").attr("src");
      obj.img_url = $(item).children("img").attr("data-src");
      src = $(item).children("img").attr("src");

      if (!obj.img_url) {
        obj.img_url = src;
      }

      if (obj.link) {
        if (obj.link[0] == "/") {
          obj.link = "https://www.ztupic.com" + obj.link;
        }
      }
      if (obj.img_url) {
        if (obj.img_url[0] == "/") {
          obj.img_url = "https://www.ztupic.com" + obj.img_url;
        }
      }
      if (isbigImg == "true") {
        obj.img_url = obj.img_url.slice(0, obj.img_url.indexOf("?"));
        console.log("isbigImg :>> ", isbigImg);
      }

      arr.push(obj);
    }
    let OBJarr = {
      isnoScript: true,
      arr: arr,
    };
    //window.open('https://huaban.com/bookmarklet_multiple/')
    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    sleep(500).then(() => {
      pageChange();
    });
    chrome.runtime.sendMessage(OBJarr, function () {});
  }
}
