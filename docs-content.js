/**
 * Árvore de conteúdo da documentação ("Como Utilizar").
 *
 * Estrutura pensada pra ser fácil de editar depois, sem mexer em
 * script.js: cada item é um objeto com um "id" único, um "titulo",
 * um "resumo" (uma frase, aparece no lugar do vídeo até você colocar
 * o link de verdade), um "video" e um "conteudo" (texto explicativo,
 * em HTML simples -- pode usar <p>, <ul><li>, <strong> etc.).
 *
 * Categorias (nível 1) têm "filhos" (nível 2) em vez de conteúdo
 * próprio -- só agrupam. Itens sem "filhos" são clicáveis e abrem
 * direto o conteúdo.
 *
 * PARA ADICIONAR UM VÍDEO: não mexa aqui -- cole o link do YouTube
 * no arquivo videos/links.js, no nome do tópico correspondente.
 * O link normal do YouTube já serve: a função video() abaixo
 * converte para o link de incorporação (embed).
 */

function video(chave) {
  const link = (typeof VIDEOS !== "undefined" && VIDEOS[chave]) || "";
  if (!link.trim()) return null;
  const m = link.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : link.trim();
}

const DOCS_TREE = [
  {
    id: "primeiros-passos",
    titulo: "Primeiros passos",
    filhos: [
      {
        id: "novo-projeto",
        titulo: "Criar um projeto",
        resumo: "Comece em branco ou a partir de um modelo pronto.",
        video: video("novoProjeto"),
        conteudo: `
          <p>Na tela inicial, escolha <strong>Novo projeto</strong> para
          começar do zero, ou <strong>Começar de um modelo pronto</strong>
          para receber um projeto já montado, com páginas, gráficos e
          medidas. Os <strong>Projetos recentes</strong> ficam listados
          logo abaixo, e você pode abrir a pasta de cada projeto ou
          excluí-lo por ali.</p>
          <p>Cada projeto guarda as suas planilhas, as ligações entre
          elas, as medidas, as colunas calculadas e todas as páginas
          do painel.</p>
        `,
      },
      {
        id: "modelos-prontos",
        titulo: "Modelos prontos",
        resumo: "Projetos completos que só esperam as suas planilhas.",
        video: video("modelosProntos"),
        conteudo: `
          <p>Um modelo pronto já vem com várias páginas montadas,
          medidas, colunas calculadas e uma página de
          <strong>Análises</strong> (quem está acima da média, quanto do
          resultado se concentra nesses grupos e a evolução mês a
          mês).</p>
          <p>Ao abrir o modelo, o programa mostra o aviso
          <strong>Este projeto espera suas planilhas</strong>: carregue
          as planilhas pedidas e os gráficos passam a mostrar os seus
          dados. Se faltar alguma coluna que o modelo usa, aparece o
          aviso <strong>Atenção: colunas em uso não estão na planilha
          nova</strong>, dizendo quais são.</p>
        `,
      },
      {
        id: "importar-planilhas",
        titulo: "Planilhas e colunas de data",
        resumo: "Importe arquivos Excel ou CSV e marque as colunas de data.",
        video: video("importarPlanilhas"),
        conteudo: `
          <p>A tela <strong>Planilhas e Colunas</strong> tem três partes:</p>
          <ul>
            <li><strong>1. Planilhas importadas</strong> -- envie arquivos
            <strong>.xlsx</strong>, <strong>.xls</strong> ou
            <strong>.csv</strong>. Um Excel com várias abas traz todas as
            abas que têm dados. Para tirar uma planilha, clique no X
            dela.</li>
            <li><strong>2. Colunas de data</strong> -- marque quais colunas
            são datas. É isso que libera agrupar por dia, mês, mês e ano,
            trimestre ou ano nos gráficos e usar as datas nas colunas
            calculadas de idade/tempo.</li>
            <li><strong>3. Ligar planilhas</strong> -- conecta as planilhas
            entre si (veja o tópico seguinte).</li>
          </ul>
          <p>Na barra lateral também dá para dizer em que posição o ano
          fica nas datas daquela planilha: <strong>no fim</strong>
          (dia/mês/ano, padrão brasileiro) ou <strong>no início</strong>
          (ano/mês/dia).</p>
        `,
      },
      {
        id: "ligar-planilhas",
        titulo: "Ligar planilhas",
        resumo: "Conecte as planilhas para usar colunas de uma junto com outra.",
        video: video("ligarPlanilhas"),
        conteudo: `
          <p>Quando um gráfico, uma medida ou um filtro usa colunas de
          planilhas diferentes, essas planilhas precisam estar ligadas
          por uma coluna em comum (um código que aparece nas duas).</p>
          <ul>
            <li><strong>Ligar Colunas</strong> -- escolha a coluna de cada
            planilha e clique em <strong>Criar Ligação</strong>. Em
            <strong>Como os dados se comportam em cada lado?</strong> você
            diz se o valor se repete ou não em cada planilha. Cada ligação
            ganha uma cor de bolinha, para diferenciar no desenho.</li>
            <li><strong>Detectar Ligações Automaticamente</strong> -- o
            programa procura colunas cujos valores realmente batem entre
            as planilhas e mostra as sugestões, todas marcadas. Desmarque
            o que não fizer sentido e crie só as que quiser.</li>
            <li><strong>Detalhe da Ligação</strong> -- clicando numa
            ligação, você vê os detalhes e pode excluí-la.</li>
          </ul>
          <p>Com muitas planilhas no mesmo projeto, prefira criar as
          ligações à mão (veja <strong>Especificações e
          limites</strong>).</p>
        `,
      },
    ],
  },
  {
    id: "graficos",
    titulo: "Gráficos",
    filhos: [
      {
        id: "graficos-basicos",
        titulo: "Barras, Barras (H), Linhas, Área e Rosca",
        resumo: "Os cinco jeitos mais comuns de mostrar um dado agrupado.",
        video: video("graficosBasicos"),
        conteudo: `
          <p>Esses cinco tipos compartilham o mesmo comportamento por
          baixo: você escolhe uma coluna para o eixo X (a categoria) e
          uma outra coluna, medida ou coluna calculada para o eixo Y (o
          valor). A diferença entre eles é só a forma de desenhar o
          mesmo dado -- e dá para trocar de um para outro a qualquer
          momento em <strong>Tipo Visual → Mudar Gráfico</strong>.</p>
          <p>Clicar numa barra, fatia ou ponto filtra automaticamente
          os outros gráficos do painel pelo valor clicado
          (cross-filter) -- clicar de novo desfaz o filtro.</p>
          <ul>
            <li><strong>Barras</strong> -- boas para comparar
            categorias entre si.</li>
            <li><strong>Barras (H)</strong> -- mesma ideia, na
            horizontal -- ajuda quando os nomes das categorias são
            longos.</li>
            <li><strong>Linhas</strong> -- pensada para mostrar
            evolução ao longo do tempo (datas no eixo X).</li>
            <li><strong>Área</strong> -- como a linha, mas reforça o
            volume acumulado visualmente.</li>
            <li><strong>Rosca</strong> -- boa para mostrar proporção
            de um total entre poucas categorias.</li>
          </ul>
          <p>Barras, Barras (H) e Rosca novas já nascem sem as
          categorias cujo valor é 0 ou vazio. Linhas e Área mantêm
          essas categorias, para o eixo do tempo não pular meses.</p>
        `,
      },
      {
        id: "graficos-combinado",
        titulo: "Combinado",
        resumo: "Barra e linha juntas, para comparar duas métricas no mesmo gráfico.",
        video: video("graficoCombinado"),
        conteudo: `
          <p>O Combinado mistura duas séries no mesmo espaço -- barras e
          uma linha -- cada uma com a sua própria medida, coluna ou
          coluna calculada. A linha tem a sua própria planilha,
          agregação e formato de número (em <strong>Números da Linha
          (Combinado)</strong>).</p>
          <p>Em <strong>Escala da Linha</strong>:</p>
          <ul>
            <li><strong>Mesmo Eixo</strong> -- barras e linha usam a
            mesma escala.</li>
            <li><strong>Eixos Separados</strong> -- a linha ganha uma
            escala própria. Use quando os valores da linha forem muito
            maiores ou menores que os das barras; no mesmo eixo, a
            métrica menor fica achatada e quase invisível.</li>
          </ul>
        `,
      },
      {
        id: "graficos-mapa",
        titulo: "Mapa de Bolhas",
        resumo: "Bolhas sobre o mapa, maiores onde o valor é maior.",
        video: video("graficoMapa"),
        conteudo: `
          <p>O Mapa de Bolhas coloca uma bolha em cada local da sua
          coluna; o tamanho da bolha acompanha o valor da medida
          escolhida.</p>
          <ul>
            <li><strong>Região (Escopo)</strong> -- <strong>Mundo</strong>
            ou <strong>Brasil</strong>.</li>
            <li><strong>Nível Geográfico</strong> -- no Mundo:
            <strong>Países</strong> ou <strong>Estados</strong>; no
            Brasil: <strong>Estados</strong> ou
            <strong>Cidades</strong>. Para cidades do Brasil e para
            estados de outros países, o programa pede também a coluna do
            estado/país, para não confundir lugares com o mesmo
            nome.</li>
            <li><strong>Buscar Coordenadas Por</strong> -- como os locais
            estão escritos na sua planilha: <strong>Nome por
            extenso</strong>, <strong>Nome em inglês</strong> ou
            <strong>Sigla (UF/ISO)</strong>.</li>
            <li><strong>Tamanho das Bolhas (Escala)</strong> e as cores
            da terra, das divisas e do mar são ajustáveis.</li>
          </ul>
        `,
      },
    ],
  },
  {
    id: "cartao",
    titulo: "Cartão",
    resumo: "Um número grande e direto ao ponto -- sem eixo X.",
    video: video("cartao"),
    conteudo: `
      <p>O <strong>Cartão</strong> mostra um único número em destaque --
      um total, uma média, uma contagem -- sem quebrar por categoria.
      É o jeito mais direto de destacar "o número que importa" no
      painel.</p>
      <p>O valor pode vir de uma coluna (com a agregação escolhida), de
      uma medida ou de uma coluna calculada. Em <strong>Valor do
      Indicador</strong> você ajusta fonte, tamanho, cor e alinhamento
      do número; em <strong>Números e Moedas</strong>, o formato.</p>
      <p>O Cartão também responde aos filtros e aos cliques nos outros
      gráficos.</p>
    `,
  },
  {
    id: "filtros",
    titulo: "Filtro de Dados",
    resumo: "5 estilos de filtro, cada um com uma particularidade própria.",
    video: video("filtros"),
    conteudo: `
      <p>O <strong>Filtro de Dados</strong> recorta o que todos os
      gráficos do painel mostram. Escolha a planilha e a coluna e,
      em <strong>Estilo do Filtro</strong>, um dos cinco estilos:</p>
      <ul>
        <li><strong>Menu Suspenso</strong> -- uma lista que abre ao
        clicar; boa para colunas com muitos valores.</li>
        <li><strong>Blocos / Botões</strong> -- os valores ficam à
        vista, como botões; bom para poucos valores.</li>
        <li><strong>Entre (Valores/Datas)</strong> -- mantém só o que
        está entre um valor (ou data) inicial e um final.</li>
        <li><strong>Menor ou igual a</strong> -- mantém só o que está
        até o valor escolhido.</li>
        <li><strong>Maior ou igual a</strong> -- mantém só o que está a
        partir do valor escolhido.</li>
      </ul>
      <p>Em colunas de data, dá para filtrar por parte da data (dia,
      mês, ano...). O filtro também funciona com colunas calculadas.</p>
      <p>Para decidir se o filtro vale só na página atual ou em todas,
      veja <strong>Filtros e cliques entre páginas</strong>.</p>
    `,
  },
  {
    id: "medidas",
    titulo: "Medidas",
    filhos: [
      {
        id: "medidas-simples",
        titulo: "Simples",
        resumo: "Uma conta numa coluna: somar, contar, média...",
        video: video("medidasSimples"),
        conteudo: `
          <p>A forma mais direta de medida, em três passos:</p>
          <ul>
            <li><strong>1. Coluna</strong> -- a planilha e a coluna (pode
            ser uma coluna calculada, marcada com ƒ).</li>
            <li><strong>2. Cálculo</strong> -- Somar, Contar linhas,
            Contar sem repetir, Média, Menor valor, Maior valor ou Somar
            sem repetir. Para colunas de texto só aparecem os cálculos
            que fazem sentido (contar, menor e maior).</li>
            <li><strong>3. Filtro (opcional)</strong> -- uma regra para
            escolher quais linhas entram na conta (igual, diferente,
            maior, menor...). Ligando <strong>Comparar outra
            coluna</strong>, a regra passa a olhar para outra coluna, até
            de outra planilha (desde que ligada).</li>
          </ul>
          <p>Por exemplo: contar quantos registros estão marcados como
          "Cancelado", ou somar só os valores acima de 500.</p>
          <p>À direita aparece a prévia ao vivo: o resultado como num
          cartão, como num gráfico e o passo a passo da conta.</p>
        `,
      },
      {
        id: "medidas-agrupada",
        titulo: "Agrupada",
        resumo: "Agrupa os dados, calcula por grupo e depois junta num número só.",
        video: video("medidasAgrupada"),
        conteudo: `
          <p>Para perguntas do tipo "por cada um". Funciona em quatro
          passos:</p>
          <ul>
            <li><strong>1. Agrupar por</strong> -- a coluna que forma os
            grupos. Cada valor diferente vira um grupo, por isso ela
            precisa ter valores que se repetem; se a coluna for única
            (um valor por linha), aparece um aviso laranja.</li>
            <li><strong>2. Calcular</strong> -- a conta feita dentro de
            cada grupo (contar, somar, média...). Por padrão usa a mesma
            coluna do Agrupar por; ligue <strong>Calcular sobre outra
            coluna</strong> para somar os valores de outra coluna da
            mesma planilha.</li>
            <li><strong>3. Filtro (opcional)</strong> -- mantém só os
            grupos cujo resultado passa numa regra. A regra é comparada
            com o resultado de cada grupo, não com as linhas.</li>
            <li><strong>4. Resultado final</strong> -- como juntar os
            grupos num número só: média dos grupos, somar, contar os
            grupos, menor ou maior grupo.</li>
          </ul>
          <p>Por exemplo: agrupar por pessoa, contar quantas vezes cada
          uma aparece, manter só quem aparece 2 vezes ou mais e tirar a
          média -- o resultado é quantas vezes, em média, essas pessoas
          aparecem.</p>
          <p>Quando a prévia de uma medida Simples percebe que a conta
          pede grupos, ela oferece o botão <strong>Usar Agrupar
          por</strong>, que converte a medida para Agrupada.</p>
        `,
      },
      {
        id: "medidas-formula",
        titulo: "Fórmula",
        resumo: "Junta contas com + − × ÷, com modelos prontos.",
        video: video("medidasFormula"),
        conteudo: `
          <p>Uma medida de Fórmula monta uma conta com várias partes.
          Cada parte pode ser uma <strong>Coluna</strong> (com o seu
          cálculo), <strong>Outra medida</strong> já criada ou um
          <strong>Número</strong> fixo, e elas são ligadas por + − × ÷.
          Use <strong>Adicionar parte</strong> para aumentar a conta.</p>
          <p>Modelos prontos, que já vêm com a conta montada -- é só
          preencher as colunas:</p>
          <ul>
            <li><strong>Lucro</strong> -- Receita − Custos.</li>
            <li><strong>Ticket Médio</strong> -- Valor total ÷ Quantidade
            (a quantidade já vem com Contar sem repetir).</li>
            <li><strong>Margem %</strong> -- (Receita − Custos) ÷ Receita
            × 100. A receita é preenchida uma vez só e usada nos dois
            lugares.</li>
            <li><strong>Taxa (%)</strong> -- Parte ÷ Total × 100.</li>
          </ul>
          <p>Por exemplo: receita de 200 e custo de 150 dão um lucro de
          50 e uma Margem % de 25.</p>
          <p><strong>Montar do zero</strong> descarta o modelo e deixa a
          conta livre. Em <strong>Mais opções</strong> ficam os recursos
          avançados, como fazer a conta linha a linha entre duas colunas
          (quantidade × preço em cada linha) antes de juntar o
          resultado.</p>
          <p>Antes de salvar, o programa calcula a medida de verdade e
          avisa se algo impede a conta (uma medida ou coluna calculada
          apagada, ou planilhas que não estão ligadas).</p>
        `,
      },
      {
        id: "medidas-comparacao",
        titulo: "Comparação",
        resumo: "Calcula só o que está acima ou abaixo da média, do menor ou do maior.",
        video: video("medidasComparacao"),
        conteudo: `
          <p>A medida de Comparação usa só o que passa numa comparação
          com a média, o menor valor ou o maior valor. Há dois
          modos:</p>
          <p><strong>Cada linha</strong> -- cada registro da planilha é
          comparado.</p>
          <ul>
            <li><strong>1. O que calcular</strong> -- planilha, coluna e
            cálculo.</li>
            <li><strong>2. Comparar</strong> -- considerar só as linhas em
            que uma coluna é maior, menor, igual... que a média, o menor
            ou o maior valor de uma coluna. Em <strong>Calcular a
            referência</strong>: <strong>com todos os dados</strong> (a
            mesma em todas as barras) ou <strong>separada para cada
            barra</strong>.</li>
          </ul>
          <p><strong>Cada grupo</strong> -- junta as linhas de cada grupo
          e compara os totais.</p>
          <ul>
            <li><strong>1. Os grupos</strong> -- o que forma cada grupo e
            como se calcula o valor de cada um.</li>
            <li><strong>2. Comparar os grupos</strong> -- considerar só os
            grupos acima/abaixo da média dos grupos, do menor ou do maior
            grupo; a referência pode ser a mesma para todo o gráfico ou
            separada para cada barra.</li>
            <li><strong>3. Resultado</strong> -- Quantos grupos, % dos
            grupos, Somar os valores desses grupos ou Média dos valores
            desses grupos.</li>
          </ul>
          <p>Por exemplo: quantos grupos estão acima da média, e quanto
          do total se concentra neles.</p>
          <p>A referência é recalculada com os filtros e cliques do
          painel.</p>
        `,
      },
    ],
  },
  {
    id: "colunas-calculadas",
    titulo: "Colunas calculadas",
    filhos: [
      {
        id: "colunas-contas",
        titulo: "Somar, subtrair, multiplicar e dividir",
        resumo: "Uma conta entre duas colunas, feita em cada linha.",
        video: video("colunasContas"),
        conteudo: `
          <p>Uma coluna calculada cria uma coluna nova na planilha, com
          um valor para cada linha. Depois ela pode ser usada em
          qualquer gráfico, filtro, medida ou até em outra coluna
          calculada (aparece nas listas com o símbolo ƒ).</p>
          <p>Os quatro cálculos de conta pegam a <strong>Coluna
          A</strong> e a <strong>Coluna B</strong> da mesma linha:</p>
          <ul>
            <li><strong>Somar</strong> (A + B)</li>
            <li><strong>Subtrair</strong> (A − B)</li>
            <li><strong>Multiplicar</strong> (A × B)</li>
            <li><strong>Dividir</strong> (A ÷ B)</li>
          </ul>
          <p>Modelos prontos: <strong>Lucro</strong> (receita − custos),
          <strong>Soma</strong>, <strong>Valor Total</strong> (valor
          unitário × quantidade) e <strong>Valor por Unidade</strong>
          (valor total ÷ quantidade).</p>
          <p>A prévia mostra as primeiras linhas com A, B e o resultado,
          e avisa quantas linhas ficaram vazias.</p>
        `,
      },
      {
        id: "colunas-juntar-textos",
        titulo: "Juntar textos",
        resumo: "Junta duas colunas de texto numa só, com um separador.",
        video: video("colunasJuntarTextos"),
        conteudo: `
          <p>Junta o texto da Coluna A com o da Coluna B, com o
          <strong>Separador</strong> que você escolher entre os dois (um
          espaço, um traço...). Por exemplo: juntar nome e sobrenome numa
          coluna só.</p>
          <p>Modelo pronto: <strong>Texto Combinado</strong>. O resultado
          é texto, então nas medidas ele só pode ser contado.</p>
        `,
      },
      {
        id: "colunas-idade",
        titulo: "Idade / tempo até uma data",
        resumo: "Quanto tempo passou entre uma data da planilha e outra data.",
        video: video("colunasIdade"),
        conteudo: `
          <p>Calcula o tempo entre a data de cada linha (nascimento,
          início...) e a data de <strong>Medir até a data</strong> (a de
          hoje ou outra que você escolher).</p>
          <p>Em <strong>Mostrar como</strong>:</p>
          <ul>
            <li><strong>Anos completos</strong> -- só a parte inteira.</li>
            <li><strong>Anos e meses</strong> -- vira texto, como "34 anos
            e 5 meses".</li>
            <li><strong>Anos com decimais</strong> -- 34,4 anos.</li>
          </ul>
          <p>Modelo pronto: <strong>Idade</strong>. A coluna de data
          precisa estar marcada como data em <strong>Planilhas e
          Colunas</strong>.</p>
        `,
      },
      {
        id: "colunas-comparar",
        titulo: "Comparar com a média / menor / maior",
        resumo: "Marca cada linha (ou grupo) com um texto: acima ou abaixo da referência.",
        video: video("colunasComparar"),
        conteudo: `
          <p>Compara cada valor com a média, o menor ou o maior valor e
          grava um texto -- por exemplo "Acima da média" e "Abaixo da
          média". Esses textos podem ser usados como eixo, filtro ou
          legenda.</p>
          <ul>
            <li><strong>Cada linha</strong> -- cada linha é comparada com
            a referência da coluna escolhida.</li>
            <li><strong>Cada grupo</strong> -- as linhas são juntadas por
            grupo (somar, média, contar linhas, menor ou maior valor) e o
            valor do grupo é comparado com a média dos grupos, o menor ou
            o maior grupo. Todas as linhas do grupo recebem o mesmo
            texto.</li>
          </ul>
          <p>Em <strong>Mostrar como</strong>, os textos de
          <strong>Quando sim</strong> e <strong>Quando não</strong> já vêm
          preenchidos; mude se quiser. A referência é calculada com
          todos os dados da planilha. Modelo pronto: <strong>Acima da
          média</strong>.</p>
        `,
      },
    ],
  },
  {
    id: "configurar-grafico",
    titulo: "Configurar o gráfico",
    filhos: [
      {
        id: "dados-eixo",
        titulo: "Dados do eixo e coluna de exibição",
        resumo: "O que entra nos eixos, agrupamento de datas e a coluna mostrada.",
        video: video("dadosEixo"),
        conteudo: `
          <p>Em <strong>Dados dos Eixos</strong> você escolhe a planilha
          e a coluna da categoria (eixo X) e o valor (eixo Y): uma
          coluna com agregação, uma medida (<strong>Usar uma
          Medida</strong>) ou uma coluna calculada (<strong>Usar uma
          Coluna Calculada</strong>).</p>
          <p>Se a coluna do eixo X for uma data, em <strong>Agrupar
          por</strong> dá para juntar por Dia, Mês, Mês e Ano, Trimestre
          ou Ano.</p>
          <p>A <strong>Coluna de Exibição (opcional)</strong> mostra no
          gráfico uma coluna diferente da usada para calcular -- por
          exemplo, agrupar por um código mas mostrar o nome por
          extenso.</p>
          <p>Em <strong>Eixos (X e Y)</strong> você troca os nomes dos
          eixos e ajusta fonte, cor e alinhamento.</p>
        `,
      },
      {
        id: "ordenacao-limite",
        titulo: "Ordenação e limite",
        resumo: "A ordem das categorias e quantas aparecem.",
        video: video("ordenacaoLimite"),
        conteudo: `
          <p>Em <strong>Ordenação e Limite</strong>:</p>
          <ul>
            <li><strong>Ordenar Por</strong> -- Maior valor primeiro,
            Menor valor primeiro, Categoria (A → Z) ou Categoria (Z →
            A).</li>
            <li><strong>Limite Top N</strong> -- quantas categorias
            aparecem (0 = todas). Não há teto: dá para montar um Top 20,
            Top 50...</li>
            <li><strong>Ocultar categorias com valor zero ou vazio</strong> -- tira do
            gráfico as categorias cujo valor é 0 ou vazio. O Top N conta
            só as que sobram.</li>
          </ul>
        `,
      },
      {
        id: "numeros-moedas",
        titulo: "Números, moedas e porcentagem",
        resumo: "Como o número aparece: moeda, decimal, inteiro ou porcentagem.",
        video: video("numerosMoedas"),
        conteudo: `
          <p>Em <strong>Números e Moedas</strong> você escolhe o
          <strong>Formato</strong> (Geral, Moeda, Número Decimal, Número
          Inteiro ou Porcentagem), a <strong>Moeda</strong> (Real, Dólar,
          Euro, Libra, Iene, Peso Argentino), a <strong>Pontuação
          Decimal</strong> (1.234,56 ou 1,234.56) e as casas decimais.</p>
          <p>Em <strong>Cálculo → Exibir Como</strong> (nos gráficos), o
          valor pode aparecer como <strong>Valor Normal</strong>,
          <strong>% do Total</strong> (quanto cada categoria representa do
          todo) ou <strong>Acumulado</strong> (somando uma categoria à
          anterior).</p>
          <p>Há dois formatos de porcentagem. Olhe o número com o formato
          Geral:</p>
          <ul>
            <li>Se aparece <strong>25</strong> (o número já é a
            porcentagem) → <strong>Porcentagem</strong>: só coloca o %,
            25 vira 25%. É o caso das medidas que já multiplicam por 100,
            como Taxa (%).</li>
            <li>Se aparece <strong>0,25</strong> (uma fração) →
            <strong>Porcentagem de fração</strong>: multiplica por 100, 0,25
            vira 25%.</li>
          </ul>
          <p>Se aparecer um número estranho, como 0,3% ou 2.500%, o
          formato provavelmente está trocado: experimente o outro.</p>
        `,
      },
      {
        id: "rotulos-cores",
        titulo: "Rótulos, cores, título e cabeçalho",
        resumo: "O visual de cada gráfico, um por um.",
        video: video("rotulosCores"),
        conteudo: `
          <ul>
            <li><strong>Rótulos de Dados</strong> -- liga
            <strong>Exibir Rótulos nos Dados</strong> para mostrar o valor
            em cima de cada barra, fatia ou ponto, com fonte e cor
            próprias.</li>
            <li><strong>Cores do Gráfico</strong> -- automática, cor única
            ou degradê, com opacidade. No Mapa de Bolhas há também os temas de
            cores prontos.</li>
            <li><strong>Título</strong> e <strong>Cabeçalho</strong> --
            texto, fonte, tamanho, cor, alinhamento e fundo do
            cabeçalho.</li>
            <li><strong>Fundo e Borda</strong> -- cor e opacidade do fundo
            do cartão, cor, espessura e opacidade da borda.</li>
          </ul>
        `,
      },
    ],
  },
  {
    id: "paginas-navegacao",
    titulo: "Páginas e navegação",
    filhos: [
      {
        id: "criar-dashboard",
        titulo: "Criar dashboard (página)",
        resumo: "Adicione uma página nova ao projeto, em branco ou de um arquivo .graf.",
        video: video("criarDashboard"),
        conteudo: `
          <p>Cada projeto pode ter várias páginas (dashboards), que
          aparecem como abas no topo. Clique no botão de nova página e
          escolha:</p>
          <ul>
            <li><strong>Em Branco</strong> -- uma página vazia, com o nome
            que você der.</li>
            <li><strong>Importar .graf</strong> -- traz as páginas de um
            arquivo .graf exportado.</li>
          </ul>
          <p>Cada aba pode ser renomeada ou excluída.</p>
        `,
      },
      {
        id: "botao-navegacao",
        titulo: "Botão de navegação",
        resumo: "Atalhos dentro do painel para pular entre páginas.",
        video: video("botaoNavegacao"),
        conteudo: `
          <p>Um elemento clicável que leva para outra página do projeto
          -- útil para montar um "menu" dentro do próprio painel.
          Escolha a página em <strong>Dashboard de Destino</strong>.</p>
          <p>Se a página de destino for excluída, o botão avisa ao ser
          clicado: edite-o e escolha outra página.</p>
        `,
      },
      {
        id: "filtros-entre-paginas",
        titulo: "Filtros e cliques entre páginas",
        resumo: "Decida se um filtro vale para todas as páginas ou só para a atual.",
        video: video("filtrosEntrePaginas"),
        conteudo: `
          <p>A chave <strong>Filtros e cliques valem para todas as
          páginas</strong> fica na barra lateral:</p>
          <ul>
            <li><strong>Ligada (padrão)</strong> -- um Filtro de Dados ou
            um clique num gráfico vale para o painel inteiro: ao trocar
            de página, os gráficos das outras páginas também aparecem
            filtrados.</li>
            <li><strong>Desligada</strong> -- cada página fica com os seus
            próprios filtros e cliques. Ao voltar para uma página, os
            filtros dela continuam lá.</li>
          </ul>
          <p>Com a chave ligada, uma página pode aparecer filtrada sem
          ter nenhum filtro visível nela -- o filtro foi feito em outra
          página. Para limpar, volte à página do filtro ou use
          <strong>Limpar</strong>.</p>
        `,
      },
    ],
  },
  {
    id: "aparencia",
    titulo: "Aparência",
    filhos: [
      {
        id: "estilo-global",
        titulo: "Estilo global",
        resumo: "Fontes, cores e bordas aplicadas a todos os elementos de uma vez.",
        video: video("estiloGlobal"),
        conteudo: `
          <p>Em vez de estilizar elemento por elemento, o
          <strong>Estilo Global</strong> define de uma vez: fonte dos
          títulos e dos valores, cor e tamanho dos títulos, fundo dos
          cartões, cor das bordas, opacidade do fundo e das bordas e
          espessura das bordas.</p>
          <p>Mude só os campos que quiser e clique em <strong>Aplicar a
          Todos</strong>: o estilo vai para todos os elementos e passa a
          ser o padrão dos elementos novos.</p>
        `,
      },
      {
        id: "plano-fundo",
        titulo: "Plano de fundo",
        resumo: "Uma imagem atrás de todo o painel.",
        video: video("planoFundo"),
        conteudo: `
          <p>Em <strong>Plano de Fundo</strong>, use <strong>Enviar
          Imagem</strong> para colocar uma imagem atrás da página, e
          <strong>Remover</strong> para tirá-la. Combine com a opacidade
          do fundo dos cartões (no Estilo Global) para a imagem
          aparecer por trás dos gráficos.</p>
        `,
      },
      {
        id: "tamanho-salvo",
        titulo: "Tamanhos salvos",
        resumo: "Guarde o tamanho de um elemento e aplique em outros.",
        video: video("tamanhoSalvo"),
        conteudo: `
          <p>Na seção <strong>Tamanho</strong> de qualquer elemento
          (gráfico, cartão, filtro, botão), dá para salvar o tamanho
          atual com um nome e, depois, usar <strong>Aplicar tamanho
          salvo</strong> em outros elementos -- ótimo para deixar todos
          os cartões do mesmo tamanho.</p>
        `,
      },
    ],
  },
  {
    id: "cadeado",
    titulo: "Cadeado (travar posição)",
    resumo: "Cada elemento fica travado; destrave para mover ou redimensionar.",
    video: video("cadeado"),
    conteudo: `
      <p>Todo elemento tem um cadeado no canto. Fechado, o elemento não
      sai do lugar nem muda de tamanho sem querer. Clique em
      <strong>Destravar para mover/redimensionar</strong>, arraste ou
      redimensione, e clique de novo em <strong>Travar
      posição/tamanho</strong>.</p>
      <p>Os filtros e cliques continuam funcionando normalmente com o
      cadeado fechado.</p>
    `,
  },
  {
    id: "modo-apresentacao",
    titulo: "Modo Apresentação",
    resumo: "O painel em tela limpa, só para ver e filtrar.",
    video: video("modoApresentacao"),
    conteudo: `
      <p>O botão <strong>Modo Apresentação</strong> esconde a barra
      lateral e os botões de edição, deixando só o painel. Filtros,
      cliques e botões de navegação continuam funcionando. Para editar
      de novo, use <strong>Voltar ao Modo Edição</strong>.</p>
    `,
  },
  {
    id: "compartilhar-exportar",
    titulo: "Compartilhar e exportar",
    resumo: "Mande uma página ou o projeto inteiro para outra pessoa.",
    video: video("compartilharExportar"),
    conteudo: `
      <ul>
        <li><strong>Exportar</strong> -- salva o projeto num arquivo
        <strong>.graf</strong>, que pode ser enviado por qualquer meio e
        importado em outro computador (em <strong>Importar .graf</strong>,
        ao criar uma página).</li>
        <li><strong>Compartilhar na rede local</strong> -- com as duas
        pessoas na mesma rede: <strong>Enviar Dashboard</strong> manda a
        página atual, <strong>Projeto Inteiro</strong> manda tudo, e
        <strong>Receber Dashboard</strong> fica esperando o envio de
        outra pessoa. Use <strong>Iniciar Compartilhamento</strong> e
        <strong>Parar Compartilhamento</strong>.</li>
        <li><strong>Receber projeto pela rede</strong> -- na tela
        inicial, recebe um projeto inteiro enviado por outra pessoa da
        rede.</li>
      </ul>
    `,
  },
  {
    id: "conexoes-vpn",
    titulo: "Conexões e VPN",
    resumo: "Compartilhamento por rede quando a descoberta automática não funciona.",
    video: video("conexoesVpn"),
    conteudo: `
      <p>Quando duas pessoas estão na mesma rede local, o programa
      encontra e compartilha projetos automaticamente. Quando isso não
      funciona (por exemplo, numa VPN), use <strong>Conexões (para
      VPN)</strong>, na tela inicial, para salvar o endereço de um
      contato manualmente.</p>
    `,
  },
  {
    id: "beneficiarios",
    titulo: "Beneficiários (equipe)",
    resumo: "Convide outras pessoas para usar a licença da sua conta.",
    video: video("beneficiarios"),
    conteudo: `
      <p>Planos pagos permitem convidar outras pessoas para usarem o
      programa sob a sua assinatura, até o limite de vagas do seu
      plano. Use <strong>Convidar membros</strong>, na tela
      inicial.</p>
    `,
  },
  {
    id: "especificacoes",
    titulo: "Especificações e limites",
    resumo: "Até onde o VisyQ vai bem: linhas, planilhas, arquivos e memória.",
    video: null,
    conteudo: `
      <ul>
        <li><strong>Linhas</strong> -- até 500 mil linhas por planilha é
        o recomendado; até 1 milhão funciona, só demorando um pouco
        mais.</li>
        <li><strong>Planilhas por projeto</strong> -- até 50 é o
        recomendado; até 100 funciona, mas aí é melhor criar as ligações
        à mão em vez de usar o botão <strong>Detectar Ligações
        Automaticamente</strong>.</li>
        <li><strong>Tamanho de arquivo</strong> -- até 200 MB cada. Para
        bases grandes, CSV importa bem mais rápido que Excel.</li>
        <li><strong>Formatos aceitos</strong> -- .xlsx, .xls e
        .csv.</li>
        <li><strong>Memória do computador</strong> -- 8 GB no mínimo,
        16 GB para bases acima de 1 milhão de linhas.</li>
        <li><strong>Sistema</strong> -- Windows 10 ou 11. No Linux, via
        Wine, sem garantia.</li>
        <li><strong>Imagens</strong> -- até 15 MB cada.</li>
      </ul>
      <p>Os dados ficam no seu computador: nada é enviado para
      servidor nenhum.</p>
    `,
  },
];
