function genericOnClick(info, tab) {
    //console.log(info)
    //console.log(info.pageUrl);
    //console.log(tab)
    var url = info.linkUrl;
    var testRE;
    if (info.pageUrl.match("http(s|):\/\/www.google")) {
        testRE = url.match("url=([^&]*)&");

    } //hangouts
    else if (info.pageUrl.match("chrome-extension://nckgahadagoaajjgafhacjanaoiihapd") || info.pageUrl.match("http(s|):\/\/mail.google")) {
        testRE = url.match("url\\?q=([^&]*)&");
    } else if (info.pageUrl.match("http(s|):\/\/www.facebook")) {
        testRE = url.match("u=([^&]*)&");
    } else if (info.pageUrl.match("http(s|):\/\/.*search.yahoo")) {
        testRE = url.match("RU=([^\/]*)\/");
    } else if (info.pageUrl.match("http(s|):\/\/.*igg-games")) {
        testRE = url.match("s:\/\/([^&]*)");
    }
    var str = info.linkUrl;
    if (testRE) {
        str = decodeURIComponent(testRE[1]);
    }
    var sandbox = $('#sandbox').val(str).select();
    document.execCommand('copy');
    sandbox.val('');
}

var showForPages = [
    "http://*/*",
    "https://*/*"
];
var title = "Copy real link";
var contexts = ["link"];
var id = chrome.contextMenus.create({
    "title": title,
    "contexts": contexts,
    "onclick": genericOnClick,
    "documentUrlPatterns": showForPages
});