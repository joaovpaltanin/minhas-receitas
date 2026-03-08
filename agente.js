const AGENTE_URL = "http://localhost:8000/cadastrar";
let tabAtual = "foto";

function openAgente() {
    const overlay = document.getElementById("agenteOverlay");
    overlay.style.display = "flex";
    requestAnimationFrame(() => overlay.classList.add("active"));
}

function closeAgente() {
    const overlay = document.getElementById("agenteOverlay");
    overlay.classList.remove("active");
    overlay.addEventListener("transitionend", () => {
        overlay.style.display = "none";
        resetAgente();
    }, { once: true });
}

function resetAgente() {
    document.getElementById("fotoInput").value = "";
    document.getElementById("fotoPreview").style.display = "none";
    document.getElementById("uploadPlaceholder").style.display = "flex";
    document.getElementById("linkInput").value = "";
    document.getElementById("textoInput").value = "";
    setMsg("", "");
    setLoading(false);
}

function switchTab(tab) {
    tabAtual = tab;
    document.querySelectorAll(".agente-tab").forEach(t => t.classList.remove("active"));
    document.getElementById("tab-" + tab).classList.add("active");
    ["foto", "link", "texto"].forEach(t => {
        document.getElementById("content-" + t).style.display = t === tab ? "block" : "none";
    });
    setMsg("", "");
}

function onFotoChange(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const preview = document.getElementById("fotoPreview");
    const placeholder = document.getElementById("uploadPlaceholder");
    const reader = new FileReader();
    reader.onload = e => {
        preview.src = e.target.result;
        preview.style.display = "block";
        placeholder.style.display = "none";
    };
    reader.readAsDataURL(file);
}

function setMsg(text, type) {
    const el = document.getElementById("agenteMsg");
    el.textContent = text;
    el.className = "agente-msg" + (type ? " agente-msg-" + type : "");
    el.style.display = text ? "block" : "none";
}

function setLoading(loading) {
    const btn = document.getElementById("agenteSubmitBtn");
    const txt = document.getElementById("submitBtnText");
    const spinner = document.getElementById("btnSpinner");
    btn.disabled = loading;
    txt.style.display = loading ? "none" : "inline";
    spinner.style.display = loading ? "block" : "none";
}

async function cadastrarReceita() {
    setMsg("", "");
    const formData = new FormData();
    formData.append("tipo", tabAtual);

    if (tabAtual === "foto") {
        const input = document.getElementById("fotoInput");
        if (!input.files || !input.files[0]) {
            setMsg("Selecione uma foto antes de continuar.", "erro");
            return;
        }
        formData.append("imagem", input.files[0]);
    } else if (tabAtual === "link") {
        const link = document.getElementById("linkInput").value.trim();
        if (!link) {
            setMsg("Informe o link do vídeo.", "erro");
            return;
        }
        formData.append("link", link);
    } else {
        const texto = document.getElementById("textoInput").value.trim();
        if (!texto) {
            setMsg("Escreva o texto da receita.", "erro");
            return;
        }
        formData.append("texto", texto);
    }

    setLoading(true);
    setMsg("Processando com IA, aguarde...", "info");

    try {
        const resp = await fetch(AGENTE_URL, { method: "POST", body: formData });
        const data = await resp.json();
        if (!resp.ok || data.erro) {
            setMsg("Erro: " + (data.erro || "Falha desconhecida."), "erro");
            setLoading(false);
            return;
        }
        setMsg(`Receita "${data.receita}" cadastrada com sucesso! Recarregando...`, "sucesso");
        setTimeout(() => { window.location.reload(); }, 1800);
    } catch (e) {
        setMsg("Não foi possível conectar ao servidor. Certifique-se que o backend está rodando (porta 8000).", "erro");
        setLoading(false);
    }
}

document.getElementById("agenteOverlay").addEventListener("click", function (e) {
    if (e.target === this) closeAgente();
});

const uploadArea = document.getElementById("uploadArea");
uploadArea.addEventListener("dragover", e => { e.preventDefault(); uploadArea.classList.add("drag-over"); });
uploadArea.addEventListener("dragleave", () => uploadArea.classList.remove("drag-over"));
uploadArea.addEventListener("drop", e => {
    e.preventDefault();
    uploadArea.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
        const input = document.getElementById("fotoInput");
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;
        onFotoChange(input);
    }
});
uploadArea.addEventListener("click", () => document.getElementById("fotoInput").click());
