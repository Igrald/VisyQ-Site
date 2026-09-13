/**
 * Configuração do site -- os dois valores abaixo são os únicos que
 * você provavelmente vai precisar trocar:
 */
const CONFIG = {
  // Link direto pro arquivo .exe (ex: um "Release" do GitHub, ou um
  // link do Google Drive/outro storage). Ver README.md para como
  // publicar um Release no GitHub e pegar esse link.
  URL_DOWNLOAD_EXE: "COLOQUE_AQUI_O_LINK_DO_EXE",

  // Endereço da API DE DOWNLOADS -- uma API pequena e separada só
  // pra isso (nunca a mesma API de login/assinatura do app -- ver
  // conversa), publicada à parte (ver downloads_api.py). Usada só
  // pra registrar que um download aconteceu (ver conversa). Se
  // preferir não registrar nada, deixe essa string vazia ("") que o
  // site pula essa parte silenciosamente.
  URL_API_DOWNLOADS: "https://visyq-site-api.onrender.com/api/downloads/registrar",
};

document.getElementById("ano-atual").textContent = new Date().getFullYear();

/* ============================================================
   DOCUMENTAÇÃO ("Como utilizar")
============================================================ */
const docsOverlay = document.getElementById("docs-overlay");
const docsTreeEl = document.getElementById("docs-tree");
const docsContentEl = document.getElementById("docs-content");
const docsBusca = document.getElementById("docs-busca");

function abrirDocs(idParaAbrir) {
  docsOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  if (idParaAbrir) {
    selecionarTopico(idParaAbrir);
  }
  docsBusca.focus();
}

function fecharDocs() {
  docsOverlay.hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("btn-abrir-docs-nav").addEventListener("click", () => abrirDocs());
document.getElementById("btn-abrir-docs-hero").addEventListener("click", () => abrirDocs());
document.getElementById("btn-abrir-docs-footer").addEventListener("click", () => abrirDocs());
docsOverlay.querySelector("[data-fechar-docs]").addEventListener("click", fecharDocs);
docsOverlay.addEventListener("click", (e) => {
  if (e.target === docsOverlay) fecharDocs();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !docsOverlay.hidden) fecharDocs();
});

// Achata a árvore (categorias + filhos) numa lista única de folhas,
// pra busca e seleção não precisarem se preocupar com a hierarquia.
function folhasDaArvore() {
  const folhas = [];
  for (const item of DOCS_TREE) {
    if (item.filhos) {
      for (const filho of item.filhos) folhas.push({ ...filho, categoria: item.titulo });
    } else {
      folhas.push({ ...item, categoria: null });
    }
  }
  return folhas;
}
const TODAS_FOLHAS = folhasDaArvore();

function construirArvore(filtroTexto) {
  docsTreeEl.innerHTML = "";
  const termo = (filtroTexto || "").trim().toLowerCase();

  let algumResultado = false;

  for (const item of DOCS_TREE) {
    if (item.filhos) {
      const filhosVisiveis = item.filhos.filter((f) => bateComBusca(f, termo));
      if (termo && filhosVisiveis.length === 0) continue;
      algumResultado = true;

      const grupo = document.createElement("div");
      grupo.className = "docs-group";
      if (termo && filhosVisiveis.length) grupo.classList.add("open");

      const botaoGrupo = document.createElement("button");
      botaoGrupo.type = "button";
      botaoGrupo.className = "docs-group-btn";
      botaoGrupo.innerHTML = `<span class="docs-group-caret">▸</span> ${item.titulo}`;
      botaoGrupo.addEventListener("click", () => grupo.classList.toggle("open"));
      grupo.appendChild(botaoGrupo);

      const filhosEl = document.createElement("div");
      filhosEl.className = "docs-children";
      for (const filho of (termo ? filhosVisiveis : item.filhos)) {
        filhosEl.appendChild(criarBotaoFolha(filho));
      }
      grupo.appendChild(filhosEl);
      docsTreeEl.appendChild(grupo);
    } else {
      if (!bateComBusca(item, termo)) continue;
      algumResultado = true;
      docsTreeEl.appendChild(criarBotaoFolha(item));
    }
  }

  if (!algumResultado) {
    const vazio = document.createElement("p");
    vazio.className = "docs-no-results";
    vazio.textContent = "Nenhum tópico encontrado.";
    docsTreeEl.appendChild(vazio);
  }
}

function bateComBusca(item, termo) {
  if (!termo) return true;
  return (
    item.titulo.toLowerCase().includes(termo) ||
    (item.resumo || "").toLowerCase().includes(termo)
  );
}

function criarBotaoFolha(item) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "docs-leaf";
  btn.textContent = item.titulo;
  btn.dataset.id = item.id;
  btn.addEventListener("click", () => selecionarTopico(item.id));
  return btn;
}

function selecionarTopico(id) {
  const item = TODAS_FOLHAS.find((f) => f.id === id);
  if (!item) return;

  docsTreeEl.querySelectorAll(".docs-leaf").forEach((el) => {
    el.classList.toggle("active", el.dataset.id === id);
  });
  // Garante que o grupo-pai do item ativo esteja expandido.
  const ativo = docsTreeEl.querySelector(`.docs-leaf[data-id="${id}"]`);
  if (ativo) {
    const grupoPai = ativo.closest(".docs-group");
    if (grupoPai) grupoPai.classList.add("open");
  }

  const videoHtml = item.video
    ? `<iframe src="${item.video}" title="${item.titulo}" allowfullscreen loading="lazy"></iframe>`
    : `<div class="docs-video-pending">Vídeo em breve para este tópico.</div>`;

  docsContentEl.innerHTML = `
    <h3 class="docs-topic-title">${item.titulo}</h3>
    <div class="docs-video-slot">${videoHtml}</div>
    <div class="docs-body">${item.conteudo || `<p>${item.resumo || ""}</p>`}</div>
  `;
}

docsBusca.addEventListener("input", () => construirArvore(docsBusca.value));
construirArvore("");

/* ============================================================
   MODAL DE PERGUNTA + DOWNLOAD
============================================================ */
const modalPergunta = document.getElementById("modal-pergunta");
const btnConfirmarPergunta = document.getElementById("btn-confirmar-pergunta");
let respostaEscolhida = null;

function abrirModalPergunta() {
  respostaEscolhida = null;
  modalPergunta.querySelectorAll(".opcao-pergunta").forEach((el) => {
    el.setAttribute("aria-pressed", "false");
  });
  btnConfirmarPergunta.disabled = true;
  modalPergunta.hidden = false;
  document.body.style.overflow = "hidden";
}

function fecharModalPergunta() {
  modalPergunta.hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("btn-baixar-principal").addEventListener("click", abrirModalPergunta);
modalPergunta.querySelector("[data-fechar-pergunta]").addEventListener("click", fecharModalPergunta);
modalPergunta.addEventListener("click", (e) => {
  if (e.target === modalPergunta) fecharModalPergunta();
});

modalPergunta.querySelectorAll(".opcao-pergunta").forEach((botao) => {
  botao.addEventListener("click", () => {
    respostaEscolhida = botao.dataset.resposta;
    modalPergunta.querySelectorAll(".opcao-pergunta").forEach((el) => {
      el.setAttribute("aria-pressed", String(el === botao));
    });
    btnConfirmarPergunta.disabled = false;
  });
});

modalPergunta.querySelector("[data-pular-pergunta]").addEventListener("click", () => {
  concluirDownload(null);
});
btnConfirmarPergunta.addEventListener("click", () => {
  concluirDownload(respostaEscolhida);
});

function concluirDownload(resposta) {
  fecharModalPergunta();
  registrarDownload(resposta); // não bloqueia o download se falhar
  dispararDownloadDoArquivo();
}

function dispararDownloadDoArquivo() {
  const a = document.createElement("a");
  a.href = CONFIG.URL_DOWNLOAD_EXE;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function registrarDownload(resposta) {
  if (!CONFIG.URL_API_DOWNLOADS) return;
  fetch(CONFIG.URL_API_DOWNLOADS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resposta }),
  }).catch(() => {
    // Silencioso de propósito: uma falha aqui nunca deve impedir ou
    // avisar sobre o download em si -- é só telemetria.
  });
}