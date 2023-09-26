# Projeto

Nossa plataforma visa facilitar e resolver a dificuldade de aprendizado para pessoas que tem seu primeiro contato com programação, sendo pessoas que tem dificuldade de acompanhar a teoria separada da prática, e nossa vai visar unificar isso. Facilitando o aprendizado (nossa meta principal) teremos uma nova ferramenta de logs para que alunos com o primeiro contato com programação não deem de cara com a saída do compilador e sim com uma mensagem explicativa do erro/lógica, além disso, por ser algo unificado, teremos suporte para acompanhar o aprendizado através de atividades parciais (durante o assunto) consolidando o conhecimento teório e prático em conjunto. A abordagem do nosso sistema busca melhorar a curva de aprendizado que é muito íngreme e desafiadora, e queremos uma maneira mais amigável de aprender, porém com uma boa base teórica e prática, simplificando o aprendizado e melhorando a curva de aprendizado. Por fim, algo organizacional seria um plano de estudos simples para que os alunos tenham uma sequência de aula/atividades e sejam possibilitados de progredir na plataforma de forma sequencial.

### Problemas

1) Dificuldade de acompanhar teoria separada da prática.
2) Falta de suporte automatizado (erros explicados).

### Expectativas

1) Nossa plataforma vai visar ter o conjunto teoria + prática em um único lugar e que seja de forma sequencial para ter um apoio e uma base firme de aprendizado em um único local.
2) Erros comuns encontrados no começo do aprendizado, que não tem suporte/explicação rápida/fácil ou no mesmo lugar, como por exemplo, erros de saída do compilador complexos que fazem termos que buscar ajuda em outros lugares (como por exemplo, depender de monitores ou sites que no momento seriam desconhecidos).


## Personas

### Persona 1

*O que ela faz?* Persona 1 é um aluno no seu primeiro período. Ele tem um cronograma fechado pois as matérias de primeiro período são fixas e não tem ou tem pouco conhecimento sobre programação.

*O que ela espera?* Ela espera encontrar materiais de estudo centralizados e de fácil entedimento, ajudando também no problema de gerência de nível de estudo por matéria. 

### Persona 2

*O que ela faz?* Persona 2 é um aluno no seu primeiro período. Ele tem um cronograma fechado pois as matérias de primeiro período são fixas, porém já tem um conhecimento relevante sobre programação.

*O que ela espera?* Ela espera encontrar de forma centralizada e simples o que acontecerá durante aquela matéria, para poder suprir algum conhecimento faltante.

## Marcos

# Marco 1 - XX/XX/2023

Base de problemas simples - Problemas básicos para possibilitar a ideia de exercícios na plataforma.

Documentar toda API do Huxley - Todo a API do sistema de execução deve estar documentada para implementação.

Importar códigos de problema do huxley - Os usuários podem inserir um id e receber um problema importado do Huxley. 

# Marco 2 - XX/XX/2023

Liberar a submissão - Os usuários podem enviar suas soluções para os problemas propostos. 

Verificar soluções de submissão - A plataforma verifica a precisão e a eficiência das soluções e fornece feedback instantâneo sobre os resultados.

Logs e erros avaliados por IA - A plataforma em caso de soluções com erro, vai avaliar a lógica e a sintaxe do código, e fornecer uma mensagem gerada por uma IA (consumida da API) explicando o erro.

# Marco 3 - XX/XX/2023

Modelagem do banco de dados (base de problemas) - Para possibilitar a plataforma ter exercícios salvos

Material de estudo: Cadastrar na plataforma material de estudo (em teoria cobrir toda matéria de programação 1, inclusive lógica de programação), oferecer conteúdo educacional, como tutoriais, dicas e exemplos, para auxiliar os usuários em seu aprendizado. Aqui o nosso foco sera estruturar o material e fazer um visual atrativo e agradável.

Dicas parciais: Oferecer dicas graduais durante a resolução de problemas que poderia ajudar os usuários a avançarem, sem fornecer respostas completas imediatamente, incentivando-os a pensar mais criticamente.

Exercícios parciais: Durante o conteúdo de aprendizado, fazer exercícios simples para não ficar só na teoria, comprovando que ele está acompanhando o conteúdo e está entendendo.

# Marco 4 - XX/XX/2023

Sistema de usuários: A plataforma deve diferenciar seus usuários para permitir/negar funcionalidades específicas.

Cadastro de problemas: A plataforma deve permitir usuários (específicos) cadastrarem problemas (exercícios e questões).


## Riscos

1. **Risco 1**: Sistema genérico -> Plataforma pode ficar muito genérico ou similar a outras plataformas existentes.

   Ações para mitigação do risco:

   * Adicionar funcionalidades únicas e atrativas (como o log gerado por IA)
  
2. **Risco 2**: Baixa adoção -> Plataforma não atrativa fazendo com que usuários não busquem acessar.

   Ações para mitigação do risco:

   * Alterar visualização/metodologia de abordagem dos assuntos para novos alunos


## Componentes

### Aplicativo Web 
Um aplicativo web que permite os usuários acessarem a plataforma, o conteúdo e submeter soluções para exercícios/questões.

## Stakeholders

Stakeholder 1 <br />
*Rodrigo Paes - Cargo na Empresa X* <br />
*E-mail* <br />
(xx) xxxxx-xxxx

Stakeholder 2 <br />
*Willy Tiengo - Cargo na Empresa X* <br />
*E-mail* <br />
(xx) xxxxx-xxxx

Stakeholder 3 <br />
*Ranilson Paiva - Cargo na Empresa X* <br />
*E-mail* <br />
(xx) xxxxx-xxxx

## Equipe

José Arthur Lopes <br />
*E-mail* <br />

Elias Nogueira da Silva <br />
*ens@ic.ufal.br* <br />

Pedro Henrique Mesquita <br />
*E-mail* <br />

Túlio Cerqueira Lopes <br />
*E-mail* <br />

## Stakeholders - Poder x Interesse

![image](https://github.com/EliasNsilva/projeto-pds/assets/83170114/abfe530e-72eb-4f3e-9cb2-393dc9738f4a)

Estudantes: São usuários estudantes;

Professores: São usuários professores;

Dono do Produto: É o professor de PDS que exercerá a funcão de dono do produto que será produzido pela equipe;

Programadores: São os membros do grupo;

Líder: É um membro do grupo que exercerá a função de líder da equipe.


## Status Reports
[Status Report 1 (20/12/2022)](status_report_1.md)
