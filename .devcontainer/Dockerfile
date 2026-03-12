FROM mcr.microsoft.com/devcontainers/base:trixie
RUN apt-get update && apt-get install -y p7zip && rm -rf /var/lib/apt/lists/*
COPY --from=rclone/rclone /usr/local/bin/rclone /usr/local/bin/rclone
COPY --from=oven/bun:1 /usr/local/bin/bun /usr/local/bin/bun
