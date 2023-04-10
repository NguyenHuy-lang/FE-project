console.log("Js here");

document.querySelectorAll("input.input-qty").forEach(function (input) {
  var minus = input.parentNode.querySelector(".minus"),
    plus = input.parentNode.querySelector(".plus"),
    min = Number(input.getAttribute("min")),
    max = Number(input.getAttribute("max")),
    d = min === 0 ? 0 : min;
  minus.addEventListener("click", function () {
    console.log("sfdgsdgf");
    if (this.classList.contains("minus")) {
      if (d > min) d += -1;
    } else if (this.classList.contains("plus")) {
      var x = Number(input.value) + 1;
      if (x <= max) d += 1;
    }
    input.setAttribute("value", d);
    input.value = d;
  });
  plus.addEventListener("click", function () {
    var x = Number(input.value) + 1;
    if (x <= max) d += 1;
    input.setAttribute("value", d);
    input.value = d;
  });
  console.log("d", d);
});
