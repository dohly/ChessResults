window.addEventListener('DOMContentLoaded', () => {
  var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-2.1.4.min.js";
    script.onload = script.onreadystatechange = function() {
      // $(document).ready(function() {
      //   $("#lst-ib").val("Hello, World!");
      // });
    };
    document.body.appendChild(script);
})
