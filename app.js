/* Guia SEI — Monte Santo de Minas | JS sem dependências, multi-página */
(function(){
"use strict";
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const byId = (id) => document.getElementById(id);
const has = (id) => !!byId(id);

/* ---------- Tema (claro é o padrão) ---------- */
const btnTema = byId("btnTema");
if(btnTema){
  try{
    const salvo = localStorage.getItem("sei-msm-tema");
    document.documentElement.setAttribute("data-theme", salvo === "dark" ? "dark" : "light");
  }catch(e){ document.documentElement.setAttribute("data-theme", "light"); }
  const pintaTema = () => {
    const escuro = document.documentElement.getAttribute("data-theme") === "dark";
    btnTema.setAttribute("aria-pressed", escuro ? "true" : "false");
    btnTema.textContent = escuro ? "☀️ Tema claro" : "🌙 Tema escuro";
  };
  pintaTema();
  btnTema.addEventListener("click", () => {
    const escuro = document.documentElement.getAttribute("data-theme") !== "dark";
    document.documentElement.setAttribute("data-theme", escuro ? "dark" : "light");
    try{ localStorage.setItem("sei-msm-tema", escuro ? "dark" : "light"); }catch(e){}
    pintaTema();
  });
}

/* ---------- Menu mobile ---------- */
const btnMenu = byId("btnMenu"), nav = byId("nav");
if(btnMenu && nav){
  btnMenu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btnMenu.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("#nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    btnMenu.setAttribute("aria-expanded","false");
  }));
}

/* ---------- Página atual no menu ---------- */
const pagina = document.body.dataset.page;
$$("#nav a[data-page]").forEach(a => a.classList.toggle("on", a.dataset.page === pagina));

/* ---------- Copiar links (início) ---------- */
const copyMsg = byId("copyMsg");
$$(".copiar").forEach(b => b.addEventListener("click", async () => {
  const url = b.dataset.url;
  try{ await navigator.clipboard.writeText(url); if(copyMsg) copyMsg.textContent = "✅ Link copiado!"; }
  catch(e){
    const ta = document.createElement("textarea");
    ta.value = url; document.body.appendChild(ta); ta.select();
    try{ document.execCommand("copy"); if(copyMsg) copyMsg.textContent = "✅ Link copiado!"; }
    catch(_){ if(copyMsg) copyMsg.textContent = url; }
    ta.remove();
  }
  if(copyMsg) setTimeout(()=> copyMsg.textContent = "", 3000);
}));

/* ---------- Copiar memorando (servidor) ---------- */
if(has("btnCopiarMem")){
  byId("btnCopiarMem").addEventListener("click", async () => {
    const txt = byId("modAcesso").textContent;
    try{ await navigator.clipboard.writeText(txt); byId("memMsg").textContent = "✅ Texto copiado!"; }
    catch(e){ byId("memMsg").textContent = "Selecione e copie manualmente (Ctrl+C)."; }
    setTimeout(()=> byId("memMsg").textContent = "", 3000);
  });
}

/* ---------- Jornada com progresso (aprender) ---------- */
if(has("jorList")){
  const items = $$("#jorList li"), bar = byId("pbJor"), txt = byId("pbJorTxt");
  let estado = [];
  try{ estado = JSON.parse(localStorage.getItem("sei-msm-jornada") || "[]"); }catch(e){}
  const pinta = () => {
    const n = items.filter(li => li.classList.contains("ok")).length;
    bar.style.width = (n/items.length*100) + "%";
    txt.textContent = `${n} de ${items.length} concluídos`;
  };
  items.forEach((li, i) => {
    if(estado[i]) li.classList.add("ok");
    li.addEventListener("click", (ev) => {
      if(ev.target.tagName === "A") return;
      li.classList.toggle("ok");
      try{ localStorage.setItem("sei-msm-jornada", JSON.stringify(items.map(x => x.classList.contains("ok") ? 1 : 0))); }catch(e){}
      pinta();
    });
  });
  pinta();
}

/* ---------- Checklist (aprender) ---------- */
if(has("ckList")){
  const inputs = $$("#ckList input"), bar = byId("pbChk"), txt = byId("pbChkTxt");
  let estado = [];
  try{ estado = JSON.parse(localStorage.getItem("sei-msm-check") || "[]"); }catch(e){}
  const pinta = () => {
    const n = inputs.filter(x => x.checked).length;
    bar.style.width = (n/inputs.length*100) + "%";
    txt.textContent = `${n} de ${inputs.length} conferidos`;
  };
  inputs.forEach((c, i) => {
    if(estado[i]) c.checked = true;
    c.addEventListener("change", () => {
      try{ localStorage.setItem("sei-msm-check", JSON.stringify(inputs.map(x => x.checked ? 1 : 0))); }catch(e){}
      pinta();
    });
  });
  pinta();
}

/* ---------- Checklist do pedido de acesso (servidor) ---------- */
if(has("ckPed")){
  const inputs = $$("#ckPed input"), bar = byId("pbPed"), txt = byId("pbPedTxt");
  let estado = [];
  try{ estado = JSON.parse(localStorage.getItem("sei-msm-pedido") || "[]"); }catch(e){}
  const pinta = () => {
    const n = inputs.filter(x => x.checked).length;
    bar.style.width = (n/inputs.length*100) + "%";
    txt.textContent = `${n} de ${inputs.length} conferidos`;
  };
  inputs.forEach((c, i) => {
    if(estado[i]) c.checked = true;
    c.addEventListener("change", () => {
      try{ localStorage.setItem("sei-msm-pedido", JSON.stringify(inputs.map(x => x.checked ? 1 : 0))); }catch(e){}
      pinta();
    });
  });
  pinta();
}

/* ---------- Ícones (referência) ---------- */
const ICONES = [
  ["📁→","Enviar processo","Remete o processo a outra unidade."],
  ["📁i","Atualizar andamento","Registra informações no histórico."],
  ["👤","Atribuição","Define o responsável na unidade."],
  ["🧩","Incluir em bloco","Agrupa processos (assinatura, reunião)."],
  ["✍️","Assinar","Assina o documento gerado no editor do SEI."],
  ["📎","Anexar / Incluir externo","Junta PDF ou arquivo ao processo."],
  ["⏰","Prazo / retorno","Marca a data de retorno programado."],
  ["👁️","Acompanhamento especial","Acompanha o processo de outra unidade."],
  ["🔍","Pesquisar","Busca processos e documentos."],
  ["📝","Gerar documento","Cria Memorando, Ofício, Despacho etc."],
  ["🗑️","Excluir","Remove o item (verifique permissões)."],
  ["🔓/🔒","Nível de acesso","Público, Restrito ou Sigiloso."],
];
if(has("tabIco")){
  const pintaIco = (filtro="") => {
    const f = filtro.toLowerCase();
    byId("tabIco").querySelector("tbody").innerHTML = ICONES
      .filter(([a,b,c]) => (a+b+c).toLowerCase().includes(f))
      .map(([a,b,c]) => `<tr><td style="font-size:22px">${a}</td><td><b>${b}</b></td><td>${c}</td></tr>`).join("")
      || `<tr><td colspan="3">Nada encontrado.</td></tr>`;
  };
  pintaIco();
  byId("fIco").addEventListener("input", e => pintaIco(e.target.value));
}

/* ---------- Atalhos (referência) ---------- */
if(has("tabAtl")){
  const ATALHOS = [
    ["Geral","ALT+F1","Mostra a lista de atalhos"],
    ["Geral","ALT+F9","Exibir / ocultar menu"],
    ["Geral","ALT+F11","Trocar de unidade"],
    ["Geral","ALT+M","Pesquisar no menu"],
    ["Processo","ALT+F2","Controle de processos"],
    ["Processo","ALT+F3","Iniciar processo"],
    ["Processo","ALT+F7","Enviar processo"],
    ["Documento","ALT+F5","Incluir documento"],
    ["Documento","ALT+F6","Assinar documento"],
    ["Navegação","ESC","Fechar janela / cancelar"],
    ["Editor","CTRL+SHIFT+V","Colar sem formatação"],
  ];
  byId("tabAtl").querySelector("tbody").innerHTML = ATALHOS.map(([g,t,a]) =>
    `<tr><td>${g}</td><td><kbd>${t}</kbd></td><td>${a}</td></tr>`).join("");
}

/* ---------- Wizard: qual processo (aprender) ---------- */
if(has("wiz")){
  const WIZ = [
    {q:"O que você precisa fazer?", opts:[
      {t:"Enviar comunicação / solicitação (memorando, ofício)", tipo:"PA - Informações", doc:"Memorando ou Ofício", acesso:"Público (ou Restrito se tiver dado pessoal)"},
      {t:"Pedir férias, licença ou algo de RH", tipo:"RH - Férias / Licenças (exemplo)", doc:"Requerimento + documentos", acesso:"Restrito (dado pessoal)"},
      {t:"Contratos, compras, convênios", tipo:"Contratos / Compras (exemplo)", doc:"Termo, contrato ou pedido", acesso:"Público (ou Restrito conforme o caso)"},
      {t:"Publicar no Diário Oficial", tipo:"PA - Publicação em Diário Oficial (exemplo)", doc:"Texto a publicar", acesso:"Público"},
    ]},
    {q:"Tem dado pessoal, de saúde ou sensível?", opts:[
      {t:"Sim (CPF, endereço, saúde, prontuário…)", fixa:{acesso:"Restrito — indique a hipótese legal (LGPD)"}},
      {t:"Não", fixa:{acesso:"Público (confirme com a chefia)"}},
    ]},
  ];
  let passo = 0, resp = {};
  const box = byId("wiz");
  const pintaWiz = () => {
    if(passo >= WIZ.length){
      const r0 = resp[0], r1 = resp[1];
      box.innerHTML = `<div class="res">
        <dt>Tipo de processo sugerido</dt><dd>${r0.tipo}</dd>
        <dt>Documento</dt><dd>${r0.doc}</dd>
        <dt>Nível de acesso</dt><dd>${r1?.fixa?.acesso || r0.acesso}</dd>
        <p class="muted">Exemplo de referência — confirme a tabela oficial da sua unidade (<a href="sistema.html#tipos">Tipos</a>).</p>
        <button class="btn sec" id="wizAgain" type="button">↩ Recomeçar</button>
      </div>`;
      byId("wizAgain").addEventListener("click", ()=>{ passo=0; resp={}; pintaWiz(); });
      return;
    }
    const etapa = WIZ[passo];
    box.innerHTML = `<p><b>Passo ${passo+1} de ${WIZ.length}:</b> ${etapa.q}</p>` +
      etapa.opts.map((o,i)=>`<button class="opt" data-i="${i}" type="button">${o.t}</button>`).join("") +
      (passo>0 ? `<button class="btn sec" id="wizBack" type="button">← Voltar</button>` : "");
    $$("#wiz .opt").forEach(b => b.addEventListener("click", ()=>{
      resp[passo] = etapa.opts[+b.dataset.i];
      passo++; pintaWiz();
    }));
    const back = byId("wizBack");
    if(back) back.addEventListener("click", ()=>{ passo--; pintaWiz(); });
  };
  pintaWiz();
}

/* ---------- Modelos (referência) ---------- */
const MODELOS = [
  {t:"Memorando · solicitação a outra unidade", tag:"memorando solicitação",
   corpo:"Assunto: Solicitação de [informação/material/providência]\n\nPrezado(a) [Nome/Cargo],\n\nSolicitamos [o que é pedido], referente a [período/assunto], até o dia [data], para [finalidade].\n\nÀ disposição para dúvidas.\n\nAtenciosamente,\n[Nome] — [Unidade]"},
  {t:"Ofício · comunicação externa", tag:"ofício externo",
   corpo:"Assunto: [Assunto do ofício]\n\nPrezado(a) [Nome/Cargo/Instituição],\n\n[Parágrafo 1: contexto e objetivo.]\n[Parágrafo 2: pedido ou informação principal, com prazo se houver.]\n\nAtenciosamente,\n[Nome]\n[Cargo] — Prefeitura de Monte Santo de Minas"},
  {t:"Despacho · encaminhamento interno", tag:"despacho encaminhar",
   corpo:"Encaminho o presente processo à [Unidade de destino] para [providência: análise / manifestação / assinatura / prosseguimento], com prazo até [data, se houver].\n\n[Observação complementar, se necessário.]"},
  {t:"Peticionamento · texto de envio (externo)", tag:"peticionamento externo cidadão",
   corpo:"Venho, por meio deste, [apresentar documentos / complementar informações / fazer uma solicitação] referente ao processo [número, se houver]:\n\n[Descreva o pedido de forma objetiva.]\n\nDocumentos anexos: [liste os PDFs].\n\n[Nome completo] — [CPF/CNPJ] — [Telefone/e-mail]"},
];
if(has("modList")){
  const pintaMod = (f="") => {
    const fl = f.toLowerCase();
    byId("modList").innerHTML = MODELOS
      .filter(m => (m.t+m.tag+m.corpo).toLowerCase().includes(fl))
      .map((m)=>`<div class="mod"><h3>${m.t}</h3><pre>${m.corpo.replace(/</g,"&lt;")}</pre><button class="btn sec" data-m="${MODELOS.indexOf(m)}" type="button">📋 Copiar</button></div>`).join("")
      || `<div class="empty">Nada encontrado.</div>`;
    $$("#modList [data-m]").forEach(b => b.addEventListener("click", async ()=>{
      const txt = MODELOS[+b.dataset.m].corpo;
      try{ await navigator.clipboard.writeText(txt); b.textContent = "✅ Copiado!"; }
      catch(e){ b.textContent = "Selecione e copie (Ctrl+C)"; }
      setTimeout(()=> b.textContent = "📋 Copiar", 2000);
    }));
  };
  pintaMod();
  byId("fMod").addEventListener("input", e => pintaMod(e.target.value));
}

/* ---------- Erros (referência) ---------- */
if(has("errList")){
  const ERROS = [
    ["✍️ Não consigo assinar","assinar senha bloqueado","Confira a <b>senha do SEI</b> e o cargo/função na tela de assinatura. <b>Documento externo (PDF)</b> não recebe assinatura eletrônica — só documentos criados no editor."],
    ["📎 Anexo não entra / dá erro","anexo pdf upload tamanho","Use <b>PDF</b>, de preferência até 10–20 MB por arquivo. Evite foto torta ou ilegível. Tente outro navegador ou renomeie sem acento/espaço."],
    ["🫥 Documento sumiu da tela","sumiu árvore desapareceu","Verifique o <b>filtro</b>, a <b>unidade</b> no topo e a <b>pesquisa</b>. Pode ter sido tramitado — veja o <b>histórico/andamento</b>."],
    ["📤 Enviei para a unidade errada","enviei errado destino","Peça à unidade que recebeu para <b>devolver/tramitar de volta</b>. Registre o ocorrido no andamento."],
    ["🔑 Esqueci a senha","senha esqueci login entrar","Servidor: fale com a <b>gestão do SEI/TI</b>. Externo: na tela de acesso externo, clique em <b>Esqueci minha senha</b>."],
    ["🔒 Processo restrito, não abro","restrito acesso negado","Restrito só abre para unidades por onde tramitou. Peça <b>tramitação</b> ou <b>acesso externo</b> liberado pelo responsável."],
    ["⏰ Prazo / retorno não aparece","prazo retorno","Confira se o processo está <b>aberto na sua unidade</b> e se o retorno foi marcado. Use <i>Controle de Prazos</i>."],
  ];
  const pintaErr = (f="") => {
    const fl = f.toLowerCase();
    byId("errList").innerHTML = ERROS
      .filter(([t,tag]) => (t+tag).toLowerCase().includes(fl))
      .map(([t,,d])=>`<details><summary>${t}</summary><p>${d}</p></details>`).join("")
      || `<div class="empty">Nada encontrado.</div>`;
  };
  pintaErr();
  byId("fErr").addEventListener("input", e => pintaErr(e.target.value));
}

/* ---------- Tipos (sistema) ---------- */
if(has("tabTip")){
  const TIPOS = [
    ["PA - Informações","Memorandos, ofícios e comunicações internas","Público / Restrito*"],
    ["RH - Férias / Licenças","Pedidos funcionais com dados pessoais","Restrito"],
    ["Contratos e Compras","Contratações, pedidos e convênios","Público / Restrito*"],
    ["Publicação em Diário Oficial","Textos a publicar","Público"],
    ["Atendimento ao Cidadão / Ouvidoria","Demandas externas","Restrito*"],
    ["Prestação de Contas","Convênios e repasses","Público / Restrito*"],
  ];
  const pintaTip = (f="") => {
    const fl = f.toLowerCase();
    byId("tabTip").querySelector("tbody").innerHTML = TIPOS
      .filter(r => r.join(" ").toLowerCase().includes(fl))
      .map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("");
  };
  pintaTip();
  byId("fTip").addEventListener("input", e => pintaTip(e.target.value));
}

/* ---------- Unidades (sistema) ---------- */
if(has("tabUni")){
  const UNIDADES = [
    ["AEG","Assessoria Especial de Governo"],
    ["CGI","Controladoria Geral - Interna"],
    ["CTUT","Conselho Tutelar"],
    ["DAD","Divisão de Administração Distrital"],
    ["DASF","Divisão de Atenção à Saúde da Família"],
    ["DAT","Divisão de Arrecadação Tributária"],
    ["DCAR","Divisão de Controle, Avaliação e Regulação"],
    ["DCONT","Divisão de Contabilidade"],
    ["DCONV","Divisão de Convênios"],
    ["DCSE","Divisão de Comunicação Social e Eventos"],
    ["DCULT","Divisão de Cultura"],
    ["DEL","Divisão de Esporte e Lazer"],
    ["DEV","Divisão de Estradas Vicinais"],
    ["DGE","Divisão de Gestão Escolar"],
    ["DGF","Divisão de Gestão de Frotas"],
    ["DIC","Divisão de Indústria e Comércio"],
    ["DINF","Divisão de Infraestrutura"],
    ["DMA","Divisão de Meio Ambiente"],
    ["DOPE","Divisão de Obras Públicas e Engenharia"],
    ["DPCGM","Divisão de Planejamento, Contratação e Gestão de Materiais"],
    ["DPRH","Divisão de Pessoal e Recursos Humanos"],
    ["DPS","Divisão de Programas Sociais"],
    ["DSP","Divisão de Serviços Públicos"],
    ["DTESO","Divisão de Tesouraria"],
    ["DTI","Divisão de Tecnologia da Informação"],
    ["DTUR","Divisão de Turismo"],
    ["DVS","Divisão de Vigilância em Saúde"],
    ["GAB PREF","Gabinete do Prefeito"],
    ["PJUR","Procuradoria Jurídica"],
    ["SAC","Setor de Administração de Cemitérios"],
    ["SCON","Setor de Contratos"],
    ["SEC-ADM","Secretaria de Administração"],
    ["SEC-ASS","Secretaria de Assistência Social"],
    ["SEC-EDU","Secretaria de Educação"],
    ["SEC-FIN","Secretaria de Finanças"],
    ["SEC-GOV","Secretaria de Governo e Desenvolvimento Econômico"],
    ["SEC-OBR","Secretaria de Obras"],
    ["SEC-SAU","Secretaria de Saúde"],
    ["SEC-URB","Secretaria Municipal de Planejamento Urbano"],
    ["SFV","Setor de Fortalecimento de Vínculos"],
    ["SGMA","Setor de Gestão de Materiais e Almoxarifado"],
    ["SMVME","Setor de Manutenção de Veículos, Máquinas e Equipamentos"],
    ["SPBF","Setor de Programa Bolsa Família"],
    ["STPV","Setor de Trânsito e Planejamento Viário"],
    ["SVE","Setor de Vigilância Epidemiológica"],
    ["SVS","Setor de Vigilância Sanitária"],
  ];
  const pintaUni = (f="") => {
    const fl = f.toLowerCase();
    byId("tabUni").querySelector("tbody").innerHTML = UNIDADES
      .filter(([s,n]) => (s+n).toLowerCase().includes(fl))
      .map(([s,n])=>`<tr><td class="sigla"><button data-s="${s}" type="button" title="Copiar sigla">${s}</button></td><td>${n}</td></tr>`).join("");
    $$("#tabUni [data-s]").forEach(b => b.addEventListener("click", async ()=>{
      try{ await navigator.clipboard.writeText(b.dataset.s); b.textContent = "✅"; }
      catch(e){}
      setTimeout(()=> b.textContent = b.dataset.s, 1200);
    }));
  };
  pintaUni();
  byId("fUni").addEventListener("input", e => pintaUni(e.target.value));
}

/* ---------- Pesquisa na página ---------- */
const q = byId("q"), noResult = byId("noResult");
if(q){
  q.addEventListener("input", ()=>{
    const termo = q.value.trim().toLowerCase();
    if(!termo){
      $$("main .bloco").forEach(s => s.style.display = "");
      if(noResult) noResult.hidden = true;
      return;
    }
    let visiveis = 0;
    $$("main .bloco").forEach(sec => {
      if(sec.id === "acessos"){ sec.style.display = ""; return; }
      const mostra = (sec.textContent || "").toLowerCase().includes(termo);
      sec.style.display = mostra ? "" : "none";
      if(mostra) visiveis++;
    });
    if(noResult) noResult.hidden = visiveis > 0;
  });
}

})();
