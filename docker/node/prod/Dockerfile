# ======================
# ビルドステージ
# ======================
FROM node:24-bookworm AS builder
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

# package.json と package-lock.json を先にコピーして依存関係インストール
COPY package*.json ./
RUN npm install

# 残りのソースをコピーしてビルド
COPY . .
RUN npx prisma generate
RUN npm run build

# ======================
# 本番ステージ
# ======================
FROM node:24-bookworm AS runner

RUN apt-get update -y && apt-get install -y openssl && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# production 依存だけインストール（builder からコピーも可）
COPY package*.json ./
RUN npm install --production

# ビルド成果物と必要なファイルだけコピー
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma

