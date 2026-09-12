/**
 * Árvore de conteúdo da documentação ("Como Utilizar").
 *
 * Estrutura pensada pra ser fácil de editar depois, sem mexer em
 * script.js: cada item é um objeto com um "id" único, um "titulo",
 * um "resumo" (uma frase, aparece no lugar do vídeo até você colocar
 * o link de verdade), um "video" (URL de embed do YouTube -- deixe
 * null até ter o vídeo) e um "conteudo" (texto explicativo, em HTML
 * simples -- pode usar <p>, <ul><li>, <strong> etc.).
 *
 * Categorias (nível 1) têm "filhos" (nível 2) em vez de conteúdo
 * próprio -- só agrupam. Itens sem "filhos" são clicáveis e abrem
 * direto o conteúdo.
 *
 * PARA ADICIONAR UM VÍDEO: troque o "video: null" pelo link de embed,
 * por exemplo:
 *   video: "https://www.youtube.com/embed/SEU_ID_DO_VIDEO"
 * (o link de embed é diferente do link normal -- no YouTube, clique
 * em "Compartilhar" -> "Incorporar" para pegar o certo).
 */

const DOCS_TREE = [
  {
    id: "graficos",
    titulo: "Gráficos",
    filhos: [
      {
        id: "graficos-basicos",
        titulo: "Barras, Barras H, Linha, Área e Rosca",
        resumo: "Os cinco jeitos mais comuns de mostrar um dado agrupado.",
        video: null,
        conteudo: `
          <p>Esses cinco tipos compartilham o mesmo comportamento por
          baixo: você escolhe uma coluna para o eixo X (a categoria) e
          uma medida ou coluna com agregação para o eixo Y (o valor).
          A diferença entre eles é só a forma de desenhar o mesmo
          dado.</p>
          <p>Clicar numa barra, fatia ou ponto filtra automaticamente
          os outros gráficos do dashboard pelo valor clicado
          (cross-filter) -- clicar de novo desfaz o filtro.</p>
          <ul>
            <li><strong>Barras</strong> -- boas para comparar
            categorias entre si.</li>
            <li><strong>Barras H</strong> -- mesma ideia, na
            horizontal -- ajuda quando os nomes das categorias são
            longos.</li>
            <li><strong>Linha</strong> -- pensada para mostrar
            evolução ao longo do tempo (datas no eixo X).</li>
            <li><strong>Área</strong> -- como a linha, mas reforça o
            volume acumulado visualmente.</li>
            <li><strong>Rosca</strong> -- boa para mostrar proporção
            de um total entre poucas categorias.</li>
          </ul>
        `,
      },
      {
        id: "graficos-combinado",
        titulo: "Combinado",
        resumo: "Barra e linha juntas, para comparar duas métricas de escalas diferentes.",
        video: null,
        conteudo: `
          <p>Diferente dos gráficos básicos, o Combinado mistura duas
          séries no mesmo espaço -- normalmente uma barra e uma linha
          -- cada uma podendo usar sua própria medida e, se precisar,
          seu próprio eixo Y. Isso é útil quando as duas métricas têm
          escalas bem diferentes (por exemplo, valor total em reais e
          quantidade de pedidos) e colocar as duas na mesma escala
          esconderia uma delas.</p>
        `,
      },
      {
        id: "graficos-mapa",
        titulo: "Mapa",
        resumo: "7 mapas prontos, pintando regiões pela cor conforme o valor.",
        video: null,
        conteudo: `
          <p>O gráfico de mapa é bem diferente dos outros: em vez de
          barras ou linhas, ele pinta regiões geográficas (Brasil,
          estados) com uma cor que varia conforme o valor da medida
          escolhida -- quanto mais escura, maior o valor (ou o
          contrário, dependendo da escala escolhida).</p>
          <p>Existem 7 mapas prontos para usar, cobrindo diferentes
          recortes geográficos.</p>
        `,
      },
    ],
  },
  {
    id: "kpi",
    titulo: "KPI",
    resumo: "Um número grande e direto ao ponto -- sem eixo X.",
    video: null,
    conteudo: `
      <p>O card de KPI mostra um único número em destaque -- um
      total, uma média, uma contagem -- sem quebrar por categoria.
      É o jeito mais direto de destacar "o número que importa" em um
      dashboard.</p>
    `,
  },
  {
    id: "filtros",
    titulo: "Filtros de dados",
    resumo: "5 tipos, cada um com uma particularidade própria.",
    video: null,
    conteudo: `
      <p><em>Conteúdo detalhado desta seção ainda será preenchido --
      cada um dos 5 tipos de filtro vai ganhar sua própria explicação
      e exemplo aqui.</em></p>
    `,
  },
  {
    id: "medidas",
    titulo: "Medidas",
    filhos: [
      {
        id: "medidas-simples",
        titulo: "Simples",
        resumo: "Soma, média, contagem -- direto de uma coluna.",
        video: null,
        conteudo: `
          <p>A forma mais direta de medida: escolher uma coluna e uma
          agregação (soma, média, contagem, contagem distinta, mínimo
          ou máximo) e pronto. A maioria dos gráficos do dia a dia usa
          medidas simples.</p>
        `,
      },
      {
        id: "medidas-formula",
        titulo: "Fórmula",
        resumo: "Combina medidas com operações e condições.",
        video: null,
        conteudo: `
          <p>Uma medida de fórmula combina outras medidas (inclusive
          outras fórmulas) usando operações matemáticas e condicionais
          -- por exemplo, calcular uma margem dividindo lucro por
          receita, ou mostrar um valor só quando outro passa de um
          limite.</p>
          <p><em>Exemplo detalhado a ser adicionado aqui.</em></p>
        `,
      },
      {
        id: "medidas-agregacao-dupla",
        titulo: "Agregação em duas etapas",
        resumo: "Agrupa, calcula por grupo, filtra os grupos, e agrega de novo.",
        video: null,
        conteudo: `
          <p>A mais poderosa dos três tipos. Funciona em duas etapas:
          primeiro agrupa os dados por uma coluna e calcula um
          resultado para cada grupo (por exemplo, quantas compras cada
          cliente fez); depois, entre os grupos que sobraram (opcionalmente
          filtrados, por exemplo só clientes com 2 ou mais compras),
          calcula um resultado final (por exemplo, a média dessas
          contagens).</p>
          <p>Tem atalhos prontos para os casos mais comuns, como
          filtrar linhas antes de agregar ou comparar com outra
          coluna, sem precisar montar cada passo na mão.</p>
          <p><em>Exemplo detalhado a ser adicionado aqui.</em></p>
        `,
      },
    ],
  },
  {
    id: "colunas-calculadas",
    titulo: "Colunas calculadas",
    resumo: "4 tipos do que dá para calcular, com pré-prontos.",
    video: null,
    conteudo: `
      <p><em>Conteúdo detalhado desta seção ainda será preenchido --
      cada um dos 4 tipos de cálculo vai ganhar sua própria explicação
      e exemplo aqui.</em></p>
    `,
  },
  {
    id: "botao-navegacao",
    titulo: "Botão de navegação",
    resumo: "Cria atalhos dentro do dashboard para pular entre telas.",
    video: null,
    conteudo: `
      <p>Um elemento clicável que leva para outro dashboard ou outra
      parte do projeto -- útil para montar um "menu" dentro do próprio
      painel.</p>
    `,
  },
  {
    id: "estilo-global",
    titulo: "Estilo global",
    resumo: "Cores, fontes e tema aplicados ao dashboard inteiro de uma vez.",
    video: null,
    conteudo: `
      <p>Em vez de estilizar elemento por elemento, o estilo global
      deixa você definir uma vez as cores, fontes e outras escolhas
      visuais que se aplicam ao dashboard inteiro.</p>
    `,
  },
  {
    id: "dados-eixo",
    titulo: "Dados do eixo, rótulos e coluna de exibição",
    resumo: "Como trocar o que aparece nos eixos e como é formatado.",
    video: null,
    conteudo: `
      <p>Cobre como ajustar o que é mostrado nos eixos de um gráfico
      (formato de número, de data), e como usar uma coluna de exibição
      diferente da coluna usada para calcular -- por exemplo, agrupar
      por um código internamente mas mostrar o nome por extenso.</p>
    `,
  },
  {
    id: "cadeado",
    titulo: "Cadeado (travar edição)",
    resumo: "Trava o dashboard para não mexer sem querer durante uma apresentação.",
    video: null,
    conteudo: `
      <p>Ativa um modo em que os elementos do dashboard não podem ser
      movidos, redimensionados ou editados sem querer -- os filtros
      continuam funcionando normalmente.</p>
    `,
  },
  {
    id: "compartilhar-exportar",
    titulo: "Compartilhar e exportar",
    resumo: "Manda o dashboard para outra pessoa, ou exporta os dados.",
    video: null,
    conteudo: `
      <p>Cobre as formas de levar o que você montou para fora do
      programa: compartilhar um dashboard (ou o projeto inteiro) com
      outra pessoa, e exportar dados/telas para um arquivo.</p>
    `,
  },
  {
    id: "criar-dashboard",
    titulo: "Criar dashboard",
    resumo: "Como montar um dashboard novo dentro do projeto.",
    video: null,
    conteudo: `
      <p>O passo a passo para adicionar um novo dashboard dentro de um
      projeto já existente.</p>
    `,
  },
  {
    id: "conexoes-vpn",
    titulo: "Conexões e VPN",
    resumo: "Compartilhamento por rede local quando a descoberta automática não funciona.",
    video: null,
    conteudo: `
      <p>Quando duas pessoas estão na mesma rede local, o programa
      encontra e compartilha projetos automaticamente. Quando isso não
      funciona (por exemplo, numa VPN), a lista de conexões deixa
      salvar o endereço de um contato manualmente.</p>
    `,
  },
  {
    id: "beneficiarios",
    titulo: "Beneficiários (equipe)",
    resumo: "Convide outras pessoas para usar a licença da sua conta.",
    video: null,
    conteudo: `
      <p>Planos pagos permitem convidar outras pessoas para usarem o
      programa sob a sua assinatura, até o limite de vagas do seu
      plano.</p>
    `,
  },
];
