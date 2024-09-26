FROM alpine AS primerLinux
RUN mkdir 10A
RUN echo "Mi primer docker" > 10A/archivo.txt
RUN echo "console.log('Hola NodeJS de Docker')" > ejemplo.js

FROM ubuntu:latest as base
RUN apt-get -y update; apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash && \
    apt-get -qqy install nodejs
COPY --from=primerLinux ejemplo.js .
RUN mkdir pruebas
COPY Mathematics.js /pruebas
COPY sumas.test.js /pruebas
RUN cd pruebas && npm init --yes
RUN cd pruebas && npm install jest@latest
#RUN npx jest sumas
CMD /bin/bash
