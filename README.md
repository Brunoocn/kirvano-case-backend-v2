## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node](https://nodejs.org/en/)
- [Nestjs](https://nestjs.com)
- [TypeORM](https://typeorm.io/)
- [Vitest](https://vitest.dev/)

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/Brunoocn/kirvano-case-backend.git
$ cd kirvano-case-backend.git
```

Para iniciá-lo, siga os passos abaixo:

```bash
# subir a aplicação com o docker
$ docker-compose up -d
```

O server irá subir na porta http://localhost:3005.

Para acessar a documentação da api, basta acessar http://localhost:3000/api/docs.

Vale lembrar que você deve configurar .env como o .env.sample e o .env.prod como o .env.sample.prod

# ⚗️ Arquitetura

A arquitetura segue as recomendações do NestJS, organizada em módulos principais:

- Authentication – Gerencia autenticação de usuários (registro, login e renovação de token)

- Todos – Integração com API externa (JSON Placeholder) e tratamento de dados para o frontend.

- Users – CRUD de usuários; permite que um usuário administre outros usuários.

# 🚀 Melhorias/Próximos passos

- Sistema de logs - Implementar monitoramento centralizado (ex: AWS CloudWatch, Grafana ou outro agente).
- Deploy - AWS/AZURE/GCP ou Render, seria possivel fazer o deploy da aplicação em qualquer um desses serviços mas eu seguiria com AWS e seguiria com os serviços gerenciados por eles como Elastic Beanstalk/EC2, ou caso fosse necessario seria possivel seguir por uma maneira mais economica utilizando um ECS.
- Testes - Adicionar cenários para validar regras de negócio mais complexas. 
