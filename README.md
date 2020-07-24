# BRy - Teste

## API

Docker file com Apache, MySql, PhpMyAdmin e Php

Para executar os containers:

```
docker-compose up -d
```

Abrir o phpmyadmin [http://localhost:8000](http://localhost:8000)


MySql Client:

- `docker-compose exec db mysql -u root -p` 


Executar API:

- `cd bry_api`

- `composer install`  

- `php artisan serve` 


Migrations:

- `php artisan migrate` 
- Roolback das migrates: `php artisan migrate:roolback` 


Seeders:

- `php artisan db:seed` 


Lista de Rotas da Aplicação:

- `php artisan route:list` 


Sobre a API BRy - Teste

- Autenticação: Bearer Token


## Front-End

- Angular 9

Executar project

- `cd bry-fron`

- `npm install`  

- `ng serve` 
