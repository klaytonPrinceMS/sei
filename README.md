# Guia SEI — Prefeitura de Monte Santo de Minas

Guia prático do SEI (Sistema Eletrônico de Informações) para servidores e cidadãos do município.
Site estático multi-página em HTML + CSS + JS puro, sem dependências, publicado no GitHub Pages.

🌐 **Site no ar:** https://klaytonprincems.github.io/sei/

## Características

- **7 páginas:** Início, Aprender, Servidor, Externo, Sistema, Referência e Ajuda, com navegação anterior/próxima em cadeia circular.
- **Tema claro como padrão**, com alternância para o tema escuro (escolha salva no navegador).
- **Paleta oficial** do site da Prefeitura (https://montesantodeminas.mg.gov.br/): azul `#0095eb`, índigo `#363871`, amarelo `#fecd29`.
- **Responsivo:** menu hambúrguer no celular, busca com filtro em todas as páginas.
- **Interativo:** jornada e checklist com barra de progresso salva, assistente “qual processo eu uso?”, tabelas com filtro, modelos de texto com botão copiar.
- Conteúdo de referência adaptado de https://guipaicheco.github.io/SEI/.

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Início: 4 acessos oficiais + hub de navegação + contato da gestão |
| `aprender.html` | Jornada do zero ao envio, checklist, assistente de processo |
| `servidor.html` | Acesso de servidor, quadro “Indispensável”, modelo de memorando |
| `externo.html` | Usuário externo, peticionamento, gov.br × senha do SEI |
| `sistema.html` | Tela principal, SEI Pro, tipos de processo, unidades |
| `referencia.html` | Níveis de acesso, ícones, atalhos, modelos, erros |
| `ajuda.html` | Contatos da gestão do SEI, tutoriais, manual, site da Prefeitura |

## Links oficiais incluídos

- Servidor: https://montesantodeminas.sei.mg.gov.br/sip/login.php?sigla_orgao_sistema=ABC&sigla_sistema=SEI&infra_url=L3NlaS8=
- Usuário externo: https://montesantodeminas.sei.mg.gov.br/sei/controlador_externo.php?acao=usuario_externo_logar&id_orgao_acesso_externo=0
- Pesquisa pública: https://montesantodeminas.sei.mg.gov.br/sei/modulos/pesquisa/md_pesq_processo_pesquisar.php?acao_externa=protocolo_pesquisar&acao_origem_externa=protocolo_pesquisar&id_orgao_acesso_externo=0
- Conferir documento: https://montesantodeminas.sei.mg.gov.br/sei/controlador_externo.php?acao=documento_conferir&id_orgao_acesso_externo=0

## Gestão do SEI

- E-mail: sei@montesantodeminas.mg.gov.br
- Telefone: (35) 3591-5128 — Klayton Prince

## Publicação (GitHub Pages)

O deploy é automático via `.github/workflows/pages.yml`: todo push na branch `main` publica o site.

```bash
git add -A
git commit -m "260101 12:00 breve resumo da alteração"
git push origin main
```

Padrão de mensagem: `AADDMM h:m breve resumo` (ex.: `261018 9:28 revisao portugues - concordancia e regencia`).

## Testar localmente

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Personalizar

- Textos e contatos: editar os arquivos `.html` (o bloco de navegação é idêntico nas 7 páginas — mantenha a ordem: Início, Aprender, Servidor, Externo, Sistema, Referência, Ajuda).
- Tabelas dinâmicas: constantes `TIPOS`, `UNIDADES`, `MODELOS`, `ERROS`, `ATALHOS`, `ICONES` em `app.js`.
- Cores e layout: variáveis `:root` em `styles.css` (responsivo + tema claro/escuro).
