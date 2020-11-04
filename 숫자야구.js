var 바디 = document.body;

var 숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var 숫자배열 = [];

var 스트라이크 = 0;
var 볼 = 0;
var 틀린답 = 0;
for (var i = 0; i < 4; i += 1) {
  var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
  숫자배열.unshift(뽑은것);
  console.log(숫자후보);
}
console.log(숫자후보);

//shift 앞에서부터 뽑고 unshift 앞에서부터 넣어준다.
//pop은 뒤에서부터 빼고 push 맨뒤에서부터 넣어준다.

var 결과 = document.createElement("h1");
바디.append(결과);
var 폼 = document.createElement("form");
document.body.append(폼);
var 입력창 = document.createElement("input");
입력창.type = "text";
입력창.maxLength = 4;
폼.append(입력창);
var 버튼 = document.createElement("button");
버튼.textContent = "입력!";
폼.append(버튼);
var 입력기록 = document.createElement("div");
바디.append(입력기록);
console.log(숫자배열);
폼.addEventListener("submit", function 콜백함수(이벤트) {
  이벤트.preventDefault();
  var 답 = 입력창.value;
  if (답 === 숫자배열.join("")) {
    결과.textContent = "홈런 입력하면 다시시작합니다.";
    입력창.value = "";
    입력창.focus();
    숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    숫자배열 = [];

    for (var i = 0; i < 4; i += 1) {
      var 뽑은것 = 숫자후보.splice(Math.ceil(Math.random() * (9 - i)), 1)[0];
      숫자배열.unshift(뽑은것);
    }
    틀린답 = 0;
    볼 = 0;
    틀린답 = 0;
  } else {
    틀린답 += 1;
    if (틀린답 === 10) {
      결과.textContent =
        "10번 틀리셨습니다. 답은" + 숫자배열.join("") + "입니다.";
      숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      숫자배열 = [];

      for (var i = 0; i < 4; i += 1) {
        var 뽑은것 = 숫자후보.splice(Math.ceil(Math.random() * (9 - i)), 1)[0];
        숫자배열.unshift(뽑은것);
      }
      틀린답 = 0;
      볼 = 0;
      틀린답 = 0;
      return;
    }
    var 답배열 = 답.split("");
    for (var i = 0; i < 4; i += 1) {
      if (숫자배열[i] === Number(답배열[i])) {
        스트라이크 += 1;
      } else if (숫자배열.indexOf(Number(답배열[i])) > -1) {
        볼 += 1;
      }
    }
    결과.textContent = 스트라이크 + "스트라이크" + 볼 + "볼";
    입력기록.textContent = 답;
    입력창.value = "";
    입력창.focus();
  }
});
