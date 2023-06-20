const updateData = () => {
  console.log('calling');
};

// Função para obter o ID do usuário a partir do token
function getUserIdFromToken(token) {
  const base64Url = token.split(".")[1]; // Obtém a parte do token contendo as informações em formato base64
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Converte caracteres especiais
  const decodedToken = JSON.parse(window.atob(base64)); // Decodifica o token a partir do base64

  return decodedToken.id; // Retorna o ID do usuário do token decodificado
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // Verificar se o usuário está logado
  if (!token) {
    // Redirecionar o usuário para a página de login
    window.location.href = "./login.html";
    return; // Encerrar a função para interromper a execução
  }

  const userId = getUserIdFromToken(token);

  // Selecionar os elementos do formulário
  const form = document.querySelector("form");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const cpfInput = document.getElementById("cpf");
  const dataNascimentoInput = document.getElementById("data-nascimento");


  const sairNavbar = document.getElementById("sair-navbar");

  // Função para fazer logout
  function logout() {
    // Limpar o token de autenticação armazenado no localStorage
    localStorage.removeItem("token");
    // Redirecionar o usuário para a página principal
    window.location.href = "../index.html";
  }

  // Associar o evento de clique ao botão "Sair"
  sairNavbar.addEventListener("click", logout);

  // Preencher os campos do formulário com os dados do usuário
  fetch(`http://127.0.0.1:8080/api/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors", // Habilita o CORS
    method: "GET", // Envia uma requisição GET explícita para lidar com o preflight
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) {
        const user = data.user;
        nomeInput.value = user.fullName;
        emailInput.value = user.email;
        cpfInput.value = user.cpf;
        dataNascimentoInput.value = user.birthdate;
      } else {
        window.location.href = "./login.html";
      }
    })
    .catch((error) => {
      console.error("Erro ao obter os dados do usuário:", error);
    });

  // Atualizar os dados do usuário
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = nomeInput.value;
    const email = emailInput.value;
    const cpf = cpfInput.value;
    const dataNascimento = dataNascimentoInput.value;

    // Montar o objeto com os dados atualizados
    const userData = {
      fullName: nome,
      email: email,
      cpf: cpf,
      birthdate: dataNascimento,
    };

    // Enviar a requisição PATCH para atualizar os dados
    fetch(`http://127.0.0.1:8080/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Verificar a resposta do servidor e agir de acordo
        if (data) {
          alert("Dados atualizados com sucesso!");
        } else {
          alert("Erro ao atualizar os dados do usuário.");
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar os dados do usuário:", error);
      });
  });

  // Excluir a conta do usuário
  const deleteAccount = () => {
    if (confirm('Tem certeza de que deseja excluir sua conta?')) {
      fetch(`http://127.0.0.1:8080/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(data.message);
            window.location.href = '../index.html';
          } else {
            alert('Erro ao excluir a conta do usuário.');
          }
        })
        .catch((error) => {
          console.error('Erro ao excluir a conta do usuário:', error);
        });
    }
  };
  
  // Associar o evento de clique ao botão "Excluir conta"
  const deleteAccountButton = document.getElementById('btnex');
  deleteAccountButton.addEventListener('click', deleteAccount);

});
