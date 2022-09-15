import * as fs from 'fs';


let tempStorage = [];


const updateLocalFile = () => {
  fs.writeFile("LocalStorage", JSON.stringify(tempStorage), (err) => {});
}

const readLocalFile = () => {
  fs.readFile("LocalStorage", 'utf8', (err,data) => {tempStorage = JSON.parse(data)});
}

const addEntry = (newEntry) => {
  tempStorage.push(newEntry);
  console.log(newEntry);
  updateLocalFile();
  return newEntry;
};

const updateEntry = (uuid, data) => {
  let entry;
  tempStorage = tempStorage.map((e) => {
    if(e.uuid === uuid){
      e = {...e, ...data};
      entry = e;
    };
    return e;
  });
  updateLocalFile();
  return entry;
};

const getEntrys = () => {
  return tempStorage;
}

export default { addEntry, getEntrys, updateEntry, readLocalFile };
