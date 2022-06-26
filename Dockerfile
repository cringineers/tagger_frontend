FROM node:16-alpine as builder

ARG REACT_APP_API_URL
ARG REACT_APP_S3_ENDPOINT
ARG REACT_APP_S3_BUCKET
ARG REACT_APP_S3_ACCESS_KEY
ARG REACT_APP_S3_SECRET_KEY

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY . ./
RUN npm install && npm run build

ENV REACT_APP_API_URL $REACT_APP_API_URL
ENV REACT_APP_S3_ENDPOINT $REACT_APP_S3_ENDPOINT
ENV REACT_APP_S3_BUCKET $REACT_APP_S3_BUCKET
ENV REACT_APP_S3_ACCESS_KEY $REACT_APP_S3_ACCESS_KEY
ENV REACT_APP_S3_SECRET_KEY $REACT_APP_S3_SECRET_KEY

# production environment
FROM node:16-alpine as prod
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=builder /app/build /app/build
WORKDIR /app
RUN npm install serve
CMD ["serve", "-s", "build"]
