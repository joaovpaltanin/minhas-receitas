// Dados das receitas carregados de receitas.js (declarado antes deste arquivo)

const $ = id => document.getElementById(id);

const els = {
    grid: $('recipesGrid'),
    noResults: $('noResults'),
    resultsCount: $('resultsCount'),
    searchInput: $('searchInput'),
    searchClear: $('searchClear'),
    modal: $('modal'),
    modalImage: $('modalImage'),
    modalTitle: $('modalTitle'),
    modalMediaLink: $('modalMediaLink'),
    modalVariations: $('modalVariations'),
    modalDescription: $('modalDescription'),
    modalIngredients: $('modalIngredients'),
    modalInstructions: $('modalInstructions'),
    modalSource: $('modalSource'),
    shareBtn: $('shareBtn'),
    toast: $('toast'),
};

const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
const TAG_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`;
const IMG_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23e8e8e8' width='400' height='200'/%3E%3Ctext fill='%23aaa' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.35em'%3ESem imagem%3C/text%3E%3C/svg%3E";
const EAGER_IMAGES = 3; // cards visíveis sem rolar a página

const recipeHash = recipe => `#receita-${recipe.id}`;
const firstVideo = recipe => recipe.mediaLink || recipe.variations?.find(v => v.mediaLink)?.mediaLink;

// Minúsculas e sem acentos: "Limão" casa com "limao"
const normalize = text => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Imagens quebradas viram placeholder (um único listener em vez de onerror em cada <img>)
document.addEventListener('error', e => {
    if (e.target.tagName === 'IMG' && e.target.src !== IMG_PLACEHOLDER) e.target.src = IMG_PLACEHOLDER;
}, true);

/* ===================== LISTA E BUSCA ===================== */

function cardHTML(recipe, index) {
    const video = firstVideo(recipe);
    const preview = recipe.variations?.length
        ? `${recipe.variations.length} variações`
        : `${recipe.ingredients.length} ingredientes`;
    return `
        <article class="recipe-card" style="--i:${Math.min(index, 12)}">
            <img class="recipe-image" src="${recipe.image || IMG_PLACEHOLDER}" alt="" width="400" height="200"
                loading="${index < EAGER_IMAGES ? 'eager' : 'lazy'}" decoding="async">
            <div class="recipe-info">
                <h2 class="recipe-name"><a class="recipe-link" href="${recipeHash(recipe)}">${recipe.name}</a></h2>
                <div class="recipe-meta">
                    <span class="recipe-tag">${TAG_ICON}${recipe.category}</span>
                    <span class="recipe-preview">${preview}</span>
                    ${video ? `<a class="card-video-link" href="${video}" target="_blank" rel="noopener noreferrer" aria-label="Assistir vídeo de ${recipe.name}">${PLAY_ICON}Vídeo</a>` : ''}
                </div>
            </div>
        </article>`;
}

// Os cards são criados uma única vez; a busca só esconde/mostra
els.grid.innerHTML = recipes.map(cardHTML).join('');

const searchIndex = recipes.map((recipe, i) => ({
    card: els.grid.children[i],
    text: normalize([
        recipe.name,
        recipe.category,
        ...recipe.ingredients,
        ...(recipe.variations || []).flatMap(v => [v.label, ...(v.ingredients || [])]),
    ].join(' ')),
}));

function performSearch() {
    const term = normalize(els.searchInput.value.trim());
    let visible = 0;
    for (const { card, text } of searchIndex) {
        card.hidden = !text.includes(term);
        if (!card.hidden) visible++;
    }

    els.searchClear.hidden = !els.searchInput.value;
    els.noResults.hidden = visible > 0;
    els.grid.hidden = visible === 0;
    els.resultsCount.textContent = !visible ? ''
        : term ? `${visible} ${visible === 1 ? 'receita encontrada' : 'receitas encontradas'}`
        : `${visible} receitas`;
}

els.searchInput.addEventListener('input', performSearch);

els.searchClear.addEventListener('click', () => {
    els.searchInput.value = '';
    els.searchInput.focus();
    performSearch();
});

performSearch();

/* ===================== MODAL ===================== */

let currentRecipe = null;
let currentVariation = 0;

function showVariation(index) {
    currentVariation = index;
    const variation = currentRecipe.variations?.[index];
    const ingredients = variation?.ingredients || currentRecipe.ingredients;
    const mediaLink = variation?.mediaLink || currentRecipe.mediaLink;
    const description = variation?.description || currentRecipe.description;

    els.modalVariations.querySelectorAll('.variation-btn').forEach((btn, i) => {
        btn.setAttribute('aria-pressed', i === index);
    });

    els.modalIngredients.innerHTML = ingredients.map(ing => `<li>${ing}</li>`).join('');
    els.modalInstructions.textContent = variation?.instructions || currentRecipe.instructions;

    els.modalMediaLink.hidden = !mediaLink;
    els.modalMediaLink.href = mediaLink || '';

    els.modalDescription.hidden = !description;
    els.modalDescription.textContent = description || '';
}

function showRecipe(recipe) {
    currentRecipe = recipe;

    els.modalImage.src = recipe.image || IMG_PLACEHOLDER;
    els.modalImage.alt = recipe.name;
    els.modalTitle.textContent = recipe.name;

    els.modalVariations.hidden = !recipe.variations?.length;
    els.modalVariations.innerHTML = recipe.variations?.length ? `
        <span class="variations-label">Variações:</span>
        ${recipe.variations.map((v, i) => `<button type="button" class="variation-btn" data-index="${i}">${v.label}</button>`).join('')}
    ` : '';

    els.modalSource.hidden = !recipe.sourceLink;
    els.modalSource.href = recipe.sourceLink || '';

    showVariation(0);

    if (!els.modal.open) els.modal.showModal();
    els.modal.scrollTop = 0;
}

els.modalVariations.addEventListener('click', e => {
    const btn = e.target.closest('.variation-btn');
    if (btn) showVariation(Number(btn.dataset.index));
});

// Clique fora do card fecha o modal
els.modal.addEventListener('click', e => {
    if (e.target === els.modal) els.modal.close();
});

/* ===================== ROTAS (#receita-ID) ===================== */
// A receita aberta fica na URL: o link pode ser compartilhado e o "voltar" do navegador fecha o modal.

let openedFromList = false;

const recipeFromHash = () => {
    const id = Number(location.hash.match(/^#receita-(\d+)$/)?.[1]);
    return recipes.find(r => r.id === id);
};

function route(fromNavigation) {
    const recipe = recipeFromHash();
    if (recipe) {
        openedFromList = fromNavigation;
        showRecipe(recipe);
    } else if (els.modal.open) {
        els.modal.close();
    }
}

els.modal.addEventListener('close', () => {
    if (!recipeFromHash()) return; // fechado pelo "voltar": a URL já está certa
    if (openedFromList) history.back();
    else history.replaceState(null, '', location.pathname + location.search);
});

window.addEventListener('hashchange', () => route(true));
route(false);

/* ===================== COMPARTILHAR ===================== */

let toastTimer;
function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('visible'), 2500);
}

els.shareBtn.addEventListener('click', async () => {
    const url = location.origin + location.pathname + location.search + recipeHash(currentRecipe);

    // Web Share API (celulares e alguns navegadores desktop)
    if (navigator.share) {
        try {
            await navigator.share({ title: currentRecipe.name, text: `Olha essa receita de ${currentRecipe.name}!`, url });
            return;
        } catch (err) {
            if (err.name === 'AbortError') return; // usuário cancelou
        }
    }

    // Fallback: copiar link para a área de transferência
    try {
        await navigator.clipboard.writeText(url);
        showToast('Link da receita copiado!');
    } catch {
        window.prompt('Copie o link da receita:', url);
    }
});
