const recipes = [
    {
        id: 1,
        name: "Pudim de leite lisinho",
        category: "Sobremesa",
        image: "https://receitadesabor.com.br/wp-content/uploads/2025/12/Receita-de-Pudim-Lisinho-Que-Derrete-na-Boca.webp",
        mediaLink: "https://www.youtube.com/watch?v=nG_wLMfEtBI",
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
        category: "Prato Principal",
        image: "https://bakeandcakegourmet.com.br/uploads/site/receitas/captura-de-tela-2024-11-11-as-113558-txyfbdog.png",
        mediaLink: "https://www.youtube.com/watch?v=tyYDJAlXQ3c",
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
        category: "Saudável",
        image: "https://imgs.search.brave.com/6R46YHvanZOn-Nmjk8zRnCk7y-ncZNekAvdSOi4vu80/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zYWJv/cmVtbW92aW1lbnRv/LmNvbS5ici93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8wMS9C/b2xvLUZpdC1kZS1C/YW5hbmEtY29tLUF2/ZWlhLXNhdWRhdmVs/LmpwZw",
        mediaLink: "https://www.youtube.com/shorts/_QOv8xbqzCo?feature=share",
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
    },
    {
        id: 4,
        name: "Fricassê de Frango",
        category: "Prato Principal",
        image: "https://www.kisabor.com.br/img/receitas/fricasse-1628262666.webp",
        mediaLink: "https://www.youtube.com/shorts/Y92iygk7x00",
        ingredients: [
            "500g de peito de frango cozido e desfiado",
            "1 lata de creme de leite",
            "200g de milho verde",
            "200g de ervilha",
            "1 cebola picada",
            "2 dentes de alho picados",
            "2 colheres de sopa de azeite",
            "Sal e pimenta-do-reino a gosto",
            "Cheiro-verde a gosto",
            "100g de batata palha para cobertura",
            "100g de queijo parmesão ralado"
        ],
        instructions: `1. Em uma panela grande, aqueça o azeite e refogue a cebola e o alho até ficarem dourados.

2. Adicione o frango desfiado e refogue por alguns minutos, temperando com sal e pimenta-do-reino.

3. Acrescente o milho e a ervilha, misturando bem todos os ingredientes.

4. Adicione o creme de leite e misture até ficar cremoso e homogêneo. Cozinhe por mais 5 minutos em fogo baixo.

5. Ajuste o sal e finalize com cheiro-verde picado.

6. Transfira o fricassê para um refratário.

7. Cubra com a batata palha e polvilhe o queijo parmesão ralado por cima.

8. Leve ao forno pré-aquecido a 180°C por cerca de 15 minutos, ou até que a batata palha fique levemente dourada e o queijo gratinado.

9. Sirva quente acompanhado de arroz branco.`
    },
    {
        id: 5,
        name: "Pão de Tapioca",
        category: "Lanche",
        image: "https://www.guacira.com.br/images/receitas/0170672001623938582.webp",
        mediaLink: "https://www.youtube.com/shorts/-D2KRmvT1R0",
        ingredients: [
            "1 xícara de tapioca",
            "1 xícara de leite",
            "1 colher de sopa de fermento em pó",
            "2 colheres de sopa de manteiga derretida",
            "1 colher de chá de sal",
            "½ xícara de queijo ralado (opcional)",
            "1 colher de chá de açúcar"
        ],
        instructions: `1. Pré-aqueça o forno a 200°C.

2. Em uma tigela, misture a tapioca com o leite e deixe descansar por 5 minutos.

3. Adicione a manteiga derretida, o sal e o açúcar à mistura.

4. Incorpore o fermento em pó e o queijo ralado (se estiver usando) e misture bem.

5. Despeje a massa em uma forma redonda ou quadrada untada com manteiga.

6. Leve ao forno por aproximadamente 25 a 30 minutos, até ficar dourada e firme.

7. Retire do forno e deixe esfriar um pouco antes de desenformar.

8. Sirva ainda morno.`
    },
    {
        id: 6,
        name: "Maçã Folhada",
        category: "Sobremesa",
        image: "https://guiadacozinha.com.br/wp-content/uploads/2019/10/tortinha-folhada-ma%C3%A7%C3%A3.jpg",
        mediaLink: "https://www.facebook.com/share/r/1GRMD5kqB3/",
        ingredients: [
            "1 maçã vermelha grande",
            "400 gr de massa folhada ou massa de pastel",
            "Canela a gosto",
            "Açúcar de confeiteiro a gosto"
        ],
        instructions: `1. Se estiver usando massa de pastel, una a massa com manteiga antes de colocar a maçã.

2. Prepare a massa folhada ou de pastel sobre uma superfície de trabalho.

3. Descasque a maçã e corte em espiral ou em fatias finas, mantendo uma forma circular ou em espiral.

4. Coloque a maçã sobre a massa folhada.

5. Polvilhe generosamente canela e açúcar de confeiteiro sobre a maçã.

6. Asse em forno pré-aquecido a 200°C por cerca de 20 minutos, se estiver usando massa folhada. Se for massa de pastel, asse por 15 minutos, até ficar dourada.

7. Retire do forno quando estiver crocante e dourada.

8. Sirva morno ou em temperatura ambiente.`
    }
];
