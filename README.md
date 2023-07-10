# Projeto

Para a UFAL, cuja falta de visibilidade e conhecimento dos projetos de extensão, propomos um projeto de plataforma que centraliza e divulga os projetos e ações da universidade. Essa plataforma será um complemento à aba de extensão do site da UFAL, porém de forma diferente, pois estaremos oferecendo um meio mais eficiente de acesso e divulgação dos projetos.

### Problemas

1) Pouca divulgação: Os projetos de extensão da UFAL têm baixa visibilidade, o que dificulta o conhecimento por parte da comunidade acadêmica e externa.
2) Desconhecimento sobre projetos de outros blocos: Alunos e professores de determinado bloco não têm conhecimento dos projetos de extensão em outros blocos, o que limita a colaboração e participação conjunta em iniciativas.
3) Dificuldade de ingresso: Há uma falta de conhecimento sobre como ingressar nos projetos de extensão, o que pode desencorajar alunos interessados em participar.

### Expectativas

1) Facilitar o acesso: A plataforma proporcionará um meio fácil e intuitivo para acessar os projetos de extensão da UFAL, permitindo que alunos e professores encontrem informações relevantes.
2) Centralizar informações: Todos os projetos serão centralizados em uma única plataforma, facilitando a busca, a comunicação e a colaboração entre diferentes projetos e áreas de conhecimento.
3) Aumentar a divulgação: A plataforma permitirá a ampla divulgação dos projetos de extensão da UFAL, alcançando um público maior e promovendo a participação da comunidade acadêmica e externa.

## Personas

1) Professores:
   - Professores que tem projetos ou os gerenciam, para poder inserir/remover ou atualizar situação de um projeto de extensão.
- Possibilidade de cadastrar projetos de extensão.
- Atualizar projetos com ações e divulgá-los para a comunidade.
- Conectar-se com alunos interessados em participar.
2) Alunos membros:
  - Alunos que já participam de um projeto de extensão, estão engajados, e poderão atualizar a página do projeto juntamente aos professores.
- Ao serem selecionados por um professor responsável, poderão ajudar na atualização da página do projeto.
- Usar a plataforma para conhecer outros projetos e se envolver em iniciativas diversas.
3) Alunos:
  - Alunos que desejam ingressar em algum projeto de extensão e não tem fontes de informações adequadas para esse ingresso.
- Usar a plataforma para obter informações sobre projetos de extensão e se conectar com eles para participação.

## Marcos

Devemos entregar **pequenas versões frequentes**. A equipe deve definir os marcos do projeto (*milestones)*, definindo os prazos de entrega e quais funcionalidades serão implementados até o final de cada marco. No final de cada marco devemos distribuir uma nova versão do produto, pronta para produção.

Podemos pensar nessas pequenas versões como MVPs (do inglês, *minimum viable product*). MVP é a versão mais simples de um produto que pode ser disponibilizada para a validação de um pequeno conjunto de hipóteses sobre o negócio. Após ser **construído,** o MVP é colocado à prova. Com isso, teremos dados que possibilitam **medir** o seu uso e, portanto, gerar o **aprendizado** desejado (Caroli, 2018).

### Marco 1 - DD/MM/2023

Montar um CRUD capaz de cadastrar um projeto na plataforma
#### Funcionalidades

- [Criar um projeto] Funcionalidade 1.
- [Consultar um projeto] Funcionalidade 2
- [Remover um projeto] Funcionalidade 3.
- [Atualizar dados de um projeto] Funcionalidade 4.

[Release Notes ](release_notes_1.md)

### Marco 2 - DD/01/2023

Criação do sistema de Login

#### Funcionalidades 

- [Criar usuário] Funcionalidade 1.
- [Recuperar senha] Funcionalidade 2.
- [Login] Funcionalidade 3.

### Marco 3 - DD/01/2023

Cadastro de usuários relacianados a projetos

#### Funcionalidades 

- [Vincular usuário] Funcionalidade 1.
- [Consultar usuário] Funcionalidade 2.
- [Remover do projeto] Funcionalidade 3.

### Marco 4 - DD/01/2023

Criação do Feed (HomePage) onde os projetos são divulgados.

#### Funcionalidades 

- [Atualização do feed] Funcionalidade 1.
- [Rolagem] Funcionalidade 2.

[Release Notes ](release_notes_1.md)

## Riscos

1. **Não conseguir cumprir o prazo** Não conseguir desenvolver as funcionalidades. *Severidade alta e Probabilidade baixa*
   Ações para mitigação do risco:
	- Organização
	- Reuniões frequentes

2. **Baixo uso dos usuários** Sistema não ser utilizado. *Severidade Média e Probabilidade Alta*.
   Ações para mitigação do risco:
	- Entrar em contato com professores e secretarias dos cursos
	- Apoio da UFAL

3. **Falta de hospedagem para a plataforma** Não conseguir hospedagem para a plataforma. *Severidade baixa e probabalidade baixa*
   Ações para mitigação do risco:
	- Procurar alternativas de hospedagem

4. **Dificuldade para desenvolver** Não possuir conhecimento técnico. *Severidade média e probabilidade média*
   Ações para mitigação do risco:
	- Manter contato entre os membros


## Componentes

### Aplicativo Web 
Aplicativo Web: Uma plataforma similar a uma rede social para divulgação dos projetos de extensão da UFAL. Os usuários poderão criar uma conta, cadastrar projetos, atualizar informações e interagir com outros membros da comunidade acadêmica.
[[LINK](https://github.com/EliasNsilva/projeto-pds)]

## Stakeholders

Stakeholder 1 <br />
*Key User - Cargo na Empresa X* <br />
*E-mail* <br />
(xx) xxxxx-xxxx

Stakeholder 2 <br />
*Key User - Cargo na Empresa X* <br />
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

## Status Reports

[Status Report 1 (20/12/2022)](status_report_1.md)
