(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function formatedData(data) {
        data = new Date();
        let day = data.getDay();
        let dayF = day < 10 ? '0' + day : day;
        let month = data.getMonth() + 1; //+1 pois no getMonth Janeiro começa com zero.
        let monthF = month < 10 ? '0' + month : month;
        let anoF = data.getFullYear();
        let hour = data.getHours();
        let min = data.getMinutes();
        let sec = data.getSeconds();
        return `${dayF}/${monthF}/${anoF} ${hour}:${min}:${sec}`;
    }
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function patio() {
        //salvar no local storage as informaçoes
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement('tr');
            console.log(veiculo.entrada);
            row.innerHTML = `
      <td>${veiculo.nome}</td>
      <td>${veiculo.placa}</td>
      <td>${formatedData(veiculo.entrada)}</td>
      <td>
      <button class="noselect delete" data-placa='${veiculo.placa}'><span class='text' >Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button>
      </td>
      `;
            (_a = row.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            (_b = $('#patio')) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
        function render() {
            $('#patio').innerHTML = '';
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert('Os campos nome e placa são obrigatórios');
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date() }, true);
    });
})();
