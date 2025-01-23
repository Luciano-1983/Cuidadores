class Frontend {
    constructor(apiBaseUrl) {
      this.apiBaseUrl = apiBaseUrl;
  
      // Elementos do DOM
      this.cadastroSection = document.getElementById('cadastro');
      this.buscaSection = document.getElementById('busca');
      this.cadastroForm = document.getElementById('cadastroForm');
      this.buscaForm = document.getElementById('buscaForm');
      this.resultContainer = document.getElementById('resultado');
      this.cadastroMensagem = document.getElementById('cadastroMensagem');
  
      // Botões de navegação
      this.btnCadastro = document.getElementById('btnCadastro');
      this.btnBusca = document.getElementById('btnBusca');
  
      // Configurar eventos
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      // Alternar entre telas
      this.btnCadastro.addEventListener('click', () => this.mostrarTela('cadastro'));
      this.btnBusca.addEventListener('click', () => this.mostrarTela('busca'));
  
      // Enviar formulários
      this.cadastroForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.cadastrarProfissional();
      });
  
      this.buscaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.buscarProfissionais();
      });
    }
  
    mostrarTela(tela) {
      if (tela === 'cadastro') {
        this.cadastroSection.classList.remove('hidden');
        this.buscaSection.classList.add('hidden');
      } else {
        this.buscaSection.classList.remove('hidden');
        this.cadastroSection.classList.add('hidden');
      }
    }
  
    async cadastrarProfissional() {
      const profissional = {
        nome: document.getElementById('nome').value,
        especialidade: document.getElementById('especialidade').value,
        registroProfissional: document.getElementById('registroProfissional').value,
        endereco: document.getElementById('endereco').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        disponibilidade: document.getElementById('disponibilidade').value,
      };
  
      try {
        const response = await fetch(`${this.apiBaseUrl}/profissionais`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profissional),
        });
  
        if (response.ok) {
          this.cadastroMensagem.textContent = 'Profissional cadastrado com sucesso!';
          this.cadastroMensagem.style.color = 'green';
          this.cadastroForm.reset();
        } else {
          throw new Error('Erro ao cadastrar profissional.');
        }
      } catch (error) {
        this.cadastroMensagem.textContent = error.message;
        this.cadastroMensagem.style.color = 'red';
      }
    }
  
    async buscarProfissionais() {
      const especialidade = document.getElementById('buscaEspecialidade').value;
      const cidade = document.getElementById('buscaCidade').value;
  
      try {
        const response = await fetch(`${this.apiBaseUrl}/profissionais?especialidade=${especialidade}&cidade=${cidade}`);
        if (!response.ok) throw new Error('Erro ao buscar profissionais.');
  
        const profissionais = await response.json();
        this.exibirProfissionais(profissionais);
      } catch (error) {
        this.resultContainer.innerHTML = `<li>${error.message}</li>`;
      }
    }
  
    exibirProfissionais(profissionais) {
      this.resultContainer.innerHTML = profissionais.length
        ? profissionais.map(p => `
          <li>
            <strong>${p.nome}</strong> - ${p.especialidade}<br>
            Registro: ${p.registroProfissional}<br>
            Cidade: ${p.endereco}<br>
            Contato: ${p.telefone}, ${p.email}<br>
            Disponibilidade: ${p.disponibilidade}
          </li>
        `).join('')
        : '<li>Nenhum profissional encontrado.</li>';
    }
  }
  
  // Instanciar o Frontend
  const frontend = new Frontend('http://localhost:3000/api');
  