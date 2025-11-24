# Kanban Project - FullStack

Este é um projeto desenvolvido no curso **FullStack JavaScript** da @OneBitCode, no qual foram utilizados React, TypeScript, e RadixUI para construir a interface do usuário. A aplicação é um **Kanban**, permitindo gerenciar tarefas de forma simples e intuitiva.

## Funcionalidades
- **CRUD de Tarefas:** Permite criar, editar, excluir e visualizar tarefas.
- **Interface Responsiva:** Criada com RadixUI e React, proporcionando uma experiência de usuário moderna e eficiente.
- **Integração com API RESTful:** A API foi criada utilizando Flask (Python), conectando com um banco de dados MySQL para armazenar as tarefas.
- **Persistência de Dados:** Utilização de MySQL para armazenar dados de tarefas e suas alterações.

## Tecnologias Usadas
- **Frontend:**
  - React
  - TypeScript
  - RadixUI
- **Backend:**
  - Flask (Python)
  - MySQL (Banco de Dados)


## Melhorias Implementadas
- **Substituição do json-server**: Ao invés de utilizar o json-server, foi criada uma **API RESTful real** em Flask, conectada a um banco de dados MySQL, garantindo persistência e maior controle sobre os dados.
- **Edição de Tarefas**: Agora é possível editar as informações de uma tarefa já criada, algo que não estava presente na versão inicial do projeto.
- **Interação com a API**: A interação entre o frontend e o backend foi aprimorada, com alterações no frontend refletindo corretamente no banco de dados.
- **Interface aprimorada**: A interface foi otimizada para proporcionar uma navegação mais intuitiva e funcional com novos componentes do RadixUI.

## Arquivos de Configuração
- **Frontend**: Foi adicionado um arquivo `.env.local` para armazenar o link da API que será consumida pelo frontend.
- **Backend**: No backend, foi adicionado um arquivo `.env` para armazenar as informações de conexão com o banco de dados MySQL:
 

## Como Rodar o Projeto
### 1. Clonar o repositório

    git clone https://github.com/kmateus13/kanban-project.git


### 2. Rodar o Backend (API)
Navegue até a pasta do backend e crie um arquivo .env com as seguintes variáveis:
env


    SECRET_USER= (Usuário do banco de dados MySQL)
    SECRET_PASSWORD=(Senha do banco de dados MySQL)
    SECRET_ADDRESS=(Endereço do banco de dados)
    SECRET_TABLE=(Nome da tabela onde as tarefas são armazenadas)

**- Instalar as dependências do Python:**

No diretório do backend, execute o seguinte comando para instalar as dependências listadas no arquivo requirements.txt:

    pip install -r requirements.txt

**Rode a API:**

    python webService.py


### 3. Rodar o Frontend
Navegue até a pasta react-kanban e crie um arquivo .env.local para armazenar a URL da API:

    VITE_API_URL= (URL da API que o frontend irá consumir)

**- Instale as dependências:**

    npm install

Para rodar o frontend, execute:

    npm run dev

Sinta-se à vontade para contribuir com melhorias ou sugestões!
