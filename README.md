# Quikdev Challenge

Bem vindo à minha versão do desafio Quikdev para desenvolvedores NodeJs Jr.


# Ferramentas

O sistema foi inteiramente desenvolvido utilizando NestJs. Um framework Node que utiliza da lib express em seu background para criação de aplicações Backend utilizando Typescript como linguagem de programação.


Para a validação dos campos de criação de usuário utilizei [class-validator](https://github.com/typestack/class-validator) e [class-transformer](https://github.com/typestack/class-transformer) que o fazem automaticamente utilizando os DTOs fornecidos.


Para elaboração dos testes, utilizei a biblioteca Jest.


Os contêineres para a criação e rodagem da aplicação e a conexão com o banco de dados utiliza a tecnologia Docker e Docker-Compose. Nele estão o banco de dados MongoDB e o Mongo-Express para fazer a administração do banco além da própria aplicação Nest.


Decidi pela utilização do Nest para o desenvolvimento dessa API dado o prazo para entrega e as facilidades que a biblioteca fornece no desenvolvimento direcionado ao fim esperado.

# Como rodar a aplicação
Primeiramente, para rodar essa aplicação é necessário que se faça uma cópia desse repositório em seu computador local. É possível fazer isso através do menu Code no início dessa página.

Após ter feito o download de todas as pastas, é necessário que se rode o banco de dados que está instanciado no Docker através do arquivo docker-compose.yml, sendo assim, é necessário que se entre na pasta principal do projeto e digite:

```bash
docker-compose up --build
```


Após a confirmação da build serviços no Docker é possível acessar o Mongo-Express através do link http://localhost:8081 e o próprio banco MongoDB no link http://localhost:27017 a documentação dinâmica com a tecnologia Swagger pode ser acessada no navegador através do link http://localhost:3000/api/ .


# End Points
A API será disponibilizada no link http://localhost:3000 ou http://127.0.0.1:3000

## Usuário
- GET(/user): busca todos os usuários cadastrados no banco de dados (rota deixada para fim de testes);

- GET(/user/:id): passando um parâmetro com o id do usuário, busca e retorna os dados do usuário com o id fornecido;

- POST(/user): cria um usuário no banco de dados ao receber no corpo da requisição os seguintes dados:
	- name
	- username
	- password
	- birthdate (no formato "xx/xx/xxxx")
	- address
		- state
		- city
		- cep
		- roadName
		- houseNumber
	- primaryPhone (no formato (xx) xxxxx-xxxx)
	- description

- POST(/user/login) faz o login do usuário devolvendo um token JWT para o acesso em rotas privadas da API. Deve-se fornecer os seguintes dados:
	- username
	- password

- PUT(/user) permite fazer a edição de alguns dos dados fornecidos pelo usuário ao banco de dados. **Essa é uma rota privada** é necessário fazer o login em uma conta para acessá-lo e só é possível fazer alterações no próprio perfil do usuário que está logado. Podem ser fornecidos:
	- username (deve ser único da base de dados, retorna um erro caso tente cadastrar dois usuários com o mesmo username);
	- name;
	- birthdate (no formato "xx/xx/xxxx")
	- address
		- state
		- city
		- cep
		- roadName
		- houseNumber
	- primaryPhone (no formato (xx) xxxxx-xxxx)
	- description
	- **Alterar a senha** para alteração de senha é necessário que forneça:
		- oldPassword (senha atual cadastrada)
		- newPassword (nova senha a ser cadastrada)
		- confirmPassword (confirmação da nova senha a ser cadastrada)
		
- DELETE(/user) permite deletar uma conta cadastrada. **Essa é uma rota privada** é necessário fazer o login em uma conta para acessá-lo e só é possível deletar o próprio perfil do usuário que está logado.

## Token
- POST(/token) permite buscar um usuário cadastrado através do envio do token;

- PUT(/token/refresh) faz a atualização de um token de usuário sem que esse tenha que refazer o login, para isso deve ser fornecido no corpo da requisição (em formato em JSON) o último token fornecido pela API (para evitar revalidações de tokens antigos e possivelmente diminuir a segurança).