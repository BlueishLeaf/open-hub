FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY /dist/open-hub /usr/share/nginx/html
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]
