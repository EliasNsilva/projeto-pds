# Use uma imagem base do Python
FROM python:3.8

# Configurar o diretório de trabalho
WORKDIR /app/backend

# Copiar os arquivos de requerimentos e instalar as dependências
COPY requirements.txt /app/backend
RUN pip install -r requirements.txt

# Copiar o restante dos arquivos da API
COPY . /app/backend/

# Expor a porta em que a API estará escutando (por exemplo, 8000)
EXPOSE 8000
