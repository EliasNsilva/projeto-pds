# API Django REST

## Crie um ambiente virtual
    python3 -m venv env_api

## Ative o ambiente
    source env_api/bin/activate

## Instale a dependencias
    pip install -r requirements.txt

## Crie o .env na pasta raiz
    mkdir .env
* exemplo de .env

    ```python
    DEBUG=True
    SECRET_KEY='umasecretykeybemboa'
    DB_ENGINE='django.db.backends.postgresql_psycopg2'
    DB_NAME='apiDB'
    DB_USER='postgres'
    DB_PASSWORD='postgres'
    DB_HOST='localhost'
    DB_PORT=5432
    HUXLEY_USER=the_huxley_user
    HUXLEY_PASSWORD=the_huxley_password
    ```

## Rode as migraçôes do banco
    python3 manage.py makemigrations
    python3 manage.py migrate
## Rode o servidor
    python3 manage.py runserver

Acesse o servidor: http://127.0.0.1:8000/