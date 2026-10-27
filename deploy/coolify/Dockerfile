# Container image for a build platform such as Coolify: the Vite + React single page app is built with Node,
# then only the built files are served by nginx. There is no server code and no run-time configuration.
#
#   docker build -f deploy/coolify/Dockerfile -t motx .
#   docker run --rm -p 8080:80 motx

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# --include=dev: a build platform may set NODE_ENV=production, which would skip the dev dependencies
# (vite, typescript, tailwind) that the build needs.
RUN npm ci --include=dev
COPY . .
# "npm run build" is "tsc -b && vite build": a type error stops the build.
RUN npm run build

FROM nginx:1.31-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
# 127.0.0.1, not localhost: busybox wget in Alpine tries ::1 first for "localhost".
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
