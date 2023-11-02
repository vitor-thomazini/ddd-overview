# DDD - Modelagem

# 1 Desenvolvimento

Para montar o ambiente de desenvolvimento é recomendado que utilize o **docker-compose** e acesse internamente o container, por meios dos comandos abaixo.

```bash
docker compose --profile dev up -d
docker compose exec app-dev bash
```

# 2 Testes

Para executar somente os testes implementados na aplicação utilize o comando abaixo que será exibido o resultado dos testes.

```bash
docker compose --profile test up
```