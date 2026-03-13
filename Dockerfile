FROM debian AS platform-tools
RUN apt-get update && apt-get install -y unzip && rm -rf /var/lib/apt/lists/*
ADD https://dl.google.com/android/repository/platform-tools-latest-linux.zip /tmp/
RUN unzip /tmp/platform-tools-latest-linux.zip -d /tmp

FROM debian
ENV PATH="/usr/local/share/platform-tools:${PATH}"

RUN apt-get update && apt-get install -y p7zip && rm -rf /var/lib/apt/lists/* && useradd --create-home --shell /bin/bash user
COPY --from=rclone/rclone /usr/local/bin/rclone /usr/local/bin/rclone
COPY --from=platform-tools /tmp/platform-tools /usr/local/share/platform-tools
USER user:user
WORKDIR /home/user
