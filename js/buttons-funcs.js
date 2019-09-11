(function() {
  "use strict";
  const INCREMENT = "INCREMENT";
  const DECREMENT = "DECREMENT";
  const MIN = 1;
  const MAXDAY = 31;
  const MAXMONTH = 12;
  const MAXYEAR = 2019;
  const DAY = "day";
  const MONTH = "month";
  const YEAR = "year";

  function incrementOrDecrement(type, button, input) {
    let fieldType = input.getAttribute("name");
    if (type === INCREMENT) {
      let inputValue = input.value;
      switch (fieldType) {
        case DAY:
          if (parseInt(inputValue) < MAXDAY) {
            input.value = parseInt(inputValue) + 1;
          }
          break;
        case MONTH:
          if (parseInt(inputValue) < MAXMONTH) {
            input.value = parseInt(inputValue) + 1;
          }
          break;
        case YEAR:
          if (parseInt(inputValue) < MAXYEAR) {
            input.value = parseInt(inputValue) + 1;
          }
          break;
        default:
          break;
      }
    } else {
      let inputValue = input.value;
      if (parseInt(inputValue) > MIN) {
        input.value = parseInt(inputValue) - 1;
      }
    }
  }

  try {
    let inputCon = document.querySelectorAll(".js-number-input");
    inputCon.forEach(element => {
      let btnPlus = element.getElementsByClassName("plus")[0];
      let btnMinus = element.getElementsByClassName("minus")[0];
      let qtyInput = element.getElementsByClassName("quantity")[0];
      btnPlus.addEventListener("click", () => {
        incrementOrDecrement(INCREMENT, btnPlus, qtyInput);
      });
      btnMinus.addEventListener("click", () =>
        incrementOrDecrement(DECREMENT, btnMinus, qtyInput)
      );
    });
  } catch (e) {
    console.log(e);
  }
})();
