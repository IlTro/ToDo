import Sequelize from "sequelize";
import crypto from "crypto";

const sequelize = new Sequelize("todo", "postgres", "post", {
  dialect: "postgres",
  dialectOptions: {},
});

class Task extends Sequelize.Model {}
class User extends Sequelize.Model {}

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

User.init(
  {
    username: {
      type: Sequelize.DataTypes.TEXT,
    },
    password: {
      type: Sequelize.DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

try {
  await Task.sync();
} catch (error) {
  console.error("Unable to init task database:", error);
}

try {
  await User.sync();
} catch (error) {
  console.error("Unable to init user database:", error);
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
  return await Task.destroy({ where: { uuid, userId } })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const isUser = async (username, password) => {
  return true;
};

const getHmac = async (username) => {
  const header = JSON.stringify({
    alg: "HS256",
    typ: "JWT",
  });
  const payload = JSON.stringify({
    name: username,
  });
  const signature = crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(
      Buffer.from(header).toString("base64") +
        "." +
        Buffer.from(payload).toString("base64")
    );
  return signature.digest("base64");
};

export default { addEntry, getEntrys, updateEntry, deleteEntry, isUser, getHmac };
