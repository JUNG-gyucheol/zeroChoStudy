var 바디 = document.body;
var 테이블 = document.createElement("table");
var 줄;
var 칸;
var 칸들 = [];
var 줄들 = [];
var 턴 = "X";

var 비동기콜백 = function (이벤트) {
  console.log("칸클릭");
  console.log(이벤트.target); //칸
  console.log(이벤트.target.parentNode); //줄 타켓의 부모
  console.log(이벤트.target.parentNode.parentNode); //테이블 타켓의 부모의 부모

  var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
  console.log(`몇칸  : ${몇줄}`);
  var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
  console.log(`몇줄  : ${몇칸}`);
  console.log(칸들[몇줄][몇칸].textContent);
  if (칸들[몇줄][몇칸].textContent !== "") {
    console.log("빈칸이 아닙니다.");
  } else {
    console.log("빈칸입니다.");
    칸들[몇줄][몇칸].textContent = 턴;
    var 다참 = false;
    //가로줄 검사
    if (
      칸들[몇줄][0].textContent === 턴 &&
      칸들[몇줄][1].textContent === 턴 &&
      칸들[몇줄][2].textContent === 턴
    ) {
      다참 = true;
    }
    //세로줄 검사
    if (
      칸들[0][몇칸].textContent === 턴 &&
      칸들[1][몇칸].textContent === 턴 &&
      칸들[2][몇칸].textContent === 턴
    ) {
      다참 = true;
    }
    //대각선 검사
    if (몇줄 - 몇칸 === 0 || Math.abs(몇줄 - 몇칸) === 2) {
      if (
        칸들[0][0].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][2].textContent === 턴
      ) {
        다참 = true;
      }
      if (
        칸들[0][2].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][0].textContent === 턴
      ) {
        다참 = true;
      }
    }
    if (다참) {
      console.log(턴 + "님이 승리!!!");
      턴 = "X";
      칸들.forEach((줄) => {
        줄.forEach((칸) => {
          칸.textContent = "";
        });
      });
    } else {
      if (턴 === "X") {
        턴 = "0";
      } else {
        턴 = "X";
      }
    }
  }
};

for (var i = 0; i < 3; i++) {
  줄 = document.createElement("tr");
  줄들.push(줄);
  칸들.push([]);
  for (var j = 0; j < 3; j++) {
    칸 = document.createElement("td");
    칸.addEventListener("click", 비동기콜백);
    칸들[i + 1 - 1].push(칸);
    줄.appendChild(칸);
  }
  테이블.appendChild(줄);
}
바디.appendChild(테이블);
console.log(줄들, 칸들);
