//Pastas Basicas

const core_folders_names = [
  "Local(C:)",
  "Local(D:)",
  "ProgramFiles",
  "Users",
  "player",
  "ProgramData",
  "Windows",
  "Documents",
  "Pictures",
  "Music",
  "Desktop",
  "Download",
  "This pc",
];

class Cpastas {
  constructor(nome, pastax, conteudos) {
    this.nome = nome;
    this.pastax = [];
    this.conteudos = [];
  }

  getNome() {
    console.log(this.nome);
  }
  setNome(nome) {
    this.nome = nome;
  }

  setParente(parente) {
    this.parente = parente;
  }

  getParente() {
    this.parente;
  }

  getPath() {
    caminho = "";
  }

  getPastas() {
    console.log(this.pastax);
  }

  getConteudos() {
    console.log(this.conteudos);
  }

  addPastas(...etc) {
    // console.log(this.nome);
    etc.forEach((e) => {
      e.setParente(this);
      //  console.log(e.nome + `[${this.nome}]`);
    });
    //console.log(etc.length);
    //console.log(`>>[${this.nome}]<<`);

    this.pastax.push(...etc);
  }
}

const core_folders = [];

core_folders_names.forEach((fd) => {
  core_folders.push(new Cpastas(fd, ""));
});

//Premade Folders
var localC = core_folders[0];
var localD = core_folders[1];

var myDocuments = core_folders[7];

var myPictures = core_folders[8];
var myMusic = core_folders[9];

var ThisPc = core_folders[12];
var Desktop = core_folders[10];

ThisPc.setParente("");
//MyComputer
ThisPc.addPastas(localC, localD);

//LocalC folders
localC.addPastas(core_folders[3]);
localC.addPastas(core_folders[5]);
localC.addPastas(core_folders[6]);

//users>>Player(user)
core_folders[3].addPastas(core_folders[4]);

//Player(user)>> Basic_folders
core_folders[4].addPastas(myDocuments, myMusic, myPictures, Desktop);

localC.setParente(core_folders[12]);
localC.getParente();

//console.log(core_folders[4]);

//console.log(Desktop.getParenteTxt());

/*
console.log(
  myDocuments.nome,
  myMusic.nome,
  myPictures.nome,
  Desktop.nome,
  ThisPc.nome
);
console.log(localC);
*/

export {
  Cpastas,
  ThisPc,
  myDocuments,
  myMusic,
  myPictures,
  Desktop,
  localC,
  localD,
  core_folders,
};
