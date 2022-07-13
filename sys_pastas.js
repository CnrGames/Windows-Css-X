import * as dir from "./diretorios.js";
import * as taskM from "./taskManager.js";
//import { Cpastas } from "./diretorios.js";

let taskfolders = [];

function criar_pastas() {
  var folder1 = { pastas: [], conteudos: [] };

  /*
const folder2 = new Cpastas("", "");

//folder2.getConteudos();
//folder2.getPastas();

folder2.setNome(`Nova pasta(1)`);
//folder2.getNome();

folder1.pastas.push("Desktop", "casa");
//console.log(folder1.pastas);

folder2.addPastas(folder1);
folder2.addPastas("Locacl(c)", "Documents", "MyPictures", "Desktop");

//folder2.getConteudos();
folder2.getPastas();
*/

  //function show(tagi)
}

//side folder DropDown
function dropF_init(pasta) {
  let lista;
  if (pasta == null) {
    lista = document.querySelectorAll(`.dropFolders`);
  } else {
    lista = pasta.querySelectorAll(`.dropFolders`);
  }

  lista.forEach((el) => {
    el.addEventListener("click", function (oi) {
      let filho = oi.target.nextElementSibling;
      //console.log(oi.target);

      if (oi.target.classList.contains("active")) {
        oi.target.classList.remove("active");
        filho.classList.remove("active");
      } else {
        oi.target.classList.add("active");
        filho.classList.add("active");
      }
    });
  });
}

//explore Folder

//Folder Index

var actualPasta = document.querySelector(".janela");
var itemsPasta = '<div class="f-items">pasta</div>';
var p_conteudos = actualPasta.querySelector(".jd-content");

p_conteudos.innerHTML = "";

actualPasta.pasta = dir.ThisPc;

var p_actual = actualPasta.pasta;
var btn_up = document.getElementById("btn-up");
var btn_dw = document.getElementById("btn-dw");

var folder_name = document.getElementById("pastaNm");
var wbar_apps = document.getElementById("Wbar_apps");

//pos x pos y

//abrir folder

var posXIndex, posYIndex, lasYpos, lasXpos;

posXIndex = 0;
posYIndex = 0;

/*
if (posXIndex > 3) {
  posXIndex = 0;
}
*/

if (posYIndex > 3) {
  posYIndex = 0;
}

//m folder drag

function fIndx_Up(e) {
  //console.log("Dgd!");
  taskfolders = taskM.sortear(e, taskfolders);
}

function msmovdown(janela) {
  //console.log(janela);

  janela.addEventListener("mousemove", mover);
  janela.addEventListener("click", () => fIndx_Up(janela));
  janela.addEventListener("mouseup", () => mup(janela));
  function mover(e) {
    var getstyle = getComputedStyle(janela);
    var x = parseInt(getstyle.left);
    var y = parseInt(getstyle.top);

    janela.style.left = x + e.movementX + "px";
    janela.style.top = y + e.movementY + "px";

    fIndx_Up(janela);
    // console.log("mover");
    //77 fav pos
    //591 , 114
    // console.log(`${x} , ${y} `);
  }

  function mup(janela) {
    janela.removeEventListener("mousemove", mover);
    janela.removeEventListener("mousemove", fIndx_Up);
  }
}

function createFolder(x, y, cor, camada) {
  //full interface
  var janela = document.createElement("div");
  janela.style.backgroundColor = cor;
  janela.setAttribute("class", "janela");

  //SubTelas
  let janela_Up = document.createElement("div");
  let janela_Down = document.createElement("div");

  janela_Down.setAttribute("class", "janela-down");
  janela_Up.setAttribute("class", "janela-up");

  janela_Up.innerHTML += `<div class="j-info">
  <span id="pastaNm" style="position: absolute; left: 40%"
    >New folder</span
  >
  <div
    class="j-botoes"
    style="position: absolute; right: 0; align-self: flex-end"
  >
    <button>-</button>
    <button>o</button>
    <button id="close_b">x</button>
  </div>
</div>
<div class="j-tool">
  <span class="t-buttons">File</span>
  <span class="t-buttons">Home</span>
  <span class="t-buttons">Share</span>
  <span class="t-buttons">View</span>
  <span class="t-buttons">Picture tool</span>
</div>
<div class="j-path">
  <div
    class="jp-tools"
    style="display: grid; grid-template-columns: 1fr 1fr"
  >
    <button id="btn-dw"><</button>
    <button id="btn-up">></button>
  </div>
  <input type="text" style="width: 500px" />
  <input type="search" style="width: 30%" />
</div>`;

  janela_Down.innerHTML += ` <div class="jd-left_path">
<div class="dropFolders">Quick Acess</div>
<div class="dpList-folders">
  <div>Desktop</div>
  <div>Documents</div>
  <div>Download</div>
</div>

<div class="dropFolders">This pc</div>
<div class="dpList-folders">
  <div>Desktop</div>
  <div>Documents</div>
  <div>Download</div>
  <div>Picture</div>
  <div>Music</div>
</div>
</div>
<div class="jd-content">
<div class="f-items">pasta</div>
<div class="f-items">pasta</div>
<div class="f-items">pasta</div>
</div>`;

  janela.append(janela_Up, janela_Down);

  if (camada != null && !isNaN(camada)) janela.style.zIndex = parseInt(camada);
  document.body.append(janela);

  var getstyle = getComputedStyle(janela);

  janela
    .querySelector(".j-info")
    .addEventListener("mousedown", () => msmovdown(janela));
  janela.addEventListener("mousedown", () => fIndx_Up(janela));
  //var x = parseInt(getstyle.left);
  //var y = parseInt(getstyle.top);

  janela.style.left = x + "px";
  janela.style.top = y + "px";
  //Cristal
  dropF_init(janela);
  //let nome = janela.querySelector("#pastaNm").innerHTML;
  janela.pData = { nome: "none", id: "", obj: janela };
  taskfolders.push(janela.pData);
}

//nomear pastas
function nomear() {
  for (let i = 0; i < taskfolders.length; i++) {
    taskfolders[i].obj.querySelector("#pastaNm").innerHTML = `pasta ${i}`;
    taskfolders[i].nome = `pasta ${i}`;
    taskfolders[i].id = taskfolders[i].obj.style.zIndex;
  }
  console.log("finished...");
  taskM.zIndexar(taskfolders);
  console.log(taskfolders);
}

//Update folder Files
function updateFolder() {
  if (p_actual.parente.nome == null) {
    btn_dw.disabled = true;
    console.log();
  } else {
    btn_dw.disabled = false;
  }

  if (p_actual.pastax.length > 0) {
    p_actual.pastax.forEach((el, i) => {
      if (i == 0) {
        p_conteudos.innerHTML = "";
      }

      //console.log("id:" + i);
      //console.log(actualPasta.dataset.pasta);

      let pItem = document.createElement("div");
      pItem.pasta = el;
      pItem.setAttribute("class", "f-items");
      pItem.innerHTML = el.nome;
      /*
      console.log(
        `pastaActual: ${p_actual.nome} ,parente: ${p_actual.parente.nome}`
      );
      */

      pItem.addEventListener("click", (oi) => {
        actualPasta.pasta = el;
        p_actual = actualPasta.pasta;
        updateFolder();
      });

      p_conteudos.append(pItem);
    });
  } else {
    p_conteudos.innerHTML = "vazio";
  }
  folder_name.innerHTML = p_actual.nome;
}

//side  explorer buttons
function f_backward() {
  if (p_actual.parente != null) {
    actualPasta.pasta = p_actual.parente;
    p_actual = actualPasta.pasta;

    updateFolder();
  }
}

var c_b = actualPasta.querySelector("#close_b");

function close_w() {
  actualPasta.remove();
}

function update_barApps() {
  //<img class="icon" src="/img/icon/w-folder-icon.png" />

  let wBIcon = document.createElement("img");
  wBIcon.setAttribute("src", "/img/icon/w-folder-icon.png");
  wBIcon.setAttribute("class", "icon");
  wbar_apps.appendChild(wBIcon);
}

//====================[Button Test]=======================

c_b.addEventListener("click", close_w);
btn_dw.addEventListener("click", f_backward);
//console.log(JSON.parse(actualPasta.dataset.pasta));
//console.log("dev: " + dir.ThisPc.nome);

//////For Area

//=====================[Update Folder]=====================
for (let x = 0; x < 2; x++) {
  if (x == 0) {
    updateFolder();
    //Windows Bar Update
    wbar_apps.innerHTML = "";
    for (let y = 0; y < 3; y++) {
      update_barApps();
    }

    //========================Folder__Test======================================
    //encontrar janela

    var jteste = document.querySelector(`.j-info`);

    jteste.addEventListener("mousedown", () =>
      msmovdown(jteste.parentElement.parentElement)
    );

    //============[Drop]
    dropF_init();
    //fim Drop
  }
  let psX, psY, cor;
  switch (x) {
    case 0:
      psX = 77;
      psY = 110;
      cor = "blue";
      break;
    case 1:
      psX = 77;
      psY = 150;
      cor = "red";
      break;
    case 2:
      psX = 77;
      psY = 200;
      cor = "green";
      break;

    case 3:
      psX = 77;
      psY = 230;
      cor = "white";
      break;

    case 4:
      psX = 77;
      psY = 260;
      cor = "pink";
      break;
  }
  psX += x * 25;
  createFolder(psY, psX, cor, x);
}
nomear();

//console.log(taskfolders);

window.al = function al(msg) {
  console.log(JSON.parse(msg.pasta));
};
