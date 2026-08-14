const policies = {
  product: {
    read: {
      roles: ["admin", "user"],
    },

    create: {
      roles: ["admin"],
    },

    update: {
      roles: ["admin"],
    },

    delete: {
      roles: ["admin"],
    },
  },
};

module.exports = policies;
