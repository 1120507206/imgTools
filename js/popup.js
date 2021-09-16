// let inputvalue = 4444;
// $("#test").click((e) => {
//   window.open(chrome.runtime.getURL("background.html"));
// });

// $("#backjs").click((e) => {
//   var bg = chrome.extension.getBackgroundPage();
//   bg.backjs();
// });
// $("#btoc").click((e) => {
//   // var bg = chrome.extension.getBackgroundPage();
//   // bg.btoc();
//   let rr = chrome.storage.sync.get("testvale", function () {});
//   alert(rr);
// });
// $("#ctob").click((e) => {
//   // var bg = chrome.extension.getBackgroundPage();
//   // bg.ctob();
//   let setmsg = { testvale: "这是chrome储存设置" };
//   chrome.storage.sync.set(setmsg, function () {});
//   alert(setmsg);
// });

// $("#setid").click((e) => {
//   var bg = chrome.extension.getBackgroundPage();
//   let id = $("#fileid").val();

//   // return;
//   bg.test(id);

//   //  alert(id)
//   localStorage.setItem("fileid", id);
// });
// // $("#pageid").val(inputvalue);

$("#save").click((e) => {
  var bg = chrome.extension.getBackgroundPage();
  let id = $("#fileid").val();
  let page = $("#pageid").val();
  let titletext = $("#titletext").val();
  titletext = titletext + "";
  let bigImg = false;
  // let imgopen = $("#imgopen").val();
  if ($("#imgopen").is(":checked")) {
    //这是选中了
    bigImg = true;
  }
  localStorage.setItem("bigImg", bigImg);
  localStorage.setItem("id", id);
  localStorage.setItem("page", page);
  localStorage.setItem("titletext", titletext);
  let msg = {
    id: id,
    page: page,
    bigImg: bigImg,
    titletext: titletext,
  };
  bg.getImgSrc(msg);
});
if (localStorage.getItem("id")) {
  let locid = localStorage.getItem("id");
  $("#fileid").val(locid);
}
if (localStorage.getItem("page")) {
  let locpage = localStorage.getItem("page");
  $("#pageid").val(locpage);
}
if (localStorage.getItem("titletext")) {
  let titletext = localStorage.getItem("titletext");
  $("#titletext").val(titletext);
}
if (localStorage.getItem("bigImg") == "true") {
  let bigImg = localStorage.getItem("bigImg");
  // $("#imgopen").val(bigImg);
  $("#imgopen").attr("checked", "checked");
} else {
  $("#imgopen").removeAttr("checked");
}

// $("#mesid").click((e) => {
//   localStorage.setItem("fileid", 99);
//   let uid = chrome.StorageArea.get("fileid");
// });
