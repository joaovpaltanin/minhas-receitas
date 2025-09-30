const recipes = [
    {
        id: 1,
        name: "Pudim de leite lisinho",
        image: "https://www.receitas-sem-fronteiras.com/uploads/media/pudim1-2.jpg?1396283305",
        youtubeLink: "https://www.youtube.com/watch?v=nG_wLMfEtBI",
        ingredients: [
            "2 latas de leite condensado",
            "4 ovos",
            "2½ xícaras de chá de leite",
            "1 xícara de chá de açúcar",
            "⅓ de xícara de chá de água fervente"
        ],
        instructions: `1. Pré-aqueça o forno a 160 °C.

2. Em uma tigela, misture delicadamente os ovos, o leite condensado e o leite, evitando formar bolhas de ar. Reserve e deixe a massa descansar.

3. Em uma panela, derreta o açúcar em fogo baixo até formar um caramelo dourado. Adicione com cuidado a água fervente e mexa até ficar homogêneo.

4. Espalhe o caramelo em uma forma com furo no meio (cerca de 22 cm), cobrindo fundo e laterais. Deixe esfriar por 10 minutos.

5. Passe a massa do pudim por uma peneira e despeje sobre o caramelo.

6. Coloque a forma dentro de uma assadeira maior e adicione água quente até a metade da altura da forma, formando um banho-maria.

7. Leve ao forno e asse por cerca de 1h30, até o pudim firmar nas bordas e estar levemente cremoso no centro.

8. Retire do forno, deixe esfriar e leve à geladeira por pelo menos 3 horas.

9. Para desenformar, aqueça levemente o fundo da forma no fogo, cubra com um prato e vire de uma só vez.

10. Sirva gelado com a calda por cima.`
    },
    {
        id: 2,
        name: "Risoto de Limão Siciliano",
        image: "https://bakeandcakegourmet.com.br/uploads/site/receitas/captura-de-tela-2024-11-11-as-113558-txyfbdog.png",
        youtubeLink: "https://www.youtube.com/watch?v=tyYDJAlXQ3c",
        ingredients: [
            "2 xícaras de arroz arbóreo",
            "1,5 litro de caldo de legumes quente",
            "1 cebola picada",
            "1 talo de alho-poró (ou parte) fatiado",
            "1 talo de salsão picado",
            "½ xícara de vinho branco seco",
            "1 gema de ovo",
            "Raspas de 1 limão siciliano",
            "Suco de 1 limão siciliano",
            "2 colheres de sopa de manteiga",
            "2 colheres de sopa de azeite",
            "1 xícara de queijo parmesão ralado",
            "Sal e pimenta-do-reino a gosto",
            "Salsinha picada para finalizar",
            "Rodelas de limão siciliano grelhadas (opcional)"
        ],
        instructions: `1. Prepare e mantenha o caldo de legumes aquecido durante todo o preparo.

2. Em uma panela grande, aqueça o azeite e 1 colher de manteiga. Adicione o salsão, a cebola e o alho-poró, refogando até que fiquem macios.

3. Acrescente o arroz arbóreo e misture por alguns minutos, envolvendo os grãos.

4. Despeje o vinho branco e mexa até evaporar.

5. Comece a adicionar o caldo quente, uma concha por vez, mexendo sempre, esperando que parte do líquido seja absorvido antes de colocar mais.

6. Quando estiver quase no ponto (al dente), adicione o suco de limão e as raspas, continuando a regar com mais caldo se necessário.

7. Desligue o fogo antes que o arroz fique seco. Acrescente o restante da manteiga, o queijo parmesão e a mistura de gema, limão e queijo (previamente misturada). Misture bem até ficar cremoso.

8. Ajuste o sal e a pimenta. Sirva imediatamente, com salsinha picada e rodelas de limão grelhadas se desejar.`
    },
    {
        id: 3,
        name: "Bolo Fit de Aveia com Cacau e Canela",
        image: "https://imgs.search.brave.com/6R46YHvanZOn-Nmjk8zRnCk7y-ncZNekAvdSOi4vu80/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zYWJv/cmVtbW92aW1lbnRv/LmNvbS5ici93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8wMS9C/b2xvLUZpdC1kZS1C/YW5hbmEtY29tLUF2/ZWlhLXNhdWRhdmVs/LmpwZw",
        youtubeLink: "https://www.youtube.com/shorts/_QOv8xbqzCo?feature=share",
        ingredients: [
            "3 bananas maduras",
            "3 ovos",
            "1/5 de xícara de óleo",
            "2 xícaras de aveia",
            "1 colher de sopa de fermento em pó",
            "1 colher de chá de canela em pó",
            "2 colheres de sopa de cacau em pó 100%",
            "1 colher de chá de essência de baunilha",
            "1/3 de xícara de gotas de chocolate meio amargo"
        ],
        instructions: `1. Pré-aqueça o forno a 180 °C e unte uma forma média com óleo ou forre com papel manteiga.

2. Em um liquidificador ou tigela grande, adicione as bananas, os ovos, o óleo e a essência de baunilha. Bata até obter uma mistura cremosa e homogênea.

3. Acrescente a aveia, a canela e o cacau em pó e misture bem até formar uma massa consistente.

4. Por último, adicione o fermento e as gotas de chocolate e mexa delicadamente apenas para incorporar.

5. Despeje a massa na forma e leve ao forno por cerca de 30 a 35 minutos, ou até que o bolo esteja dourado e firme ao toque. Faça o teste do palito para verificar o ponto.

6. Retire do forno, deixe esfriar e desenforme. Sirva em seguida ou guarde em pote fechado por até 3 dias.`
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
        ${recipe.youtubeLink ? `
            <a class="youtube-icon" href="${recipe.youtubeLink}" target="_blank" onclick="event.stopPropagation()">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
            </a>
        ` : ''}
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

    const youtubeLink = document.getElementById('modalYoutubeLink');
    youtubeLink.href = recipe.youtubeLink;

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