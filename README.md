# SOSC JUS — Site (Landing Page v2)

Este repositório contém o código da landing page do SOSC JUS, estruturado e pronto para deploy na Vercel.

## Estrutura do Projeto

- `index.html`: Página principal (Chooser) que conecta às seções de Usuário e Advogado.
- `usuario.html`: Detalhamento das funcionalidades para usuários (emergência, monitoramento de processos, alerta de mandados).
- `advogado.html`: Detalhamento das funcionalidades para advogados (prazos, audiências, contratos, etc.).
- `assets/`: Estilos (`style.css`) e scripts (`app.js`) utilizados pelo site.
- `images/`: Recursos visuais do aplicativo e imagens da interface.
- `renders/`: Mockups e capturas de tela das páginas.
- `standalone/`: Arquivos HTML compilados como standalone (com imagens embutidas em base64) para compartilhamento rápido.

## Como publicar na Vercel

1. Suba este repositório para o GitHub.
2. Acesse o painel da Vercel (https://vercel.com).
3. Importe o repositório `soscjus-site-v2`.
4. As configurações padrão de um projeto HTML estático funcionarão automaticamente (diretório raiz `.`, sem comando de build).
