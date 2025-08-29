# ======================
# ビルドステージ
# ======================
FROM node:18-slim
RUN apt-get update -y && apt-get install -y openssl && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

