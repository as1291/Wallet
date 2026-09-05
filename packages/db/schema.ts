// import {
//   pgTable,
//   serial,
//   varchar,
//   text,
//   integer,
//   timestamp,
//   pgEnum,
// } from "drizzle-orm/pg-core";

// // import { defineRelations } from "drizzle-orm";
// import { relations } from "drizzle-orm";

// export const authTypeEnum = pgEnum("auth_type", [
//   "Google",
//   "Github",
// ]);

// export const onRampStatusEnum = pgEnum("on_ramp_status", [
//   "Success",
//   "Failure",
//   "Processing",
// ]);

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),

//   email: varchar("email", {
//     length: 255,
//   }).unique(),

//   name: varchar("name", {
//     length: 255,
//   }),

//   number: varchar("number", {
//     length: 20,
//   })
//     .notNull()
//     .unique(),

//   password: varchar("password", {
//     length: 255,
//   }).notNull(),
// });

// export const merchants = pgTable("merchants", {
//   id: serial("id").primaryKey(),

//   email: varchar("email", {
//     length: 255,
//   })
//     .notNull()
//     .unique(),

//   name: varchar("name", {
//     length: 255,
//   }),

//   authType: authTypeEnum("auth_type").notNull(),
// });

// export const onRampTransactions = pgTable(
//   "on_ramp_transactions",
//   {
//     id: serial("id").primaryKey(),

//     status: onRampStatusEnum("status").notNull(),

//     token: text("token")
//       .notNull()
//       .unique(),

//     provider: text("provider").notNull(),

//     amount: integer("amount").notNull(),

//     startTime: timestamp("start_time").notNull(),

//     userId: integer("user_id")
//       .notNull()
//       .references(() => users.id),
//   }
// );

// export const balances = pgTable("balances", {
//   id: serial("id").primaryKey(),

//   userId: integer("user_id")
//     .notNull()
//     .unique()
//     .references(() => users.id),

//   amount: integer("amount").notNull(),

//   locked: integer("locked").notNull(),
// });

// export const p2pTransfers = pgTable("p2p_transfer", {
//   id: serial("id").primaryKey(),

//   amount: integer("amount").notNull(),

//   timestamp: timestamp("timestamp").notNull(),

//   fromUserId: integer("from_user_id")
//     .notNull()
//     .references(() => users.id),

//   toUserId: integer("to_user_id")
//     .notNull()
//     .references(() => users.id),
// });

// // V1.0 groups all relation configurations into a single definition
// export const relations = defineRelations(
//   {
//     users,
//     onRampTransactions,
//     balances,
//     p2pTransfers,
//   },
//   (r) => ({
//     users: {
//       onRampTransactions: r.many.onRampTransactions(),
//       balances: r.one.balances(),

//       sentTransfers: r.many.p2pTransfers({
//         from: r.users.id,
//         to: r.p2pTransfers.fromUserId,
//       }),

//       receivedTransfers: r.many.p2pTransfers({
//         from: r.users.id,
//         to: r.p2pTransfers.toUserId,
//       }),
//     },

//     onRampTransactions: {
//       user: r.one.users({
//         from: r.onRampTransactions.userId,
//         to: r.users.id,
//       }),
//     },

//     balances: {
//       user: r.one.users({
//         from: r.balances.userId,
//         to: r.users.id,
//       }),
//     },

//     p2pTransfers: {
//       fromUser: r.one.users({
//         from: r.p2pTransfers.fromUserId,
//         to: r.users.id,
//         optional: false,
//         alias: "sentTransfers",
//       }),

//       toUser: r.one.users({
//         from: r.p2pTransfers.toUserId,
//         to: r.users.id,
//         optional: false,
//         alias: "receivedTransfers",
//       }),
//     },
//   })
// );


import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const authTypeEnum = pgEnum("auth_type", [
  "Google",
  "Github",
]);

export const onRampStatusEnum = pgEnum("on_ramp_status", [
  "Success",
  "Failure",
  "Processing",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  email: varchar("email", {
    length: 255,
  }).unique(),

  name: varchar("name", {
    length: 255,
  }),

  number: varchar("number", {
    length: 20,
  })
    .notNull()
    .unique(),

  password: varchar("password", {
    length: 255,
  }).notNull(),
});

export const merchants = pgTable("merchants", {
  id: serial("id").primaryKey(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  name: varchar("name", {
    length: 255,
  }),

  authType: authTypeEnum("auth_type").notNull(),
});

export const onRampTransactions = pgTable("on_ramp_transactions", {
  id: serial("id").primaryKey(),

  status: onRampStatusEnum("status").notNull(),

  token: text("token")
    .notNull()
    .unique(),

  provider: text("provider").notNull(),

  amount: integer("amount").notNull(),

  startTime: timestamp("start_time").notNull(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const balances = pgTable("balances", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id),

  amount: integer("amount").notNull(),

  locked: integer("locked").notNull(),
});

export const p2pTransfers = pgTable("p2p_transfer", {
  id: serial("id").primaryKey(),

  amount: integer("amount").notNull(),

  timestamp: timestamp("timestamp").notNull(),

  fromUserId: integer("from_user_id")
    .notNull()
    .references(() => users.id),

  toUserId: integer("to_user_id")
    .notNull()
    .references(() => users.id),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  onRampTransactions: many(onRampTransactions),
  balance: one(balances),

  sentTransfers: many(p2pTransfers, {
    relationName: "fromUser",
  }),

  receivedTransfers: many(p2pTransfers, {
    relationName: "toUser",
  }),
}));

export const onRampTransactionsRelations = relations(
  onRampTransactions,
  ({ one }) => ({
    user: one(users, {
      fields: [onRampTransactions.userId],
      references: [users.id],
    }),
  })
);

export const balancesRelations = relations(
  balances,
  ({ one }) => ({
    user: one(users, {
      fields: [balances.userId],
      references: [users.id],
    }),
  })
);

export const p2pTransfersRelations = relations(
  p2pTransfers,
  ({ one }) => ({
    fromUser: one(users, {
      fields: [p2pTransfers.fromUserId],
      references: [users.id],
      relationName: "fromUser",
    }),

    toUser: one(users, {
      fields: [p2pTransfers.toUserId],
      references: [users.id],
      relationName: "toUser",
    }),
  })
);