const eventosConfig = {
    
    'caminho': {
        status: 'aberto',
        scriptUrl: "https://script.google.com/macros/s/AKfycbwVX6GWcxXUa0btrzT0PGubV13NDthHAtQcirRZCq1VEjBiRmyXoUb89SJEaRh3GObLTQ/exec",
        titulo: "C.S.J - Edição Masculina Jan/2026",
        banner: "./imgcaminho/11.jpg", 
        textoLongo: `
            <div class="info-grid">
                <div class="info-card">
                    <i class="fa-solid fa-map-pin"></i>
                    <strong>Trajeto (56km)</strong>
                    <p>Saída: Chácara São José (Livramento)<br>Chegada: Vale da Providência.</p>
                </div>
                <div class="info-card highlight">
                    <i class="fa-regular fa-calendar-check"></i>
                    <strong>Encontro</strong>
                    <p>16, 17 e 18 de Janeiro/2026<br>Credenciamento: Sexta (16) às 17:00.</p>
                </div>
                <div class="info-card">
                    <i class="fa-solid fa-bus"></i>
                    <strong>Transporte</strong>
                    <p>Retorno opcional p/ Chácara (+R$ 50).<br>Sua família pode te buscar no Vale.</p>
                </div>
            </div>
            <div class="whatsapp-box">
                <i class="fa-brands fa-whatsapp"></i>
                <div>
                    <strong>VOCÊ PRECISA ENTRAR NO GRUPO!</strong>
                    <p>Clique no link abaixo para receber as orientações:</p>
                    <a href="https://chat.whatsapp.com/JpM1gaFu8xx81T131Obq6B?mode=wwt" target="_blank">Entrar no Grupo do Caminho</a>
                </div>
            </div>
            <div class="alert-box" style="margin-top: 20px;">
                <p><strong>LEIA ATENTAMENTE:</strong></p>
                <ul style="margin-top: 5px;">
                    <li><strong>Obrigatório:</strong> Barraca, colchonete/colchão inflável e roupa de cama.</li>
                    <li><strong>Bagagem:</strong> Malas e barracas devem estar identificadas com etiqueta (vão no carro de apoio).</li>
                    <li><strong>Na mochila de costas:</strong> Apenas o essencial (água, lanterna, capa de chuva, remédios).</li>
                </ul>
            </div>
        `,
        valor: "R$ 350,00 (Sem transporte) ou R$ 400,00 (Com transporte)",
        chave: "caminho.servos@gmail.com (PIX)",
        
        camposExtras: [
            { type: 'text', label: 'CPF', name: 'cpf', placeholder: '000.000.000-00', required: true },
            { type: 'text', label: 'Cidade', name: 'cidade', required: true },
            { type: 'text', label: 'Profissão', name: 'profissao', required: true },
            { type: 'select', label: 'Tamanho da Camiseta', name: 'camiseta', options: ['P', 'M', 'G', 'GG', 'XG', 'EXG'], required: true },
            { type: 'header', label: 'Saúde e Aptidão' },
            { type: 'checkbox', label: 'DECLARO aptidão física: Não possuo impedimentos médicos e estou apto a participar.', name: 'aptidao_fisica', required: true },
            { type: 'text', label: 'Toma medicação controlada? Se sim, qual?', name: 'medicacao', required: true },
            { type: 'text', label: 'Tem doença crônica? Se sim, qual?', name: 'doenca', required: true },
            { type: 'text', label: 'Possui restrição alimentar? Se sim, descreva.', name: 'restricao', required: true },
            { type: 'header', label: 'Opção de Inscrição' },
            { type: 'select', label: 'Selecione seu pacote', name: 'pacote', options: ['R$ 350,00 - SEM Transporte', 'R$ 400,00 - COM Transporte'], required: true },
            { type: 'term', label: 'Uso de Imagem', text: ' AUTORIZO o uso de minha imagem em todo e qualquer material entre fotos e documentos, para ser utilizada em relatórios e atividades de divulgação dos trabalhos pela Missão Servos do Espirito Santo, portadora do CNPJ n° 20.763.4590001-54 em Nossa Senhora do Livramento - MT, Chácara São José, sejam essas destinadas à divulgação ao público em geral. A presente autorização é concedida a título gratuito, abrangendo o uso da imagem acima mencionada em todo território nacional e no exterior, das seguintes formas; Folhetos em geral; folder de apresentação; anúncios em revistas e jornais em geral; cartazes e mídia eletrônica (painéis, televisão, programa para rádio, entre outros). Por esta ser a expressão da minha vontade declaro que autorizo o uso acima descrito sem que nada haja a ser reclamado a título de direitos conexos à minha imagem ou a qualquer outro, e assino a presente autorização.', name: 'termo_imagem', required: true },
            { type: 'term', label: 'Uso de Dados (LGPD)', text: 'A Lei Geral de Proteção de Dados Pessoais (LGPD), Lei n° 13.709/2018, AUTORIZO o uso dos meus dados pessoais, conforme A Lei Geral de Proteção de Dados Pessoais (LGPD), Lei n° 13.709/2018,  para ser utilizados em relatórios e atividades de divulgação dos trabalhos pela Missão Servos do Espirito Santo, portadora do CNPJ n° 20.763.4590001-54 em Nossa Senhora do Livramento - MT, Chácara São José, sejam essas destinadas à controle e envio de informações para seguradora e afins. Por esta ser a expressão da minha vontade declaro que autorizo o uso acima descrito sem que nada haja a ser reclamado a título de direitos conexos à minha pessoa ou a qualquer outro, e assino a presente autorização.', name: 'termo_dados', required: true },
            { type: 'header', label: 'Finalização' },
            { type: 'text', label: 'Como conheceu o Caminho?', name: 'como_conheceu', required: true },
            { type: 'checkbox', label: 'Estou ciente que não haverá devolução do valor em caso de desistência.', name: 'ciencia_regras', required: true },
            { type: 'checkbox', label: 'Já entrei no grupo de WhatsApp.', name: 'check_whats', required: true },
            { type: 'file', label: 'Anexar Comprovante de Pagamento (Obrigatório)', name: 'comprovante', required: true }
        ]
    },



    'carnaval': {
        status: 'embreve',
        msgEmBreve: "As inscrições para o Retiro de Carnaval 2026 abrirão em breve. Fique atento às nossas redes sociais para o lançamento oficial!",
        camposExtras: [
            // Campos extras podem ser adicionados aqui futuramente
        ],
    },

    'hallel': {
        status: 'embreve',
        msgEmBreve: "As inscrições para o Hallel 2026 abrirão em breve. Fique atento às nossas redes sociais para o lançamento oficial!",
    },

    'caminhokd': {
        status: 'embreve',
        msgEmBreve: "As inscrições para o Caminho S.J. KIDS abrirão em breve. Fique atento às nossas redes sociais para o lançamento oficial!",
    },
};


document.addEventListener('DOMContentLoaded', () => {
    
    const params = new URLSearchParams(window.location.search);
    let eventoId = params.get('id');
    const container = document.querySelector('.form-card'); 

    // --- NOVA LÓGICA DE ERRO ---
    // Se não tiver ID ou se o ID não existir na lista de configurações
    if (!eventoId || !eventosConfig[eventoId]) {
        
        // 1. Limpa todo o conteúdo do card (some com o formulário)
        container.innerHTML = '';
        
        // 2. Adiciona classe para centralizar o texto (opcional, visual)
        container.style.textAlign = 'center';
        container.style.padding = '80px 40px';

        // 3. Injeta o HTML de Erro (usando seus estilos)
        container.innerHTML = `
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 4rem; color: #ffcc00; margin-bottom: 20px;"></i>
            <h1 style="font-size: 2rem; margin-bottom: 10px;">Evento não encontrado</h1>
            <p style="color: #666; margin-bottom: 30px;">
                O link que você acessou parece estar incorreto, expirado ou o evento não existe mais.
            </p>
            <a href="eventos.html" class="btn-submit-large" style="text-decoration: none; display: inline-block; width: auto; padding: 15px 40px;">
                <i class="fa-solid fa-arrow-left"></i> Voltar para Agenda
            </a>
        `;
        
        // Adiciona a animação de entrada para ficar bonito
        container.classList.add('in-view');
        
        // PARA O SCRIPT AQUI. Nada abaixo disso será executado.
        return; 
    }

    // --- SE PASSOU DAQUI, O EVENTO EXISTE ---
    const config = eventosConfig[eventoId];

    if (config.status === 'embreve') {
        container.innerHTML = ''; 
        container.style.textAlign = 'center';
        container.style.padding = '80px 20px';

        container.innerHTML = `
            <div class="fade-in">
                <i class="fa-regular fa-clock" style="font-size: 4rem; color: var(--yellow); margin-bottom: 20px;"></i>
                <h1 style="font-size: 2.5rem; margin-bottom: 15px;">Em Breve!</h1>
                <p style="color: #666; font-size: 1.1rem; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
                    ${config.msgEmBreve || "As inscrições para este evento ainda não estão abertas. Fique atento às nossas redes sociais!"}
                </p>
                <a href="eventos.html" class="btn-black-action" style="text-decoration: none; display: inline-flex;">
                    <i class="fa-solid fa-arrow-left" style="color: var(--yellow); margin-right:10px;"></i> Voltar para Agenda
                </a>
            </div>
        `;
        container.classList.add('in-view');
        return; 
    }

    // 2. VERIFICAÇÃO DE "ENCERRADO" (NOVO)
    if (config.status === 'encerrado') {
        container.innerHTML = ''; 
        container.style.textAlign = 'center';
        container.style.padding = '80px 20px';

        container.innerHTML = `
            <div class="fade-in">
                <i class="fa-solid fa-lock" style="font-size: 4rem; color: #cc0000; margin-bottom: 20px;"></i>
                <h1 style="font-size: 2.5rem; margin-bottom: 15px; color: #333;">Inscrições Encerradas</h1>
                <p style="color: #666; font-size: 1.1rem; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
                    ${config.msgEncerrado || "As vagas para este evento foram preenchidas ou o prazo de inscrição expirou."}
                </p>
                <a href="eventos.html" class="btn-black-action" style="text-decoration: none; display: inline-flex;">
                    <i class="fa-solid fa-calendar-days" style="color: var(--yellow); margin-right:10px;"></i> Ver Próximos Eventos
                </a>
            </div>
        `;
        container.classList.add('in-view');
        return; 
    }

    if (config.status === 'embreve') {
        container.innerHTML = ''; // Limpa o formulário
        container.style.textAlign = 'center';
        container.style.padding = '80px 20px';

        container.innerHTML = `
            <div class="fade-in">
                <i class="fa-regular fa-clock" style="font-size: 4rem; color: var(--yellow); margin-bottom: 20px;"></i>
                <h1 style="font-size: 2.5rem; margin-bottom: 15px;">Em Breve!</h1>
                <p style="color: #666; font-size: 1.1rem; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
                    ${config.msgEmBreve || "As inscrições para este evento ainda não estão abertas. Fique atento às nossas redes sociais para o lançamento oficial!"}
                </p>
                <a href="eventos.html" class="btn-black-action" style="text-decoration: none; display: inline-flex;">
                    <i class="fa-solid fa-arrow-left" style="color: var(--yellow); margin-right:10px;"></i> Voltar para Agenda
                </a>
            </div>
        `;
        container.classList.add('in-view');
        return; // Para o script aqui, não monta o formulário
    }

    if(config.banner) document.getElementById('eventBanner').src = config.banner;
    document.getElementById('pageTitle').innerText = config.titulo;
    document.getElementById('pageDesc').innerHTML = config.textoLongo;
    document.getElementById('valorPix').innerText = config.valor;
    document.getElementById('chavePix').innerText = config.chave;
    document.getElementById('eventoId').value = eventoId;

    const extrasContainer = document.getElementById('customFieldsContainer');
    extrasContainer.innerHTML = '';

    config.camposExtras.forEach(campo => {
        if (campo.type === 'header') {
            const h3 = document.createElement('h3');
            h3.className = 'section-label full-width';
            h3.innerText = campo.label;
            extrasContainer.appendChild(h3);
            return;
        }

        const div = document.createElement('div');
        div.className = 'input-group fade-in';
        if(['term', 'file', 'checkbox', 'text'].includes(campo.type)) div.classList.add('full-width');

        if (campo.type !== 'checkbox') {
            const label = document.createElement('label');
            label.innerText = campo.label;
            div.appendChild(label);
        }

        if (campo.type === 'select') {
            const select = document.createElement('select');
            select.name = campo.name;
            if(campo.required) select.required = true;
            select.appendChild(new Option("Selecione...", ""));
            campo.options.forEach(opt => select.appendChild(new Option(opt, opt)));
            div.appendChild(select);
        } 
        else if (campo.type === 'term') {
            const termBox = document.createElement('div');
            termBox.className = 'term-box';
            termBox.innerText = campo.text;
            div.appendChild(termBox);
            const checkLabel = document.createElement('label');
            checkLabel.className = 'checkbox-label';
            checkLabel.innerHTML = `<input type="checkbox" name="${campo.name}" value="Aceito" required> Li e autorizo.`;
            div.appendChild(checkLabel);
        }
        else if (campo.type === 'file') {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.name = campo.name;
            fileInput.id = 'fileInput'; // ID para facilitar
            if(campo.required) fileInput.required = true;
            div.appendChild(fileInput);
        }
        else if (campo.type === 'checkbox') {
            const checkLabel = document.createElement('label');
            checkLabel.className = 'checkbox-label';
            checkLabel.innerHTML = `<input type="checkbox" name="${campo.name}" value="Sim" required> ${campo.label}`;
            div.appendChild(checkLabel);
        }
        else {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = campo.name;
            input.placeholder = campo.placeholder || '';
            if(campo.required) input.required = true;
            div.appendChild(input);
        }
        extrasContainer.appendChild(div);
    });

    if(container) container.classList.add('in-view'); // Proteção contra nulo

    // --- LÓGICA DE ENVIO ROBUSTA (BASE64) ---
    const form = document.getElementById('dynamicForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = document.querySelector('.btn-submit-large');
    const originalText = btn.innerHTML;
    
    // 1. VALIDAR TAMANHO DO ARQUIVO (Blindagem de Payload)
    const fileInput = document.getElementById('fileInput');
    const LIMITE_MB = 4; // Limite de segurança (Google script aceita até uns 10, mas 4 é seguro)
    
    if (fileInput && fileInput.files.length > 0) {
        const fileSize = fileInput.files[0].size / 1024 / 1024; // em MB
        if (fileSize > LIMITE_MB) {
            alert(`O comprovante é muito grande (${fileSize.toFixed(2)}MB). Por favor, envie uma imagem menor que ${LIMITE_MB}MB.`);
            return; // Para tudo, não envia.
        }
    }

    // UI de Carregamento
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Validando e Enviando...';
    btn.disabled = true;
    btn.style.opacity = "0.7";

    try {
        
        // 2. COLETA INTELIGENTE DE DADOS (CORRIGIDO)
        const formData = new FormData(form);
        const dataObj = {};
        
        // Converte FormData para Objeto JSON com verificação de tipo
        formData.forEach((value, key) => {
            // Só tenta fazer o trim se for uma STRING (texto)
            if (typeof value === 'string') {
                dataObj[key] = value.trim(); 
            } else {
                // Se for arquivo ou outro tipo, guarda como está (será tratado depois)
                dataObj[key] = value;
            }
        });

        // 3. PROCESSAMENTO DE ARQUIVO
        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            try {
                // Comprime ou converte para Base64
                const base64 = await toBase64(file);
                dataObj.fileData = base64;
                dataObj.fileName = file.name;
                dataObj.mimeType = file.type;
            } catch (error) {
                throw new Error("Erro ao processar a imagem do comprovante.");
            }
        }

        // 4. ENVIO PARA O GOOGLE
        const response = await fetch(config.scriptUrl, { 
            method: 'POST',
            body: JSON.stringify(dataObj)
        });

        const data = await response.json();

        if(data.result === 'success') {
            // Sucesso! Redireciona ou mostra mensagem
            alert("✅ Inscrição realizada com sucesso! Deus abençoe.");
            window.location.href = 'index.html'; // Ou uma página de "obrigado.html"
        } else {
            throw new Error(data.error || "Erro desconhecido no servidor.");
        }

    } catch (error) {
        console.error('Erro:', error);
        alert("⚠️ Ocorreu um erro: " + error.message);
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.opacity = "1";
    }
});

// Função Auxiliar Base64 (Sem alterações, já funciona bem)
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});});