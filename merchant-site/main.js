$(document).ready(function () {
  loadFinancingCostWidget();
  $("ul.menu-items > li").on("click", function () {
    $("ul.menu-items > li").removeClass("active");
    $(this).addClass("active");
  });

  $(".attr,.attr2").on("click", function () {
    var clase = $(this).attr("class");

    $("." + clase).removeClass("active");
    $(this).addClass("active");
    $("#product-price").html($(this).attr("data-price"));

    loadFinancingCostWidget();
  });

  $(".btn-minus").on("click", function () {
    var now = $(".section > div > input").val();
    if ($.isNumeric(now)) {
      if (parseInt(now) - 1 > 0) {
        now--;
      }
      $(".section > div > input").val(now);
    } else {
      $(".section > div > input").val("1");
    }

    loadFinancingCostWidget();
  });

  $(".btn-plus").on("click", function () {
    var now = $(".section > div > input").val();
    if ($.isNumeric(now)) {
      $(".section > div > input").val(parseInt(now) + 1);
    } else {
      $(".section > div > input").val("1");
    }

    loadFinancingCostWidget();
  });
});

function loadFinancingCostWidget() {
  new FinancingCostWidget({
    merchant: "Merchant Test",
    elementId: "financing-cost-widget",
    price: parseInt($("#product-price")[0].innerText.replace(/\D/g, "")),
    currency: $("#product-price")[0].innerText.slice(-1),
    quantity: parseInt($(".section > div > input").val()),
  });
}
