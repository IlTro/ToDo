import * as fs from "fs";

let tempStorage = [];

const updateLocalFile = () => {
  fs.writeFile("LocalStorage", JSON.stringify(tempStorage), (err) => {});
};

const readLocalFile = () => {
  fs.readFile("LocalStorage", "utf8", (err, data) => {
    if (err) {
      tempStorage = [];
    } else {
      tempStorage = JSON.parse(data);
    }
  });
};

const getEntrys = (userid, params) => {
  let filteredData = tempStorage;
  if (params.filterBy) {
    if (params.filterBy === "done") {
      filteredData = filteredData.filter((e) => e.done);
    }
    if (params.filterBy === "undone") {
      filteredData = filteredData.filter((e) => !e.done);
    }
  }
  if (params.order === "asc") {
    filteredData = filteredData.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  } else if (params.order === "desc") {
    filteredData = filteredData.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  return {
    count: filteredData.length,
    tasks: filteredData.slice(
      (params.page - 1) * params.pp,
      params.page * params.pp
    ),
  };
};

const addEntry = (newEntry) => {
  tempStorage.push(newEntry);
  updateLocalFile();
  return newEntry;
};

const updateEntry = (userid, uuid, data) => {
  let entry;
  tempStorage = tempStorage.map((e) => {
    if (e.uuid === uuid && e.userId === userid) {
      e = { ...e, ...data };
      entry = e;
    }
    return e;
  });
  updateLocalFile();
  return entry;
};

const deleteEntry = (userid, uuid) => {
  tempStorage = tempStorage.filter((e) => {
    return e.uuid !== uuid || e.userId !== userid;
  });
  updateLocalFile();
  return true;
};

export default { addEntry, getEntrys, updateEntry, readLocalFile, deleteEntry };
