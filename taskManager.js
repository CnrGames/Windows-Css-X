function sortear(elemento, collection) {
  let sp;
  let spb;
  let last = false;
  let l_Uptdate = false;
  let newArr = [];
  if (collection.includes(elemento.pData)) {
    let indice = collection.indexOf(elemento.pData);
    let ul_Fixer;

    if (indice == collection.length - 1) {
      last = true;
      ul_Fixer = collection[indice - 1];
    } else {
      l_Uptdate = true;
      ul_Fixer = collection[collection.length - 1];
    }
    collection = collection.filter((e, i) => {
      if (i != indice) {
        return e;
      }
    });

    //console.log(active_Windows);

    collection.forEach((e, i) => {
      let nextIndex = (i + 1) % collection.length;

      if (nextIndex == 0) nextIndex = collection.length - 1;
      if (i == 0) {
        sp = collection[i]; //copia actual
        spb = collection[nextIndex]; //copia next
        collection[i] = elemento.pData; //pasta ele
      } else {
        //pos next e last
        //pos las
        //salvar next
        collection[i] = sp;
        sp = spb;
        spb = collection[nextIndex];
      }

      newArr.push(collection[i]);
      /*  console.log(
        ` [${i}]sp: ${sp.nome}|| spb: ${spb.nome} ||next: ${nextIndex}`
      );
      */
      // console.log(collection[i].nome);
    });

    if (last) {
      collection.push(ul_Fixer);
      newArr.push(ul_Fixer);
    }
    if (l_Uptdate) {
      collection.push(ul_Fixer);
      newArr.push(ul_Fixer);
    }
  } else {
    console.log("N existe isso aqui");
  }
  zIndexar(collection);

  return newArr;
}

function zIndexar(collection) {
  for (let i = 0; i < collection.length; i++) {
    collection[i].obj.style.zIndex = 100;
    collection[i].obj.style.zIndex = 100 - i;
    collection[i].id = collection[i].obj.style.zIndex;
  }
}
export { zIndexar, sortear };
