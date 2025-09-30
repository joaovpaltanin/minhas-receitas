const recipes = [
    {
        id: 1,
        name: "Bolo de Chocolate",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        ingredients: [
            "2 xícaras de farinha de trigo",
            "1 xícara de chocolate em pó",
            "2 xícaras de açúcar",
            "3 ovos",
            "1 xícara de leite",
            "1/2 xícara de óleo",
            "1 colher de sopa de fermento em pó"
        ],
        instructions: `1. Pré-aqueça o forno a 180°C e unte uma forma.

2. Em uma tigela, misture os ingredientes secos: farinha, chocolate em pó, açúcar e fermento.

3. Em outra tigela, bata os ovos, adicione o leite e o óleo.

4. Misture os ingredientes líquidos aos secos até obter uma massa homogênea.

5. Despeje a massa na forma e leve ao forno por aproximadamente 40 minutos.

6. Faça o teste do palito antes de retirar do forno.`
    },
    {
        id: 2,
        name: "Lasanha à Bolonhesa",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop",
        ingredients: [
            "500g de massa para lasanha",
            "500g de carne moída",
            "1 cebola picada",
            "2 dentes de alho",
            "500ml de molho de tomate",
            "500ml de molho branco",
            "200g de queijo mussarela",
            "Sal e pimenta a gosto"
        ],
        instructions: `1. Refogue a cebola e o alho, adicione a carne moída e tempere.

2. Acrescente o molho de tomate e deixe cozinhar por 15 minutos.

3. Cozinhe a massa da lasanha conforme instruções da embalagem.

4. Em um refratário, alterne camadas de massa, molho bolonhesa, molho branco e queijo.

5. Finalize com queijo mussarela por cima.

6. Leve ao forno pré-aquecido a 200°C por 30 minutos até dourar.`
    },
    {
        id: 3,
        name: "Salada Caesar",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        ingredients: [
            "1 pé de alface romana",
            "100g de queijo parmesão",
            "200g de peito de frango",
            "Croutons",
            "Molho caesar",
            "Suco de limão",
            "Azeite de oliva"
        ],
        instructions: `1. Lave e rasgue as folhas de alface em pedaços médios.

2. Tempere o frango com sal e pimenta, grelhe até cozinhar completamente.

3. Corte o frango em tiras finas.

4. Em uma saladeira, misture a alface, o frango, os croutons.

5. Adicione o molho caesar e misture delicadamente.

6. Finalize com lascas de queijo parmesão e sirva imediatamente.`
    }
];

function renderRecipes(recipesToRender) {
    const grid = document.getElementById('recipesGrid');
    const noResults = document.getElementById('noResults');

    if (recipesToRender.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';

    grid.innerHTML = recipesToRender.map(recipe => `
                <div class="recipe-card" onclick="openModal(${recipe.id})">
                    <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">
                    <div class="recipe-info">
                        <div class="recipe-name">${recipe.name}</div>
                        <div class="recipe-preview">${recipe.ingredients.length} ingredientes</div>
                    </div>
                </div>
            `).join('');
}

function openModal(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    document.getElementById('modalImage').src = recipe.image;
    document.getElementById('modalImage').alt = recipe.name;
    document.getElementById('modalTitle').textContent = recipe.name;

    const ingredientsList = document.getElementById('modalIngredients');
    ingredientsList.innerHTML = recipe.ingredients.map(ing =>
        `<li>${ing}</li>`
    ).join('');

    document.getElementById('modalInstructions').textContent = recipe.instructions;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
    );
    renderRecipes(filtered);
});

renderRecipes(recipes);