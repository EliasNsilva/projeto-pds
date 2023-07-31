# Projeto

Para estudantes e professores, cujo problema que precisa ser resolvido é a dificuldade de encontrar materiais de estudo relevantes e de livre acesso, o projeto é um sistema de recomendação de conteúdo externo baseado em materiais de livre acesso, com a capacidade de gerar um planejamento de estudo personalizado. Diferentemente de outras alternativas disponíveis, o nosso produto se destaca pela abordagem específica de selecionar materiais de estudo de alta qualidade de texto, vídeo e áudio, de acesso gratuito e pela capacidade de oferecer um planejamento de estudo personalizado para cada usuário.

### Problemas

1) Sobrecarga de informações, tornando difícil identificar os recursos mais adequados
2) Dificuldade em encontrar materiais de estudo relevantes e gratuitos.
3) Falta de um planejamento de estudo personalizado para cada usuário.
4) Desmotivação por parte dos estudantes. Quando os alunos não possuem materiais de estudos aptos às suas preferências, eles perdem o interesse no processo de aprendizagem.
5) Estagnação do conhecimento. A falta de atualização frequente dos materiais de estudo pode levar a um conhecimento desatualizado.

### Expectativas

1) Facilidade em encontrar materiais de estudo relevantes na atualidade e de livre acesso.
2) Receber um planejamento de estudo personalizado de acordo com seus objetivos.
3) Ter acesso a uma variedade de conteúdos confiáveis e bem selecionados.


## Personas

### Persona X

*O que ela faz?* Persona X é uma estudante. Ela tem um cronograma apertado devido a estágios, atividades extracurriculares e as próprias aulas.

*O que ela espera?* Ela espera encontrar materiais de estudo específicos para seus cursos e um planejamento de estudo que se ajuste à sua agenda ocupada.

### Persona Y

*O que ela faz?* Persona Y é um professor que deseja criar um material de livre acesso para seus alunos, auxiliando no planejamento das aulas.

*O que ela espera?* Ela espera encontrar recursos de aprendizagem gratuitos de alta qualidade, direcionados para suas necessidades profissionais específicas.

## Marcos
Marco 1 - XX/XX/2023

Funcionalidades:
1. Sistema de Autenticação:
   - Implementar a funcionalidade de login e registro para permitir que os usuários criem contas

2. Perfil do Usuário:
   - Criar um perfil do usuário onde ele possa inserir informações relevantes, como área de estudo, metas de aprendizado e disponibilidade de tempo.

3. Base de Dados Inicial:
   - Montar uma base de dados inicial (avaliar sites que colocaremos na plataforma) com uma seleção de materiais de estudo relevantes e de livre acesso, categorizados de acordo com áreas de conhecimento.



Marco 2 - XX/XX/2023

Funcionalidades:
1. Algoritmo de Recomendação:
   - Desenvolver um algoritmo inicial de recomendação que leve em conta as preferências iniciais do usuário e selecione materiais de estudo relevantes para o perfil informado.

2. Planejamento de Estudo Personalizado:
   - Desenvolver um mecanismo para gerar um planejamento de estudo personalizado com base nas metas do usuário e sua disponibilidade de tempo.
   - Nisso levariamos em conta o nível de experiência do usuário com o assunto para recomendar contéudos que melhor se adequam.

3. Integração de Conteúdo Adicional:
   - Ampliar a base de dados de materiais de estudo (aqui tentaremos adicionar conteúdo externo via alguma integração dinâmica, para poder termos conteúdo sempre atualizado), incluindo novas fontes de conteúdo relevante e confiável para oferecer uma variedade mais abrangente de recursos.

Marco 3 - XX/XX/2023

Funcionalidades:
1. Refinamento do Algoritmo de Recomendação:
   - Melhorar o algoritmo de recomendação com base no nosso resultado do Marco 1.
   - Aperfeiçoar a precisão e relevância das recomendações com base nas interações do usuário com o sistema (provavelmente um feedback simples, aguardar o completo do Marco 3).
   - Para o planejamento de estudos, o sistema passaria a recomendar os conteúdos os separando por "módulos" respeitando o nível do usuário e sua disponibilidade de tempo.

2. Melhorias na Interface do Usuário:
   - Realizar melhorias na interface do usuário para torná-la mais intuitiva e amigável.
   - Implementar recursos de filtragem e busca para facilitar a descoberta de materiais de estudo.

3. Feedback do Usuário:
   - Adicionar uma funcionalidade de feedback para que os usuários possam avaliar e comentar sobre os materiais de estudo recomendados.
   - Utilizar esses dados de feedback para otimizar ainda mais o sistema de recomendação.

Marco 4 - XX/XX/2023

Funcionalidades:
1. Preparação para Produção:
   - Realizar os últimos ajustes e verificações para preparar o produto para o lançamento oficial.

3. Testes Beta:
   - Realizar testes beta com um grupo maior de usuários para validar as melhorias e correções feitas até o momento e validar se nossa preparação de produção está indo bem.

Marco 5 - XX/XX/2023

Funcionalidades:
1. Versão Pronta para Produção:
   - Disponibilizar a versão final do sistema, pronta para uso público.

2. Suporte e Atendimento ao Usuário:
   - Estabelecer uma equipe de suporte para ajudar os usuários com possíveis problemas e dúvidas.

3. Divulgação e Marketing:
   - Iniciar uma campanha de divulgação e marketing para atrair mais usuários e promover o produto.


#### Funcionalidades 

- [x] Planejamento de estudo personalizado.
- [x] Acompanhamento do progresso do estudo.
- [x] Aperfeiçoamento do sistema de recomendação.

[Release Notes](release_notes_3.md)

## Riscos

1. **Risco 1**: Alguns recursos externos recomendados podem não estar mais disponíveis, causando frustração aos usuários. *Severidade Baixa e Probabilidade Alta*.

   Ações para mitigação do risco:

   * Monitorar periodicamente os links recomendados e atualizá-los conforme necessário.

2. **Risco 2**: A personalização do planejamento de estudo pode não atender às expectativas dos usuários. *Severidade Média e Probabilidade Alta*.

   Ações para mitigação do risco:

   * Coletar feedback constante dos usuários e realizar ajustes no algoritmo de personalização
.
3. **Risco 3** - Dificuldades técnicas na implementação do algoritmo de recomendação de conteúdo. Severidade Média e Probabilidade Alta.

Ações para mitigação do risco:

Ação de mitigação 1 - Realizar uma análise detalhada dos requisitos e restrições técnicas antes de iniciar a implementação do algoritmo.

Ação de mitigação 2 - Realizar testes e validações iterativas durante o desenvolvimento do algoritmo para identificar e corrigir problemas o mais cedo possível.

4. **Risco 4** - Risco de baixa adesão dos usuários ao sistema de recomendação. Severidade Média e Probabilidade Alta.

Ações para mitigação do risco:

Ação de mitigação 2.1: Buscar apoio de centros academidos de universidades.
Ação de mitigação 2.2: Oferecer incentivos aos usuários para que convidem outras pessoas a utilizar o sistema.


## Componentes

### Aplicativo Web 
Um aplicativo web responsivo que permite aos usuários pesquisar e receber recomendações de materiais de estudo relevantes.

[Descrição detalhada](https://github.com/edgebr/templates-artefatos)

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
