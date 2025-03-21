# Sales Experience - Verificador de Ingressos

Aplicação para validação de ingressos do evento Sales Experience

## Instalação

Para garantir que os estilos CSS sejam aplicados corretamente, execute os seguintes comandos:

```bash
# Instalação de dependências
npm install

# Instalação específica do Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Desenvolvimento
npm run dev
```

## Solução de problemas comuns

Se os estilos não estiverem sendo aplicados:

1. Certifique-se de que todas as dependências foram instaladas
2. Verifique se o arquivo tailwind.config.js está configurado corretamente
3. Reinicie o servidor de desenvolvimento
```

## Estrutura do projeto

```
qrcode/
├── components/        # Componentes React reutilizáveis
├── pages/             # Páginas da aplicação
│   ├── api/           # API routes
│   ├── _app.js        # Configuração global da aplicação
│   └── index.js       # Página principal
├── styles/            # Arquivos de estilo
│   └── globals.css    # Estilos globais com Tailwind
├── utils/             # Funções utilitárias
│   └── api.js         # Funções para chamadas de API
└── public/            # Arquivos estáticos
```
