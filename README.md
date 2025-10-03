# Consulta Crédito Frontend

## Pré-requisitos
- Docker
- Docker Compose

## Como executar o Frontend
1. Clone do projeto
   ```bash
   git clone git@github.com:rafaelfernandesthe/desafio-consulta-credito-frontend.git
   ou
   git clone https://github.com/rafaelfernandesthe/desafio-consulta-credito-frontend.git
   ```
2. Na pasta raiz, inicie os containers do frontend com o Docker Compose:
   ```bash
   docker-compose up --build -d
   ```
   
## Acesso ao Frontend
Os frontend pode ser acessado em http://localhost:4200

## Como executar o Backend
veja em https://github.com/rafaelfernandesthe/desafio-consulta-credito-backend

## Configurações e Docker Compose
- **frontend**: Realiza o build Node e sobe a aplicação Angular na porta 4200, apontando para um nginx interno na porta 80.
