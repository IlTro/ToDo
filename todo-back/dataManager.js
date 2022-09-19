import Sequelize from "sequelize";

const sequelize = new Sequelize("todo", "postgres", "post", {
  dialect: "postgres",
  dialectOptions: {},
});

class Task extends Sequelize.Model {}

Task.init(
  {
    uuid: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV1,
    },
    name: {
      type: Sequelize.DataTypes.TEXT,
    },
    done: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
    userId: {
      type: Sequelize.DataTypes.UUID,
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

try {
  await Task.sync();
} catch (error) {
  console.error("Unable to init database:", error);
}

const getEntrys = async (userid, params) => {
  const query = {
    offset: (params.page - 1) * params.pp,
    limit: params.pp,
    order: [["createdAt", params.order.toUpperCase()]],
  };
  if (params.filterBy) {
    if (params.filterBy === "done") {
      query.where = { done: true };
    }
    if (params.filterBy === "undone") {
      query.where = { done: false };
    }
  }
  const { count, rows } = await Task.findAndCountAll(query);
  return { count, tasks: rows };
};

const addEntry = async (newEntry) => {
  const entry = await Task.create({ ...newEntry });
  return entry;
};

const updateEntry = async (userid, uuid, data) => {
  return await Task.update(data, {
    where: {
      uuid,
    },
    returning: true,
    plain: true,
  });
};

const deleteEntry = async (userId, uuid) => {
  return await Task.destroy({ where: { uuid, userId }}).then(()=>{
    return true;
  }).catch(()=>{
    return false
  })
};

export default { addEntry, getEntrys, updateEntry, deleteEntry };
