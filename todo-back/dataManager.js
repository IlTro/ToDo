import Sequelize, { where } from "sequelize";
import crypto from "crypto";
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.TABLE_NAME, process.env.TABLE_USER, process.env.TABLE_PASS, {
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

const getEntrys = async (userId, params) => {
  const query = {
    where: {userId},
    offset: (params.page - 1) * params.pp,
    limit: params.pp,
    order: [["createdAt", params.order.toUpperCase()]],
  };
  if (params.filterBy) {
    if (params.filterBy === "done") {
      query.where = {...query.where, done: true };
    }
    if (params.filterBy === "undone") {
      query.where = {...query.where, done: false };
    }
  }
  const { count, rows } = await Task.findAndCountAll(query);
  return { count, tasks: rows };
};

const addEntry = async (newEntry) => {
  const entry = await Task.create({ ...newEntry });
  return entry;
};

const updateEntry = async (userId, uuid, data) => {
  return await Task.update(data, {
    where: {
      uuid,
      userId,
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

const login = async (username, password) => {
  const responce = await User.findOne({where: {username, password}});
  return responce
};

const isUser = async (username) => {
  const responce = await User.findOne({where: {username}});
  return responce
};

const addUser = async (username, password) => {
  const responce = await User.create({username, password});
  return responce
}

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

export default { addEntry, getEntrys, updateEntry, deleteEntry, isUser, getHmac, login, addUser };
