<p align="center">
    <img src=".github/logo.png" title="Logo do projeto"><br />
    <img src="https://img.shields.io/maintenance/yes/2020?style=for-the-badge" title="Status do projeto">
    <img src="https://img.shields.io/github/workflow/status/ccuffs/api-cc/ci.uffs.cc?label=Build&logo=github&logoColor=white&style=for-the-badge" title="Status do build">
</p>

# API CC

Esse repositório contém a aplicação que serve a API do curso disponível em [api.uffs.cc](https://api.uffs.cc). Ela é uma API REST que disponibiliza diversas funcionalidades e dados que podem ser utilizados por serviços digitais curso, como aplicativos. Para utilizar a API, você precisa de uma chave de acesso (_api key_).

> **IMPORTANTE:** Para conseguir uma chave de acesso, escreva para [computacao.ch@uffs.edu.br](mailto:computacao.ch@uffs.edu.br)

## Utilização da API

A API possui diversos endpoints disponíveis, todos acessíveis através de um prefixo de versão. Por exemplo, para acessar o endpoint `teste` na versão `v1` da API, a URL é:

```
https://api.uffs.cc/v0/teste
```

A versão estável da API está disponível no prefixo `v1`, enquanto a versão experimental (que pode mudar a qualquer momento), está disponível no prefixo `v0`.

Com exceção do enpoint `auth`, todos os endpoints precisam de uma chave de autenticação enviada através do seguinte cabeçalho HTTP:

```
Authorization: Bearer XXX
```

onde `XXX` é o valor da sua chave de acesso, por exemplo `c08cbbfd6eefc83ac6d23c4c791277e4`.
Abaixo está um exemplo de requisição para o endpoint `v0/ping` utilizando a chave de acesso acima:

```bash
curl -H 'Accept: application/json' -H "Authorization: Bearer c08cbbfd6eefc83ac6d23c4c791277e4" https://api.uffs.cc/v0/ping
```

### Endpoints

#### Autenticação `/auth`

Autentica um usuário utilizando o idUFFS (e sua senha).

```bash
curl -H 'Accept: application/json' -H "Authorization: Bearer 122" -d "user=meuiduffsaqui&password=minhasenhaaqui" http://api.uffs.cc/v0/auth
```

#### Histórico `/historico`

Obtém informações do histórico escolar da graduação de um aluno.

```bash
curl -H 'Accept: application/json' -H "Authorization: Bearer 122" -d "passport=..." http://api.uffs.cc/v0/historico
```

## Desenvolvimento

As seções seguintes apresentam instruções para você baixar e rodar a aplicação localmente na sua máquina. Isso é útil se você estiver desenvolvendo algo. Se você deseja apenas utilizar a API, veja a seção anterior.

### 1. Dependências

Para executar o projeto, você precisa ter o seguinte instalado:

- [Git](https://git-scm.com);
- [PHP](https://www.php.net/downloads);
- [Composer](https://getcomposer.org/download/);
- [MySQL](https://www.mysql.com/downloads/);
- [NodeJS](https://nodejs.org/en/);
- [NPM](https://www.npmjs.com/package/npm);

Você precisa de várias extensões PHP instaladas também:

```
sudo apt install php-cli php-mbstring php-zip php-xml php-curl
```

### 2. Configuração

Feito a instalação das dependências, é necessário obter uma cópia do projeto. A forma recomendada é clonar o repositório para a sua máquina.

Para isso, rode:

```
git clone https://github.com/ccuffs/api.uffs.cc && cd api.uffs.cc
```

Isso criará e trocará para a pasta `api.uffs.cc` com o código do projeto.

#### 2.1 PHP

Instale as dependências do PHP usando o comando abaixo:

```
composer install
```

#### 2.2 Banco de Dados

O banco de dados mais simples para uso é o SQLite. Para criar uma base usando esse SGBD, rode:

```
touch database/database.sqlite
```

#### 2.3 Node

Instale também as dependências do NodeJS executando:

```
npm install
```

#### 2.4 Laravel

Crie o arquivo `.env` a partir do arquivo `.env.example` gerado automaticamente pelo Laravel:

```
cp .env.example .env
```

Após isso, no arquivo `.env` altere o valor do campo `DB_CONNECTION` para `sqlite`. Também altere o valor de  `DB_DATABASE` para o caminho do seu arquivo `database.sqlite` criado anteriormente, por exemplo `/mnt/d/www/api.uffs.cc/database/database.sqlite`.

No final, parte do seu arquivo `.env` ficará assim:

```
DB_CONNECTION=sqlite
DB_DATABASE=D:/wamp/www/api-cc/database/database.sqlite
```

Feita as alterações no `.env` execute o seguinte comando para a criação dos esquemas:

```
php artisan migrate
```

Por fim execute o comando abaixo para a geração da chave de autenticação da aplicação:

```
php artisan key:generate
```

#### 2.5 Rodando o projeto

Finalmente, após seguido os passos anteriores, gere os recursos JavaScript e CSS:

```
npm run dev
```

e por fim inicie o servidor do Laravel:

```
php artisan serve
```

Após isso a aplicação estará rodando na porta 8000 e poderá ser acessada em [localhost:8000](http://localhost:8000).

## Contribua

Sua ajuda é muito bem-vinda, independente da forma! Confira o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para conhecer todas as formas de contribuir com o projeto. Por exemplo, [sugerir uma nova funcionalidade](https://github.com/ccuffs/template/issues/new?assignees=&labels=&template=feature_request.md&title=), [reportar um problema/bug](https://github.com/ccuffs/api-cc/issues/new?assignees=&labels=bug&template=bug_report.md&title=), [enviar um pull request](https://github.com/ccuffs/hacktoberfest/blob/master/docs/tutorial-pull-request.md), ou simplemente utilizar o projeto e comentar sua experiência.

Veja o arquivo [ROADMAP.md](ROADMAP.md) para ter uma ideia de como o projeto deve evoluir.


## Licença

Esse projeto é licenciado nos termos da licença open-source [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/) e está disponível de graça.

## Changelog

Veja todas as alterações desse projeto no arquivo [CHANGELOG.md](CHANGELOG.md).

## Projetos semelhates

Abaixo está uma lista de links interessantes e projetos similares:

* [auth-iduffs](https://github.com/ccuffs/auth-iduffs)
* [Brasil.io](https://brasil.io)
* [Dados Abertos da UFFS](https://dados.uffs.edu.br)
