let body = document.body;
// let num1 = parseInt(document.querySelector("#num1").value);
// let num2 = parseInt(document.querySelector("#num2").value);
// let mine = parseInt(document.querySelector("#mine").value);
let tbody = document.querySelector("tbody");
let start = document.querySelector("#start");
var dataset = [];

start.addEventListener("click", () => {
  tbody.innerHTML = "";
  let num1 = parseInt(document.querySelector("#num1").value);
  let num2 = parseInt(document.querySelector("#num2").value);
  let mine = parseInt(document.querySelector("#mine").value);
  console.log("click");
  let hubo = Array(num1 * num2)
    .fill()
    .map((value, index) => {
      return index;
    });
  let random = [];
  while (hubo.length > num1 * num2 - mine) {
    random.push(hubo.splice(Math.floor(Math.random() * hubo.length), 1)[0]);
  }
  console.log(random);
  for (let i = 0; i < num1; i++) {
    var arr = [];
    var tr = document.createElement("tr");
    dataset.push(arr);
    for (let j = 0; j < num2; j++) {
      arr.push(1);
      let td = document.createElement("td");
      td.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        console.log("오른쪽클릭");
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;
        let kan = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let zul = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (
          e.currentTarget.textContent === "" ||
          e.currentTarget.textContent === "X"
        ) {
          e.currentTarget.textContent = "!";
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
        } else if (e.currentTarget.textContent === "?") {
          if (dataset[zul][kan] === 1) {
            e.currentTarget.textContent = "";
          } else if (dataset[zul][kan] === "X") {
            e.currentTarget.textContent = "X";
          }
        }
      });
      td.addEventListener("click", (e) => {
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;
        let kan = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let zul = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        e.currentTarget.className = "opened";
        console.log(zul, kan);
        if (dataset[zul][kan] === "X") {
          e.currentTarget.textContent = "펑";
        } else {
          let ju = [dataset[zul][kan - 1], dataset[zul][kan + 1]];
          if (dataset[zul - 1]) {
            ju = ju.concat(
              dataset[zul - 1][kan - 1],
              dataset[zul - 1][kan],
              dataset[zul - 1][kan + 1]
            );
          }
          if (dataset[zul + 1]) {
            ju = ju.concat(
              dataset[zul + 1][kan - 1],
              dataset[zul + 1][kan],
              dataset[zul + 1][kan + 1]
            );
          }
          console.log(ju);
          let 주변지뢰개수 = ju.filter((v) => {
            return v === "X";
          }).length;
          e.currentTarget.textContent = 주변지뢰개수;
          if (주변지뢰개수 === 0) {
            let jukan = [];
            if (tbody.children[zul - 1]) {
              jukan = jukan.concat([
                tbody.children[zul - 1].children[kan - 1],
                tbody.children[zul - 1].children[kan],
                tbody.children[zul - 1].children[kan + 1],
              ]);
            }
            jukan = jukan.concat([
              tbody.children[zul].children[kan - 1],
              tbody.children[zul].children[kan + 1],
            ]);
            if (tbody.children[zul + 1]) {
              jukan = jukan.concat([
                tbody.children[zul + 1].children[kan - 1],
                tbody.children[zul + 1].children[kan],
                tbody.children[zul + 1].children[kan + 1],
              ]);
            }
            dataset[zul][kan] = 1;
            jukan
              .filter((v) => !!v)
              .forEach((옆칸) => {
                let parentTr = 옆칸.parentNode;
                let parentTbody = 옆칸.parentNode.parentNode;
                let kan2 = Array.prototype.indexOf.call(
                  parentTr.children,
                  옆칸
                );
                let zul2 = Array.prototype.indexOf.call(
                  parentTbody.children,
                  parentTr
                );
                if (dataset[zul2][kan2] !== 1) {
                  옆칸.click();
                }
              });
          }
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  for (let k = 0; k < random.length; k++) {
    var sero = Math.floor(random[k] / 10);
    var garo = random[k] % 10;
    tbody.children[sero].children[garo].textContent = "X";
    dataset[sero][garo] = "X";
  }
  console.log(dataset);
});
