document.addEventListener("DOMContentLoaded", () => {
    const btnContraste = document.getElementById("btn-contraste");
    const btnAumentarFonte = document.getElementById("btn-aumentar-fonte");
    const btnDiminuirFonte = document.getElementById("btn-diminuir-fonte");
    const formContato = document.getElementById("form-contato");
    const statusMensagem = document.getElementById("status-mensagem");

    // 1. Alternar modo de Alto Contraste
    btnContraste.addEventListener("click", () => {
        const ativado = document.body.classList.toggle("alto-contraste");
        // Atualiza o estado ARIA para leitores de tela saberem se o botão está ativo
        btnContraste.setAttribute("aria-pressed", ativado);
    });

    // 2. Controle de Tamanho da Fonte (em pixels na raiz HTML)
    let tamanhoAtual = 16;
    const tamanhoMin = 14;
    const tamanhoMax = 22;

    btnAumentarFonte.addEventListener("click", () => {
        if (tamanhoAtual < tamanhoMax) {
            tamanhoAtual += 2;
            document.documentElement.style.fontSize = `${tamanhoAtual}px`;
        }
    });

    btnDiminuirFonte.addEventListener("click", () => {
        if (tamanhoAtual > tamanhoMin) {
            tamanhoAtual -= 2;
            document.documentElement.style.fontSize = `${tamanhoAtual}px`;
        }
    });

    // 3. Validação Acessível do Formulário
    formContato.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const mensagem = document.getElementById("mensagem");

        // Limpa estados de erro anteriores
        [nome, email, mensagem].forEach((campo) => {
            campo.removeAttribute("aria-invalid");
        });

        if (!nome.value.trim()) {
            definirErro(nome, "Por favor, preencha o seu nome completo.");
            return;
        }

        if (!email.value.trim() || !email.value.includes("@")) {
            definirErro(email, "Por favor, insira um endereço de e-mail válido.");
            return;
        }

        if (!mensagem.value.trim()) {
            definirErro(mensagem, "Por favor, escreva uma mensagem antes de enviar.");
            return;
        }

        // Sucesso: a div com aria-live="polite" lerá essa mensagem em voz alta
        statusMensagem.textContent = "Obrigado! Sua mensagem foi enviada com sucesso.";
        formContato.reset();
    });

    function definirErro(campo, textoErro) {
        campo.setAttribute("aria-invalid", "true");
        statusMensagem.textContent = textoErro;
        campo.focus(); // Move o foco diretamente para o campo com erro
    }
});