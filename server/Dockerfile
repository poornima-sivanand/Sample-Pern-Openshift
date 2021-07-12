FROM node:14
WORKDIR /usr/src/app
RUN apt-get update && \
    apt-get install -y \
        python3 \
        python3-pip \
        python3-setuptools \
        groff \
        less \
    && pip3 install --upgrade pip \
    && apt-get clean

RUN pip3 --no-cache-dir install --upgrade pyopenssl
COPY package*.json ./


RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]