// Dados das receitas carregados de receitas.js (declarado antes deste arquivo)

const els = {
    grid:             document.getElementById('recipesGrid'),
    noResults:        document.getElementById('noResults'),
    modal:            document.getElementById('modal'),
    modalImage:       document.getElementById('modalImage'),
    modalTitle:       document.getElementById('modalTitle'),
    modalIngredients: document.getElementById('modalIngredients'),
    modalInstructions: document.getElementById('modalInstructions'),
    modalMediaLink:   document.getElementById('modalMediaLink'),
    modalVariations:  document.getElementById('modalVariations'),
    searchInput:      document.getElementById('searchInput'),
};

const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
const TAG_ICON  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`;

const IMG_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23e8e8e8' width='400' height='200'/%3E%3Ctext fill='%23aaa' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.35em'%3ESem imagem%3C/text%3E%3C/svg%3E";

function renderRecipes(recipesToRender) {
    if (recipesToRender.length === 0) {
        els.grid.style.display = 'none';
        els.noResults.style.display = 'block';
        return;
    }

    els.grid.style.display = 'grid';
    els.noResults.style.display = 'none';

    els.grid.innerHTML = recipesToRender.map(recipe => {
        const imgSrc = recipe.image || IMG_PLACEHOLDER;
        return `
        <div class="recipe-card" data-id="${recipe.id}">
            <div class="recipe-image-wrapper">
                <img class="recipe-image" src="${imgSrc}" alt="${recipe.name}" loading="lazy" decoding="async" onerror="this.src='${IMG_PLACEHOLDER}'">
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
        </div>`;
    }).join('');
}

function openModal(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    els.modalImage.src = recipe.image || IMG_PLACEHOLDER;
    els.modalImage.alt = recipe.name;
    els.modalTitle.textContent = recipe.name;
    els.modalIngredients.innerHTML = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
    els.modalInstructions.textContent = recipe.instructions;

    if (recipe.variations && recipe.variations.length > 0) {
        els.modalMediaLink.style.display = 'none';
        els.modalVariations.style.display = 'flex';
        els.modalVariations.innerHTML = `
            <span class="variations-label">Assistir vídeo:</span>
            <div class="variations-btns">
                ${recipe.variations.map(v => `
                    <a class="variation-btn" href="${v.mediaLink}" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
                        ${v.label}
                    </a>
                `).join('')}
            </div>
        `;
    } else {
        els.modalMediaLink.href = recipe.mediaLink || '#';
        els.modalMediaLink.style.display = recipe.mediaLink ? '' : 'none';
        els.modalVariations.style.display = 'none';
        els.modalVariations.innerHTML = '';
    }

    els.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => els.modal.classList.add('active'));
}

function closeModal() {
    els.modal.classList.remove('active');
    document.body.style.overflow = '';
    els.modal.addEventListener('transitionend', () => {
        els.modal.style.display = 'none';
    }, { once: true });
}

// Delegação de evento: um único listener no grid
els.grid.addEventListener('click', function (e) {
    if (e.target.closest('.card-video-link')) return;
    const card = e.target.closest('.recipe-card');
    if (!card) return;
    openModal(Number(card.dataset.id));
});

els.modal.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && els.modal.style.display === 'block') closeModal();
});

// Busca com debounce de 200ms
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
