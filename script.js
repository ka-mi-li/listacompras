document.addEventListener('DOMContentLoaded', () => {
    const inputProduto = document.getElementById('produto');
    const inputImagem = document.getElementById('imagem');
    const botaoAdicionar = document.getElementById('adicionar');
    const listaProdutos = document.getElementById('lista-produtos');

    function carregarProdutos() {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.forEach(produto => {
            adicionarProdutoNaLista(produto);
        });
    }

    function adicionarProdutoNaLista(produto) {
        const li = document.createElement('li');
        
        // Adiciona a imagem
        const img = document.createElement('img');
        img.src = produto.imagem;
        img.alt = `Imagem de ${produto.nome}`;
        img.style.width = '50px';
        img.style.marginRight = '10px';
        
        // Adiciona o nome do produto
        const nome = document.createElement('span');
        nome.textContent = produto.nome;

        // Botão de remover
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.style.marginLeft = '10px';
        botaoRemover.addEventListener('click', () => removerProduto(produto, li));

        li.appendChild(img);
        li.appendChild(nome);
        li.appendChild(botaoRemover);
        listaProdutos.appendChild(li);
    }

    function adicionarProduto() {
        const nomeProduto = inputProduto.value.trim();
        const linkImagem = inputImagem.value.trim();
        
        if (nomeProduto && linkImagem) {
            const produto = { nome: nomeProduto, imagem: linkImagem };
            const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            produtos.push(produto);
            localStorage.setItem('produtos', JSON.stringify(produtos));
            
            adicionarProdutoNaLista(produto);
            inputProduto.value = '';
            inputImagem.value = '';
        } else {
            alert("Por favor, insira o nome do produto e o link da imagem.");
        }
    }

    function removerProduto(produto, itemElement) {
        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos = produtos.filter(p => p.nome !== produto.nome || p.imagem !== produto.imagem);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        
        listaProdutos.removeChild(itemElement);
    }

    botaoAdicionar.addEventListener('click', adicionarProduto);
    inputProduto.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            adicionarProduto();
        }
    });
    inputImagem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            adicionarProduto();
        }
    });

    carregarProdutos();
});
