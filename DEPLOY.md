# 🚀 Publicar Bebox no GitHub Pages

## Passos para Deploy

### 1. Instalar gh-pages
```bash
npm install --save-dev gh-pages
```

### 2. Fazer commit das alterações
```bash
git add .
git commit -m "Configurar deploy para GitHub Pages"
git push
```

### 3. Publicar no GitHub Pages
```bash
npm run deploy
```

## Configurações Realizadas

### Vue Config
- `publicPath` configurado para `/bebox-front/` em produção
- Isso garante que os assets sejam encontrados corretamente

### Package.json
- Script `deploy` adicionado para automatizar o processo
- Build + deploy em um único comando

## Acesso
Após o deploy, seu site estará disponível em:
```
https://[seu-username].github.io/bebox-front/
```

## Estrutura de Pastas
```
bebox-front/
├── dist/           # Arquivos buildados
├── src/            # Código fonte
├── public/          # Arquivos estáticos
└── DEPLOY.md        # Este arquivo
```

## Solução de Problemas Comuns

### Assets não encontrados
Verifique se `publicPath` está correto no `vue.config.js`

### Rotas não funcionam
Vue Router precisa estar configurado para modo `history` ou `hash`

### Página branca
Verifique o console do navegador para erros de JavaScript

## Deploy Automatizado (Opcional)

### GitHub Actions
Crie `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```
