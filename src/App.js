import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import sleepMusic from './sleep-music.mp3'; // Importando o arquivo de áudio

function App() {
    const mensagemInicial = { frase: "Clique para receber uma mensagem motivacional!", autor: "" };
    const [mensagem, setMensagem] = useState(mensagemInicial);
    const [mostrarMensagem, setMostrarMensagem] = useState(true);
    const audioRef = useRef(null);

    const mensagensMotivacionais = [
        { frase: "Determinação, coragem e autoconfiança são fatores decisivos para o sucesso.", autor: "Dalai Lama" }, // 1
        { frase: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.", autor: "Vidal Sassoon" }, // 2
        { frase: "Acredite em si próprio e chegará um dia em que os outros não terão outra escolha senão acreditar com você.", autor: "Cynthia Kersey" }, // 3
        { frase: "Não importa o quão devagar você vá, desde que você não pare.", autor: "Confúcio" }, // 4
        { frase: "Você perde todas as chances que você não aproveita.", autor: "Wayne Gretzky" }, // 5
        { frase: "Eu falhei de novo e de novo na minha vida, e é por isso que eu tenho sucesso.", autor: "Michael Jordan" }, // 6
        { frase: "A persistência é o caminho do êxito.", autor: "Charles Chaplin" }, // 7
        { frase: "Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças.", autor: "Leon C. Megginson" }, // 8
        { frase: "Nossas maiores fraquezas residem em desistir. O caminho mais certo de sucesso é sempre tentar apenas mais uma vez.", autor: "Thomas Edison" }, // 9
        { frase: "A mente é tudo. Você se torna aquilo que você pensa.", autor: "Buda" }, // 10
        { frase: "Para ter sucesso, sua determinação deve ser maior que sua dúvida.", autor: "Lou Holtz" }, // 11
        { frase: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.", autor: "Eleanor Roosevelt" }, // 12
        { frase: "Você não tem que ser grande para começar, mas você tem que começar para ser grande.", autor: "Zig Ziglar" }, // 13
        { frase: "O sucesso não é definitivo, o fracasso não é fatal: é a coragem de continuar que conta.", autor: "Winston Churchill" }, // 14
        { frase: "Não espere. O tempo nunca será 'justo'.", autor: "Napoleon Hill" }, // 15
        { frase: "Você não falha até parar de tentar.", autor: "Albert Einstein" }, // 16
        { frase: "Faça o que você pode, com o que você tem, onde você estiver.", autor: "Theodore Roosevelt" }, // 17
        { frase: "O sucesso é ir de fracasso em fracasso sem perder entusiasmo.", autor: "Winston Churchill" }, // 18
        { frase: "A vida é 10% o que acontece comigo e 90% de como eu reajo a isso.", autor: "Charles R. Swindoll" }, // 19
        { frase: "Para ser um campeão, acredite em si mesmo quando ninguém mais acredita.", autor: "Muhammad Ali" }, // 20
        { frase: "A coragem não é a ausência de medo, mas a percepção de que algo é mais importante do que o medo.", autor: "Ambrose Redmoon" }, // 21
        { frase: "O melhor momento para plantar uma árvore foi há 20 anos. O segundo melhor momento é agora.", autor: "Provérbio Chinês" }, // 22
        { frase: "Não é a força, mas a persistência, que leva ao sucesso.", autor: "Samuel Johnson" }, // 23
        { frase: "A diferença entre uma pessoa de sucesso e as outras não é a falta de força, nem a falta de conhecimento, mas sim a falta de vontade.", autor: "Vince Lombardi" }, // 24
        { frase: "O pessimista vê dificuldade em cada oportunidade. O otimista vê oportunidade em cada dificuldade.", autor: "Winston Churchill" }, // 25
        { frase: "Não conte os dias, faça os dias contar.", autor: "Muhammad Ali" }, // 26
        { frase: "As dificuldades preparam pessoas comuns para destinos extraordinários.", autor: "C.S. Lewis" }, // 27
        { frase: "Acreditar que você pode já é metade do caminho andado.", autor: "Theodore Roosevelt" }, // 28
        { frase: "Tudo o que a mente humana pode conceber, ela pode conquistar.", autor: "Napoleon Hill" }, // 29
        { frase: "A jornada de mil milhas começa com um único passo.", autor: "Lao Tzu" }, // 30
        { frase: "O segredo do sucesso é a constância do propósito.", autor: "Benjamin Disraeli" }, // 31
        { frase: "Seja a mudança que você deseja ver no mundo.", autor: "Mahatma Gandhi" }, // 32
        { frase: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", autor: "Robert Collier" }, //33
        { frase: "Você nunca falha até parar de tentar.", autor: "Isaac Newton" }, // 34
        { frase: "A vida é sobre fazer um impacto, não uma renda.", autor: "Kevin Kruse" }, // 35
        { frase: "A imaginação é mais importante que o conhecimento.", autor: "Albert Einstein" }, // 36
        { frase: "Faça ou não faça. Tentativa não existe.", autor: "Yoda" }, // 37
        { frase: "Seja você mesmo; todos os outros já existem.", autor: "Oscar Wilde" }, // 38 
        { frase: "A vida é o que acontece quando você está ocupado fazendo outros planos.", autor: "John Lennon" }, // 39
        { frase: "Faça sempre o seu melhor. O que você planta agora, colherá mais tarde.", autor: "Og Mandino" }, // 40
        { frase: "A felicidade não é algo pronto. Ela vem de suas próprias ações.", autor: "Dalai Lama" }, // 41
        { frase: "Sonhe grande e ouse falhar.", autor: "Norman Vaughan" }, // 42
        { frase: "Não deixe o que você não pode fazer interferir no que você pode fazer.", autor: "John Wooden" }, // 43
        { frase: "Você não precisa ser ótimo para começar, mas precisa começar para ser ótimo.", autor: "Zig Ziglar" }, // 44 
        { frase: "Eu não falhei. Eu apenas encontrei 10.000 maneiras que não funcionam.", autor: "Thomas Edison" }, // 45
        { frase: "O segredo para avançar é começar.", autor: "Mark Twain" }, // 46
        { frase: "Eu escolho fazer o resto da minha vida o melhor da minha vida.", autor: "Louise Hay" }, // 47
        { frase: "A vida começa ao final da sua zona de conforto.", autor: "Neale Donald Walsch" }, //48
        { frase: "Você só vive uma vez, mas se fizer isso direito, uma vez é o suficiente.", autor: "Mae West" }, //49
        { frase: "Eu sou grato por todos aqueles que disseram NÃO. Por causa deles, eu fiz eu mesmo.", autor: "Albert Einstein" }, //50
        { frase: "Você pode ser desapontado se falhar, mas você está condenado se não tentar.", autor: "Beverly Sills" }, // 51
        { frase: "O otimismo é a fé que leva ao sucesso. Nada pode ser feito sem esperança e confiança.", autor: "Helen Keller" }, // 52
        { frase: "A felicidade não é algo que você adia para o futuro; é algo que você projeta para o presente.", autor: "Jim Rohn" }, // 53
        { frase: "Acredite que você pode e você estará no meio do caminho.", autor: "Theodore Roosevelt" }, // 54
        { frase: "A única maneira de fazer um ótimo trabalho é amar o que você faz.", autor: "Steve Jobs" }, // 55
        { frase: "Seu tempo é limitado, não o desperdice vivendo a vida de outra pessoa.", autor: "Steve Jobs" }, // 56 
        { frase: "O sucesso não é quanto dinheiro você ganha, mas a diferença que você faz na vida das pessoas.", autor: "Michelle Obama" }, // 57
        { frase: "Não importa onde você está vindo. Tudo o que importa é para onde você está indo.", autor: "Brian Tracy" }, // 58
        { frase: "Não conte os dias, faça os dias contarem.", autor: "Muhammad Ali" }, // 59
        { frase: "Faça o que você pode, com o que tem, onde estiver.", autor: "Theodore Roosevelt" }, // 60
        { frase: "Você se torna o que acredita.", autor: "Oprah Winfrey" }, // 61
        { frase: "Comece onde você está. Use o que você tem. Faça o que você pode.", autor: "Arthur Ashe" }, // 62
        { frase: "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.", autor: "Winston S. Churchill" }, // 63
        { frase: "O que você faz hoje pode melhorar todos os seus amanhãs.", autor: "Ralph Marston" }, // 64
        { frase: "O maior risco é não arriscar nada.", autor: "Mark Zuckerberg" }, // 65
        { frase: "Se você pode sonhar, você pode fazer.", autor: "Walt Disney" }, // 66
        { frase: "Eu não falhei. Eu encontrei 10.000 maneiras que não funcionam.", autor: "Thomas Edison" }, // 67
        { frase: "A coragem é como um músculo; ela é fortalecida pelo uso.", autor: "Ruth Gordon" }, // 68
        { frase: "O segredo do sucesso é a constância para o objetivo.", autor: "Benjamin Disraeli" }, // 69
        { frase: "A persistência é o caminho do êxito.", autor: "Charles Chaplin" }, // 70
        { frase: "A vida é 10% o que acontece comigo e 90% como eu reajo a isso.", autor: "Charles Swindoll" }, // 71
        { frase: "Para ser bem-sucedido, a primeira coisa a fazer é se apaixonar pelo seu trabalho.", autor: "Sister Mary Lauretta" }, // 72
        { frase: "O sucesso não é quanto dinheiro você ganha, mas a diferença que você faz na vida das pessoas.", autor: "Michelle Obama" }, // 73
        { frase: "A única maneira de fazer um ótimo trabalho é amar o que você faz.", autor: "Steve Jobs" }, // 74
        { frase: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", autor: "Robert Collier" }, // 75
        { frase: "O sucesso não é a chave para a felicidade. A felicidade é a chave para o sucesso.", autor: "Albert Schweitzer" }, // 76
        { frase: "Nunca é tarde demais para ser o que você poderia ter sido.", autor: "George Eliot" }, // 77
        { frase: "Acredite em si mesmo! Tenha fé em suas habilidades!", autor: "Norman Vincent Peale" }, // 78
        { frase: "Se você sonha em ser algo, você pode tornar-se isso.", autor: "William Arthur Ward" }, // 79
        { frase: "Sempre parece impossível até que seja feito.", autor: "Nelson Mandela" }, // 80
        { frase: "Se você pode sonhar, você pode conseguir.", autor: "Zig Ziglar" }, // 81
        { frase: "A melhor maneira de prever o futuro é criá-lo.", autor: "Peter Drucker" }, //
        { frase: "O sucesso é caminhar de fracasso em fracasso sem perder o entusiasmo.", autor: "Winston Churchill" }, // 82
        { frase: "Você não precisa ser ótimo para começar, mas precisa começar para ser ótimo.", autor: "Zig Ziglar" }, // 83
        { frase: "A vida é uma aventura ousada ou nada.", autor: "Helen Keller" }, // 84
        { frase: "O segredo do sucesso é começar.", autor: "Mark Twain" }, // 85
        { frase: "Sua atitude, não sua aptidão, determinará sua altitude.", autor: "Zig Ziglar" }, // 86
        { frase: "Não espere. O tempo nunca será perfeito.", autor: "Napoleon Hill" }, // 87
        { frase: "Nunca desista de um sonho por causa do tempo que levará para realizá-lo.", autor: "Earl Nightingale" }, // 88
        { frase: "O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta.", autor: "Winston Churchill" }, // 89
        { frase: "A vida é o que acontece enquanto você está ocupado fazendo outros planos.", autor: "John Lennon" }, // 90
        { frase: "O sucesso é a soma de pequenos esforços, repetidos dia após dia.", autor: "Robert Collier" }, // 91
        { frase: "Para ter sucesso, sua determinação deve ser maior que sua dúvida.", autor: "Lou Holtz" }, // 92
        { frase: "Não julgue cada dia pela colheita que você obtém, mas pelas sementes que você planta.", autor: "Robert Louis Stevenson" }, // 93
        { frase: "A melhor maneira de prever o futuro é criá-lo.", autor: "Peter Drucker" }, // 94
        { frase: "Sucesso é onde preparação e oportunidade se encontram.", autor: "Bobby Unser" }, // 95
        { frase: "Seu tempo é limitado, então não o desperdice vivendo a vida de outra pessoa.", autor: "Steve Jobs" }, // 96
        { frase: "Você perde 100% das chances que não aproveita.", autor: "Wayne Gretzky" }, // 97
        { frase: "A melhor preparação para o amanhã é fazer o seu melhor hoje.", autor: "H. Jackson Brown Jr." }, // 98
        { frase: "A vida é 10% o que me acontece e 90% de como eu reajo a isso.", autor: "Charles R. Swindoll" }, // 99
        { frase: "A motivação é o que faz você começar. O hábito é o que faz você continuar.", autor: "Jim Ryun" }, // 100
        // Adicione os outros objetos de frases e autores aqui
    ];

    const carregarMensagem = () => {
        const indiceAleatorio = Math.floor(Math.random() * mensagensMotivacionais.length);
        const mensagemSelecionada = mensagensMotivacionais[indiceAleatorio];
        setMensagem(mensagemSelecionada);
        setMostrarMensagem(true);

        setTimeout(() => {
            setMensagem(mensagemInicial);
            setMostrarMensagem(true);
        }, 60000); // Redefine para a mensagem inicial após 60 segundos
    };

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play();
            }
        };

        window.addEventListener('click', playAudio);

        return () => {
            window.removeEventListener('click', playAudio);
        };
    }, []);

    return (
        <div className="App background-image">
            <audio ref={audioRef} src={sleepMusic} loop>
                Seu navegador não suporta o elemento de áudio.
            </audio>
            <header className="App-header">
                {mostrarMensagem && (
                    <div className="mensagem-container">
                        <p className="frase">{mensagem.frase}</p>
                        {mensagem.autor && <p className="autor">{mensagem.autor}</p>}
                    </div>
                )}
                <button onClick={carregarMensagem}>Receber Mensagem</button>
            </header>
        </div>
    );
}

export default App;
