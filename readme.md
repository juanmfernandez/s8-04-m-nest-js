# Ejecutar en desarrollo

1. Descargar Docker

2. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

3. Clonar el repositorio

4. Ejecutar

```
yarn install
```

5. Clonar el archivo `.env.template` y renombrar la copia a `.env` y rellenar las variables

6. Ejecutar el siguiente comando:

```
docker-compose -f docker-compose.dev.yml up -d
```

7. Ejecutar la aplicación en dev:

```
yarn start:dev
```

8. Bajar el contenedor:

```
docker-compose down
```

## Stack usado

- MongoDB
- TypeORM
- Nestjs
