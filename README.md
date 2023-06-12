# API Node - Microserviço de Tarefas

Este é o microserviço de tarefas, que fornece uma API para gerenciar tarefas em um aplicativo. Ele é desenvolvido usando Node.js e integra bancos de dados PostgreSQL, MongoDB e Redis, bem como RabbitMQ para mensageria assíncrona.

## Requisitos
Certifique-se de ter os seguintes requisitos instalados em sua máquina antes de executar o microserviço:

- Terraform
- Ansible
- Docker

## Configuração
1. Clone o repositório do projeto:
```
git clone https://github.com/seu-usuario/api-node.git
```

2. Navegue até o diretório do projeto:
```
cd api-node
```

3. Inicie o docker-compose.yaml?
```
docker compose up -d --build
```

4. Configure as variáveis de ambiente:  
Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis de ambiente:
```
# Configurações do PostgreSQL
PG_HOST=seu-host
PG_PORT=sua-porta
PG_DATABASE=seu-banco-de-dados
PG_USERNAME=seu-usuario
PG_PASSWORD=sua-senha

# Configurações do MongoDB
MONGO_HOST=seu-host
MONGO_PORT=sua-porta
MONGO_DATABASE=seu-banco-de-dados

# Configurações do Redis
REDIS_HOST=seu-host
REDIS_PORT=sua-porta

# Configurações do RabbitMQ
RABBITMQ_HOST=seu-host
RABBITMQ_PORT=sua-porta
```

### Executando o Microserviço
Inicie o servidor do microserviço:

```
terraform apply
```
O microserviço será iniciado e estará disponível em http://localhost:3000.

### Testes
Para executar os testes automatizados, use o seguinte comando:
```
npm run test
```

## Endpoints da API
A API possui os seguintes endpoints:

- `GET /tasks:` Retorna todas as tarefas.  
- `POST /tasks:` Cria uma nova tarefa.  
- `GET /tasks/:id:` Retorna uma tarefa específica.  
- `PUT /tasks/:id:` Atualiza uma tarefa existente.  
- `DELETE /tasks/:id:` Exclui uma tarefa existente.  
Consulte a documentação da API para obter detalhes sobre os parâmetros e respostas de cada endpoint.

## Decisões de Design
- O microserviço foi projetado seguindo uma arquitetura em camadas, separando as responsabilidades em diferentes diretórios: cache para o Redis, db para o PostgreSQL, mongo para o MongoDB, rabbitmq para o RabbitMQ, routes para as rotas da API, models para os modelos de dados, entre outros.
- O ORM Sequelize foi utilizado para interagir com o PostgreSQL, enquanto o Mongoose foi usado para o MongoDB.
- O Redis foi utilizado como cache para melhorar o desempenho e a escalabilidade da aplicação, armazenando em memória as consultas frequentes ao banco de dados.
- A biblioteca amqplib foi utilizada para a comunicação com o RabbitMQ, permitindo o envio assíncrono de mensagens.
- A estrutura de pastas foi organizada de forma a separar as diferentes funcionalidades e camadas da aplicação, facilitando a manutenção e o teste individual de cada componente.
- Foi adotado o uso de variáveis de ambiente para configurar os bancos de dados e serviços externos, garantindo a flexibilidade e segurança do sistema em diferentes ambientes.
- A biblioteca express foi escolhida como framework web para a construção da API devido à sua simplicidade e robustez.
- Para os testes automatizados, foi utilizado o framework Jest em conjunto com as bibliotecas supertest e sinon para simular requisições HTTP e mockar dependências externas, permitindo uma cobertura abrangente e confiável dos testes.
- O arquivo .gitlab-ci.yaml foi criado para automatizar o processo de build, testes e deploy da aplicação no Kubernetes na DigitalOcean. Esse arquivo define os estágios do pipeline de integração contínua e as etapas necessárias para cada um deles. 

## Considerações Finais
O microserviço de tarefas foi desenvolvido seguindo boas práticas de arquitetura e design, visando a modularidade, testabilidade e escalabilidade da aplicação. O uso de bancos de dados diferentes, cache e mensageria assíncrona proporcionam uma base sólida para um sistema distribuído e resiliente.

Para mais detalhes sobre cada componente e suas funcionalidades, consulte o código-fonte e os comentários dos arquivos relevantes. Certifique-se de ler os arquivos de teste para entender a cobertura e o comportamento esperado da aplicação.

Agora você está pronto para executar, testar e implantar o microserviço de tarefas. Se tiver alguma dúvida ou problema, não hesite em entrar em contato com o autor (João Souza) para obter suporte.

Divirta-se codificando!