FROM node:20-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN ls
RUN pnpm install
RUN pnpm run build

FROM node:20-alpine as prod
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY --from=base /app/apps/api/dist /app/apps/api/dist
COPY --from=base /app/package.json /app/package.json
COPY --from=base /app/apps/api/package.json /app/apps/api/package.json
COPY --from=base /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=base /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
WORKDIR /app
RUN pnpm install -P
RUN ls
CMD ["pnpm", "start:prod"]
