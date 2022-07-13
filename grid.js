var icon = document.querySelector("#grid-apps");
var icones = document.querySelector("#grid-apps").childNodes;

var pasta = document.createElement("img");
var pchrome = document.createElement("img");

var posInitA;
var posInitB;

var pastas;

/*
document.addEventListener("keydown", function (event) {
  if (event.which == 17) {
    
  }
});

*/

pasta.setAttribute("id", "pasta");
pasta.setAttribute("src", "/img/icon/w-folder-icon.png");

pchrome.setAttribute("id", "pasta2");
pchrome.setAttribute("src", "/img/icon/w-chrome-icon.png");

pasta.setAttribute("data-nome", "pasta0");
pasta.setAttribute("data-tipo", "folder");

pchrome.setAttribute("data-nome", "chrome");
pchrome.setAttribute("data-tipo", "app");

pchrome.style = pasta.style =
  "position:absolute;self-align:center;justify-content:center;";

pasta.setAttribute("class", "icon-grid");
pchrome.setAttribute("class", "icon-grid");

for (let indice = 0; indice < 30; indice++) {
  icon.innerHTML += `<div class='slotes' style="display:flex;" data-pos=${indice} data-tipo="slot"> &nbsp;</div>`;

  //'<img id="icon-grid" src="/img/icon/w-folder-icon.png" />';
}

var slotes = document.querySelectorAll(".slotes");

for (let index = 0; index < slotes.length; index++) {
  const sl = slotes[index];
  // console.log(sl.dataset.pos);
}

function trocarplace() {
  if (checkslot(this)) {
    if (
      this.lastChild.dataset.tipo == "app" ||
      this.lastChild.dataset.tipo == "folder"
    ) {
      actual_File = this.lastChild;
    }
  } else {
    if (
      actual_File != undefined &&
      (actual_File.dataset.tipo == "app" ||
        actual_File.dataset.tipo == "folder")
    ) {
      this.appendChild(actual_File);
    }

    // console.log(`dense: ${this.innerText}`);
    this.addEventListener("mouseover", () => {
      actual_File = null;
    });
  }
}

function checkslot(sl) {
  if (sl.dataset.tipo == "slot") {
    if (sl.hasChildNodes() == true && sl.childNodes.length > 1) {
      return true;
    } else {
      return false;
    }
  }
}

//posicionar icons
for (let x = 0; x < 1; x++) {
  for (let y = 0; y < slotes.length; y++) {
    if (parseInt(slotes[y].dataset.pos) == 0) posInitA = slotes[y];

    if (parseInt(slotes[y].dataset.pos) == 1) posInitB = slotes[y];
  }

  posInitA.appendChild(pasta);
  posInitB.appendChild(pchrome);
}

icones.forEach((el) => {
  //if (parseInt(el.innerHTML) == 19) posInitA = el;

  //if (parseInt(el.innerHTML) == 23) posInitB = el;

  el.addEventListener("dragover", trocarplace);
});
