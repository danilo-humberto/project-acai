# Shalom Açaí

Landing page e sistema de pedidos para uma loja local de acai, com montagem personalizada do pedido, acompanhamento em tempo real e painel administrativo com Kanban operacional.

## Visao Geral

O projeto foi construido com React, Vite, TypeScript, Tailwind CSS e Firebase. A experiencia principal permite que o cliente monte um pedido de acai ou creme, informe seus dados, escolha a forma de pagamento e acompanhe o status do pedido por um link publico.

No painel administrativo, a loja consegue visualizar os pedidos em tempo real, atualizar o status de preparo, consultar detalhes e separar pedidos cancelados em uma area propria.

## Funcionalidades

- Landing page responsiva com hero, chamada principal e contato.
- Montagem de pedido em etapas.
- Escolha de tamanho do pote: P, M ou G.
- Escolha do tipo de pedido: so acai, acai com creme ou so creme.
- Seleção de sabor de creme quando necessario.
- Seleção de frutas, adicionais e calda.
- Opcao de sem calda.
- Dados do cliente com mascara de telefone.
- Forma de pagamento com suporte a Pix, cartao e dinheiro.
- Campo de troco com mascara em Real brasileiro.
- Criacao de pedidos no Firebase Firestore.
- Modal de confirmacao com codigo do pedido e link de acompanhamento.
- Pagina publica de acompanhamento do pedido.
- Painel admin com login via Firebase Authentication.
- Kanban de pedidos com atualizacao em tempo real.
- Separacao de pedidos cancelados em uma tela propria.
- Pagina 404 personalizada.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Firebase Authentication
- Firebase Firestore
- React Router
- GSAP
- Lucide React

## Estrutura Principal

```text
src/
  assets/
    images/              # Imagens do hero, frutas e produtos
  components/
    admin/               # Componentes do painel administrativo
    landing/             # Secoes da landing page
    layout/              # Header, footer, container e logo
    order/               # Componentes do fluxo de pedido
    ui/                  # Componentes reutilizaveis
  contexts/
    AuthContext.tsx      # Contexto de autenticacao do admin
  data/
    *.ts                 # Configuracoes de tamanhos, frutas, caldas etc.
  hooks/
    useOrderBuilder.ts   # Estado e regras do fluxo de pedido
  lib/
    firebase.ts          # Inicializacao do Firebase
  pages/
    admin/               # Rotas do admin
    LandingPage.tsx
    TrackingPage.tsx
    NotFoundPage.tsx
  services/
    authService.ts       # Login e logout
    orderService.ts      # Criacao, leitura e atualizacao de pedidos
  types/
    order.ts             # Tipos do pedido
  utils/
    *.ts                 # Formatadores, validacoes e regras auxiliares
```

## Rotas

| Rota                    | Descricao                         |
| ----------------------- | --------------------------------- |
| `/`                     | Landing page e montagem do pedido |
| `/pedido/:trackingCode` | Acompanhamento publico do pedido  |
| `/admin/login`          | Login administrativo              |
| `/admin/pedidos`        | Kanban de pedidos                 |
| `/admin/cancelados`     | Lista de pedidos cancelados       |
| `*`                     | Pagina 404                        |

## Requisitos

- Node.js instalado
- Projeto Firebase configurado
- Firebase Authentication com login por e-mail e senha
- Firestore habilitado

## Configuracao do Ambiente

Crie um arquivo `.env` ou `.env.local` na raiz do projeto usando o modelo abaixo:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

O arquivo `.env.example` ja traz a lista das variaveis necessarias.

> Nao envie arquivos `.env` com credenciais reais para o GitHub.

## Instalacao

```bash
npm install
```

## Rodando em Desenvolvimento

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:5173
```

## Build de Producao

```bash
npm run build
```

## Preview do Build

```bash
npm run preview
```

## Firebase

O projeto usa Firestore para persistir pedidos na colecao:

```text
orders
```

Cada pedido e salvo usando o codigo de acompanhamento como identificador do documento. O painel admin escuta a colecao em tempo real e atualiza o Kanban automaticamente quando pedidos sao criados ou alterados.

### Status dos Pedidos

Os pedidos podem passar pelos seguintes status:

```text
received
preparing
ready_for_pickup
completed
cancelled
```

## Fluxo do Pedido

1. Cliente escolhe o tipo do pedido.
2. Cliente escolhe o tamanho do pote.
3. Se necessario, escolhe o sabor do creme.
4. Cliente escolhe frutas, adicionais e calda.
5. Cliente informa nome e telefone.
6. Cliente escolhe a forma de pagamento.
7. Pedido e validado e salvo no Firestore.
8. Cliente recebe codigo e link de acompanhamento.

## Painel Administrativo

O admin permite:

- visualizar pedidos em tempo real;
- mover pedidos entre etapas;
- consultar detalhes completos;
- cancelar pedidos;
- acompanhar pedidos cancelados em tela separada;
- verificar indicadores operacionais.

O acesso ao painel e protegido por Firebase Authentication.

## Personalizacao

Os principais dados do cardapio ficam em `src/data/`:

- `sizes.ts`
- `orderTypes.ts`
- `iceCreamFlavors.ts`
- `fruits.ts`
- `toppings.ts`
- `syrups.ts`
- `paymentMethods.ts`
- `storeConfig.ts`

Para alterar precos, sabores, frutas ou formas de pagamento, atualize esses arquivos.

## Licenca

Este projeto esta sob a licenca MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
