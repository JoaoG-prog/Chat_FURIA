# FURIA Fan Chat

Um aplicativo de chat em tempo real para fãs da FURIA interagirem, discutirem partidas, jogadores e novidades do time.

## Funcionalidades

- Chat em tempo real
- Autenticação de usuário
- Cadastro de nova conta
- Recuperação de senha
- Suporte via WhatsApp
- Interface moderna e responsiva
- Design temático FURIA
- Notificações de sistema para eventos de entrada/saída de usuários

## Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd furia-fan-chat
```

2. Instale as dependências do frontend:
```bash
npm install
```

3. Instale as dependências do servidor:
```bash
cd server
npm install
cd ..
```

## Executando a Aplicação

1. Inicie o servidor:
```bash
cd server
npm run dev
```

2. Em um novo terminal, inicie o frontend:
```bash
npm run dev
```

3. Abra o navegador e acesse `http://localhost:3000`

## Tecnologias Utilizadas

- Frontend:
  - React
  - Vite
  - Chakra UI
  - Socket.IO Client

- Backend:
  - Node.js
  - Express
  - Socket.IO
  - CORS

## Como contribuir

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça seus commits (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes. 