# Site do VisyQ

Site estático (HTML/CSS/JS puro, sem build nenhum) pronto pra publicar
no GitHub Pages. Este README é só pra você — não aparece no site.

## Arquivos

- `index.html` — a página em si (estrutura).
- `styles.css` — todo o visual.
- `script.js` — a parte interativa (documentação, busca, modal de
  pergunta, download). É aqui que ficam as DUAS configurações que
  você precisa preencher (ver abaixo).
- `docs-content.js` — o conteúdo da documentação ("Como utilizar"),
  separado do resto de propósito, pra você (ou eu, numa próxima
  conversa) editar sem mexer em mais nada.

## 1) Publicar no GitHub Pages (de graça)

1. Crie um repositório novo no GitHub (pode ser público ou privado —
   Pages funciona nos dois em contas Pro; em conta grátis, só em
   repositório **público**).
2. Suba estes 4 arquivos pra raiz do repositório (`index.html`,
   `styles.css`, `script.js`, `docs-content.js`).
3. No repositório, vá em **Settings → Pages**.
4. Em "Source", escolha **Deploy from a branch**, branch `main`,
   pasta `/ (root)`. Salve.
5. Espere 1–2 minutos — o GitHub te dá um endereço assim:
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`
   (se o repositório se chamar exatamente `SEU-USUARIO.github.io`,
   o endereço fica só `https://SEU-USUARIO.github.io/`, sem a parte
   do nome do repositório).

## 2) Colocar o .exe pra baixar

GitHub Pages/repositórios comuns não são feitos pra guardar arquivos
grandes (tem limite de 100 MB por arquivo, e comprimir/descomprimir
o repositório fica pesado). O jeito certo é usar uma **GitHub
Release** (pensada exatamente pra isso, sem limite prático de
tamanho pra esse caso):

1. No repositório, vá em **Releases** (barra lateral direita) →
   **Create a new release**.
2. Dê uma tag (ex: `v1.0.0`), um título, e arraste o `.exe` pra área
   de "Attach binaries".
3. Publique. O GitHub te dá um link direto pro arquivo, algo como:
   `https://github.com/SEU-USUARIO/SEU-REPO/releases/download/v1.0.0/VisyQ-Setup.exe`
4. Cole esse link em `script.js`, na constante `CONFIG.URL_DOWNLOAD_EXE`.

Toda vez que lançar uma versão nova do `.exe`, é só criar uma Release
nova e atualizar esse link.

## 3) Configurar a API de downloads (contagem de downloads)

Isso é opcional — se você deixar `CONFIG.URL_API_DOWNLOADS` como
string vazia (`""`), o site simplesmente não tenta registrar nada
(o download continua funcionando normalmente).

Se quiser usar: é uma **API separada de propósito** (`downloads_api.py`,
entregue à parte) — nunca a mesma API de login/assinatura do app.
Ela pode usar o mesmo banco Postgres que você já tem (a tabela
`downloads_site` não tem relação nenhuma com usuários/assinaturas),
mas o **código e o deploy são independentes**.

1. Crie um repositório novo no GitHub só com `downloads_api.py` e
   `requirements.txt` (os que vieram junto com este site).
2. No Render (ou outro serviço parecido), crie um **novo Web
   Service** apontando pra esse repositório.
   - Start command: `uvicorn downloads_api:app --host 0.0.0.0 --port $PORT`
   - Variável de ambiente `DATABASE_URL`: pode usar a MESMA
     connection string do seu banco já existente (a tabela é criada
     sozinha no primeiro boot, não precisa rodar migração na mão) —
     ou uma nova, se preferir manter tudo bem separado também no
     banco.
3. Depois de publicado, você tem um endereço tipo
   `https://visyq-downloads.onrender.com`. Preencha:
   - Em `script.js`: `CONFIG.URL_API_DOWNLOADS` com
     `https://SEU-ENDERECO.onrender.com/api/downloads/registrar`.
   - Em `downloads_api.py`: `ORIGENS_PERMITIDAS` com o endereço real
     do seu site do GitHub Pages (passo 1) — sem isso, o navegador
     bloqueia a chamada por segurança (CORS).
4. Redeploy o serviço depois de editar `ORIGENS_PERMITIDAS`.

Nota: no plano gratuito do Render, o serviço "dorme" depois de um
tempo sem uso e demora uns segundos pra acordar na próxima chamada —
isso não afeta o download do `.exe` em si (o site nunca espera essa
chamada terminar pra liberar o arquivo).

Depois disso, cada download (com ou sem resposta à pergunta) vira uma
linha na tabela `downloads_site`. Consultas prontas pra ver os
números:

```sql
-- Total de downloads:
SELECT COUNT(*) FROM downloads_site;

-- Por motivo informado:
SELECT COALESCE(resposta, 'não respondeu') AS motivo, COUNT(*)
FROM downloads_site GROUP BY resposta ORDER BY COUNT(*) DESC;

-- Por dia:
SELECT date_trunc('day', criado_em) AS dia, COUNT(*)
FROM downloads_site GROUP BY dia ORDER BY dia DESC;
```

## 4) Trocar os prints (carrossel)

No `index.html`, procure por `showcase-track` — tem 8 `<div
class="showcase-card ph-N">` (mais 8 iguais, duplicados, pra rolagem
não ter costura). Troque cada par (o original e o duplicado, mesmo
`ph-N`) por uma imagem, por exemplo:

```html
<div class="showcase-card">
  <img src="prints/dashboard-vendas.png" alt="Dashboard de vendas no VisyQ">
</div>
```

E adicione no `styles.css`, dentro de `.showcase-card`, uma regra pra
imagem preencher o card:

```css
.showcase-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

O leve desfoque (`filter: blur(3px)`) já está aplicado a todo
`.showcase-card` — se quiser os prints nítidos, é só remover essa
linha do `styles.css`.

## 5) Preencher a documentação de verdade

Abra `docs-content.js`. Cada tópico tem:

- `video: null` → troque pelo link de **embed** do YouTube (não é o
  link normal — no vídeo, clique em "Compartilhar" → "Incorporar" e
  copie só a URL de dentro do `src="..."`). Fica assim:
  `video: "https://www.youtube.com/embed/SEU_ID_DO_VIDEO"`
- `conteudo` → o texto explicativo (HTML simples: `<p>`, `<ul><li>`,
  `<strong>`).

Não precisa mexer em `script.js` nem `index.html` pra isso — só
`docs-content.js`.
