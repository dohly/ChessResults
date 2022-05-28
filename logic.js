function isValidUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.host == "chess-results.com" && url.pathname.startsWith("/tnr");
}
function getUrl(id, art, font) {
  return `https://chess-results.com/tnr${id}.aspx?lan=11&art=${art}&wi=800&rd=-1&iframe=NOADV&css=1&links=NOT&fontsize=${font}`;
}
function setFrameHeight() {
  let content_height = $(window).height();
  document.getElementById("frame").style.height = content_height + "px";
}
$(() => {
  let urlParams = new URLSearchParams(window.location.search);
  let displayMode = urlParams.has("trn");
  let form = $("#configForm");
  if (!displayMode) {
    form.show();
    $("#frame").hide();
  } else {
    let showQr = urlParams.has("qrCode");

    let qrcode = showQr
      ? new QRCode(
          document.getElementById("qrcode"),
          "https://vk.com/chernushkachess"
        )
      : null;

    setFrameHeight();
    $(window).on("resize", setFrameHeight);
    let ids = urlParams
      .get("trn")
      .split(",")
      .map((x) => x.trim());
    let addresses = ids
      .map((x) => getUrl(x, 1, 12))
      .concat(ids.map((x) => getUrl(x, 2, 12)));
    var page = 0;
    let seconds = urlParams.has("seconds") ? urlParams.get("seconds") : 15;
    function nextPage() {
      page++;
      if (page >= addresses.length) {
        page = 0;
      }
      let currentUrl = addresses[page];
      $("#frame").attr("src", currentUrl);
      if (qrcode) {
        qrcode.clear();
        qrcode.makeCode(currentUrl);
      }
    }
    nextPage();
    setInterval(nextPage, seconds * 1000);
    // fetch(urlParam)
    //   .then((data) => data.text())
    //   .then((html) => {
    //     var page = $.parseHTML(html);
    //     let links = $(page)
    //       .find("a.CRdb")
    //       .toArray()
    //       .map((el) => ({ url: new URL(el.href), title: el.innerHTML }));
    //     console.log(links);
    //   });
  }
});
