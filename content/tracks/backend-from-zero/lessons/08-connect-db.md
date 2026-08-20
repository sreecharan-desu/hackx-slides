---
title: "8. Data client"
order: 8
---

# Data client

`src/db.js` — call sites read like Prisma. Engine is DynamoDB.

```js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("crypto");

const raw = new DynamoDBClient({ region: process.env.AWS_REGION });
const doc = DynamoDBDocumentClient.from(raw);

const USERS = process.env.USERS_TABLE;
const TOKENS = process.env.TOKENS_TABLE;

const db = {
  user: {
    async create({ data }) {
      const item = {
        id: randomUUID(),
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name ?? null,
        isVerified: false,
        createdAt: new Date().toISOString(),
      };
      await doc.send(new PutCommand({
        TableName: USERS,
        Item: item,
        ConditionExpression: "attribute_not_exists(email)",
      }));
      return item;
    },
    async findUnique({ where }) {
      if (where.email) {
        const res = await doc.send(new GetCommand({
          TableName: USERS,
          Key: { email: where.email },
        }));
        return res.Item ?? null;
      }
      return null;
    },
    async update({ where, data }) {
      const names = {};
      const values = {};
      const parts = [];
      for (const [k, v] of Object.entries(data)) {
        names[`#${k}`] = k;
        values[`:${k}`] = v;
        parts.push(`#${k} = :${k}`);
      }
      await doc.send(new UpdateCommand({
        TableName: USERS,
        Key: { email: where.email },
        UpdateExpression: `SET ${parts.join(", ")}`,
        ExpressionAttributeNames: names,
        ExpressionAttributeValues: values,
      }));
    },
  },
  token: {
    async create({ data }) {
      const item = {
        token: data.token,
        userEmail: data.userEmail,
        purpose: data.purpose,
        expiresAt: data.expiresAt,
        usedAt: null,
        createdAt: new Date().toISOString(),
      };
      await doc.send(new PutCommand({ TableName: TOKENS, Item: item }));
      return item;
    },
    async findUnique({ where }) {
      const res = await doc.send(new GetCommand({
        TableName: TOKENS,
        Key: { token: where.token },
      }));
      return res.Item ?? null;
    },
    async update({ where, data }) {
      await doc.send(new UpdateCommand({
        TableName: TOKENS,
        Key: { token: where.token },
        UpdateExpression: "SET usedAt = :u",
        ExpressionAttributeValues: { ":u": data.usedAt },
      }));
    },
  },
};

module.exports = { db };
```

```js
await db.user.create({ data: { email, passwordHash, name } });
await db.user.findUnique({ where: { email } });
```

Same mental model as Prisma. Correct store for this stack.
