
export const statusCounter = (code: [string, string, string]) => () => {
  function randomNum() {
    return Math.floor(Math.random() * 9) + 1;
  }

  const time = 30;
  let i = 0;
  const selector3 = document.querySelector(".thirdDigit");
  const selector2 = document.querySelector(".secondDigit");
  const selector1 = document.querySelector(".firstDigit");

  function updateDigit(selector: Element | null, value: string) {
    if (selector instanceof Element && selector.textContent) {
      selector.textContent = value;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function updateLoop(loop: any, index: number) {
    setTimeout(() => {
      if (i > index * 40) {
        clearInterval(loop);
        switch (index) {
          case 3:
            updateDigit(selector3, code[0]);
            break;
          case 2:
            updateDigit(selector2, code[1]);
            break;
          case 1:
            updateDigit(selector1, code[2]);
            break;
        }
      } else {
        switch (index) {
          case 3:
            updateDigit(selector3, randomNum().toString());
            break;
          case 2:
            updateDigit(selector2, randomNum().toString());
            break;
          case 1:
            updateDigit(selector1, randomNum().toString());
            break;
        }
        i++;
        updateLoop(loop, index);
      }
    }, time);
  }

  updateLoop(setInterval(() => { }, time), 3);
  updateLoop(setInterval(() => { }, time), 2);
  updateLoop(setInterval(() => { }, time), 1);

  return () => { };
};
