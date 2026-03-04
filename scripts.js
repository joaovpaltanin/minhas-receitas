// Os dados das receitas estão em receitas.js, carregado antes deste arquivo.

// Cache de elementos do DOM — evita buscas repetidas a cada interação
const els = {
    grid:       document.getElementById('recipesGrid'),
    noResults:  document.getElementById('noResults'),
    modal:      document.getElementById('modal'),
    modalImage: document.getElementById('modalImage'),
    modalTitle: document.getElementById('modalTitle'),
    modalIngredients: document.getElementById('modalIngredients'),
    modalInstructions: document.getElementById('modalInstructions'),
    modalMediaLink:    document.getElementById('modalMediaLink'),
    searchInput: document.getElementById('searchInput'),
};

// SVG reutilizável dos cards (definido uma vez, não recriado a cada render)
const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
const TAG_ICON  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`;

function renderRecipes(recipesToRender) {
    if (recipesToRender.length === 0) {
        els.grid.style.display = 'none';
        els.noResults.style.display = 'block';
        return;
    }

    els.grid.style.display = 'grid';
    els.noResults.style.display = 'none';

    els.grid.innerHTML = recipesToRender.map(recipe => `
        <div class="recipe-card" data-id="${recipe.id}">
            <div class="recipe-image-wrapper">
                <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}" loading="lazy" decoding="async">
            </div>
            <div class="recipe-info">
                <div class="recipe-name">${recipe.name}</div>
                <div class="recipe-meta">
                    <div class="recipe-meta-left">
                        <span class="recipe-tag">${TAG_ICON}${recipe.category}</span>
                        <span class="recipe-preview">${recipe.ingredients.length} ingredientes</span>
                    </div>
                    ${recipe.mediaLink
                        ? `<a class="card-video-link" href="${recipe.mediaLink}" target="_blank" rel="noopener noreferrer" aria-label="Assistir vídeo de ${recipe.name}">${PLAY_ICON}Vídeo</a>`
                        : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function openModal(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    els.modalImage.src = recipe.image;
    els.modalImage.alt = recipe.name;
    els.modalTitle.textContent = recipe.name;
    els.modalIngredients.innerHTML = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
    els.modalInstructions.textContent = recipe.instructions;
    els.modalMediaLink.href = recipe.mediaLink || '#';
    els.modalMediaLink.style.display = recipe.mediaLink ? '' : 'none';

    els.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => els.modal.classList.add('active'));
}

function closeModal() {
    els.modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { els.modal.style.display = 'none'; }, 300);
}

// Delegação de evento: um único listener no grid em vez de um onclick por card
els.grid.addEventListener('click', function (e) {
    const card = e.target.closest('.recipe-card');
    if (!card) return;

    // Ignora cliques no link de vídeo
    if (e.target.closest('.card-video-link')) return;

    openModal(Number(card.dataset.id));
});

// Fecha o modal ao clicar no overlay
els.modal.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

// Fecha o modal com ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && els.modal.style.display === 'block') closeModal();
});

// Debounce na busca — evita filtrar a cada tecla, aguarda 200ms de pausa
let searchTimer;
els.searchInput.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        const term = this.value.toLowerCase().trim();
        if (!term) {
            renderRecipes(recipes);
            return;
        }
        const filtered = recipes.filter(r =>
            r.name.toLowerCase().includes(term) ||
            r.category.toLowerCase().includes(term) ||
            r.ingredients.some(ing => ing.toLowerCase().includes(term))
        );
        renderRecipes(filtered);
    }, 200);
});

renderRecipes(recipes);
