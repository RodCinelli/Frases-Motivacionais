import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import sleepMusic from './sleep-music.mp3'; // Importando o arquivo de áudio

function App() {
    const mensagemInicial = { frase: "Clique para receber uma mensagem motivacional!", autor: "" };
    const [mensagem, setMensagem] = useState(mensagemInicial);
    const [mostrarMensagem, setMostrarMensagem] = useState(true);
    const audioRef = useRef(null);
    const timerRef = useRef(null); // Referência para o timer

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
        { frase: "A vida é 10% o que acontece comigo e 90% como eu reajo a isso.", autor: "Charles Swindoll" }, // 70
        { frase: "Para ser bem-sucedido, a primeira coisa a fazer é se apaixonar pelo seu trabalho.", autor: "Sister Mary Lauretta" }, // 71
        { frase: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", autor: "Robert Collier" }, // 72
        { frase: "O sucesso não é a chave para a felicidade. A felicidade é a chave para o sucesso.", autor: "Albert Schweitzer" }, // 73
        { frase: "Nunca é tarde demais para ser o que você poderia ter sido.", autor: "George Eliot" }, // 74
        { frase: "Acredite em si mesmo! Tenha fé em suas habilidades!", autor: "Norman Vincent Peale" }, // 75
        { frase: "Se você sonha em ser algo, você pode tornar-se isso.", autor: "William Arthur Ward" }, // 76
        { frase: "Sempre parece impossível até que seja feito.", autor: "Nelson Mandela" }, // 77
        { frase: "Se você pode sonhar, você pode conseguir.", autor: "Zig Ziglar" }, // 78
        { frase: "A melhor maneira de prever o futuro é criá-lo.", autor: "Peter Drucker" }, // 79
        { frase: "O sucesso é caminhar de fracasso em fracasso sem perder o entusiasmo.", autor: "Winston Churchill" }, // 80
        { frase: "Você não precisa ser ótimo para começar, mas precisa começar para ser ótimo.", autor: "Zig Ziglar" }, // 81
        { frase: "A vida é uma aventura ousada ou nada.", autor: "Helen Keller" }, // 82
        { frase: "O segredo do sucesso é começar.", autor: "Mark Twain" }, // 83
        { frase: "Sua atitude, não sua aptidão, determinará sua altitude.", autor: "Zig Ziglar" }, // 84
        { frase: "Não espere. O tempo nunca será perfeito.", autor: "Napoleon Hill" }, // 85
        { frase: "Nunca desista de um sonho por causa do tempo que levará para realizá-lo.", autor: "Earl Nightingale" }, // 86
        { frase: "O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta.", autor: "Winston Churchill" }, // 87
        { frase: "A vida é o que acontece enquanto você está ocupado fazendo outros planos.", autor: "John Lennon" }, // 88
        { frase: "O sucesso é a soma de pequenos esforços, repetidos dia após dia.", autor: "Robert Collier" }, // 89
        { frase: "Para ter sucesso, sua determinação deve ser maior que sua dúvida.", autor: "Lou Holtz" }, // 90
        { frase: "Não julgue cada dia pela colheita que você obtém, mas pelas sementes que você planta.", autor: "Robert Louis Stevenson" }, // 91
        { frase: "Sucesso é onde preparação e oportunidade se encontram.", autor: "Bobby Unser" }, // 92
        { frase: "Seu tempo é limitado, então não o desperdice vivendo a vida de outra pessoa.", autor: "Steve Jobs" }, // 93
        { frase: "Você perde 100% das chances que não aproveita.", autor: "Wayne Gretzky" }, // 94
        { frase: "A melhor preparação para o amanhã é fazer o seu melhor hoje.", autor: "H. Jackson Brown Jr." }, // 95
        { frase: "A vida é 10% o que me acontece e 90% de como eu reajo a isso.", autor: "Charles R. Swindoll" }, // 96
        { frase: "A motivação é o que faz você começar. O hábito é o que faz você continuar.", autor: "Jim Ryun" }, // 97
        { frase: "O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo. Mesmo não atingindo o alvo, quem busca e vence obstáculos, no mínimo fará coisas admiráveis.", autor: "José de Alencar" }, // 98
        { frase: "Só se pode alcançar um grande êxito quando nos mantemos fiéis a nós mesmos.", autor: "Friedrich Nietzsche" }, // 99
        { frase: "Só existe um êxito: a capacidade de levar a vida que se quer.", autor: "Cristopher Morley" }, // 100
        { frase: "A vitalidade é demonstrada não apenas pela persistência, mas pela capacidade de começar de novo.", autor: "F. Scott Fitzgerald" }, // 101
        { frase: "O homem não teria alcançado o possível se, repetidas vezes, não tivesse tentado o impossível.", autor: "Max Weber" }, // 102
        { frase: "Lute com determinação, abrace a vida com paixão, perca com classe e vença com ousadia, porque o mundo pertence a quem se atreve e a vida é muito para ser insignificante.", autor: "Augusto Branco" }, // 103
        { frase: "Todo mundo é capaz de sentir os sofrimentos de um amigo. Ver com agrado os seus êxitos exige uma natureza muito delicada.", autor: "Oscar Wilde" }, // 104
        { frase: "Força de ânimo e coragem na adversidade servem para conquistar o êxito, mais do que um exército.", autor: "John Dryden" }, // 105
        { frase: "O sucesso tem uma estranha capacidade de esconder o erro.", autor: "Salústio" }, // 106
        { frase: "Creia em si, mas não duvide sempre dos outros.", autor: "Machado de Assis" }, // 107
        { frase: "Uma autoimagem forte e positiva é a melhor preparação possível para o sucesso.", autor: "Joyce Brothers" }, // 108
        { frase: "Para ter um negócio de sucesso, alguém, algum dia, teve que tomar uma atitude de coragem.", autor: "Peter Drucker" }, // 109
        { frase: "Estar decidido, acima de qualquer coisa, é o segredo do êxito.", autor: "Henry Ford" }, // 110
        { frase: "Para obter êxito no mundo temos de parecer loucos mas sermos espertos.", autor: "Barão de Montesquieu" }, // 111
        { frase: "A disciplina é a mãe do êxito.", autor: "Ésquilo" }, // 112
        { frase: "O segredo do êxito na vida de um homem está em preparar-se para aproveitar a ocasião, quando ela se apresenta.", autor: "Benjamin Disraeli" }, // 113
        { frase: "A persistência realiza o impossível.", autor: "Provérbio Chinês" }, //114
        { frase: "Persistência é a irmã gêmea da excelência. Uma é a mãe da qualidade, a outra é a mãe do tempo.", autor: "Marabel Morgan" }, // 115
        { frase: "Você tem que acordar cada manhã com determinação se você pretende ir para a cama com satisfação.", autor: "George Lorimer" }, // 116
        { frase: "Suba o primeiro degrau com fé. Não é necessário que você veja toda a escada. Apenas dê o primeiro passo.", autor: "Martin Luther King" }, // 117
        { frase: "O êxito da vida não se mede pelo caminho que você conquistou, mas sim pelas dificuldades que superou no caminho.", autor: "Booker T. Washington" }, // 118
        { frase: "Tudo deveria se tornar o mais simples possível, mas não simplificado.", autor: "Albert Einstein" }, // 119
        { frase: "Comece fazendo o que é necessário, depois o que é possível, e de repente você estará fazendo o impossível.", autor: "São Francisco de Assis" }, // 120
        { frase: "O erro acontece de vários modos, enquanto ser correto é possível apenas de um modo.", autor: "Aristóteles" }, // 121
        { frase: "Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa ser realizado.", autor: "Roberto Shinyashiki" }, // 122
        { frase: "Acredite em si e chegará um dia em que os outros não terão outra escolha senão acreditar com você.", autor: "Cynthia Kersey" }, // 123
        { frase: "Se a sua vida for a melhor coisa que já te aconteceu, acredite, você tem mais sorte do que pode imaginar.", autor: "Daniel Godri" }, // 124
        { frase: "Quer você acredite que consiga fazer uma coisa ou não, você está certo.", autor: "Henry Ford" }, // 125
        { frase: "A força não provém da capacidade física. Provém de uma vontade indomável.", autor: "Mahatma Gandhi" }, // 126
        { frase: "O número dos que nos invejam confirma as nossas capacidades.", autor: "Oscar Wilde" }, // 127
        { frase: "É capaz quem pensa que é capaz.", autor: "Buda" }, // 127
        { frase: "A nossa maior glória não reside no fato de nunca cairmos, mas sim em levantarmo-nos sempre depois de cada queda.", autor: "Oliver Goldsmith" }, // 128
        { frase: "Transportai um punhado de terra todos os dias e fareis uma montanha.", autor: "Confúcio" }, // 129
        { frase: "Maravilhas nunca faltaram ao mundo; o que sempre falta é a capacidade de senti-las e admirá-las.", autor: "Mario Quintana" }, // 130
        { frase: "Inteligência é a capacidade de se adaptar à mudança.", autor: "Stephen Hawking" }, // 131
        { frase: "A liderança é a capacidade de conseguir que as pessoas façam o que não querem fazer e gostem de o fazer.", autor: "Harry Truman" }, // 132
        { frase: "A genialidade é a capacidade de realizar aquilo que existe no pensamento.", autor: "F. Scott Fitzgerald" }, // 133
        { frase: "A única forma de chegar ao impossível é acreditar que é possível.", autor: "Alice no País das Maravilhas" }, // 134
        { frase: "Não se pode acreditar que é possível ser feliz procurando a infelicidade alheia.", autor: "Sêneca" }, // 135
        { frase: "Não é possível convencer um crente de coisa alguma, pois suas crenças não se baseiam em evidências; baseiam-se numa profunda necessidade de acreditar.", autor: "Carl Sagan" }, // 136
        { frase: "A um homem bom não é possível que ocorra nenhum mal, nem em vida nem em morte.", autor: "Sócrates" }, // 137
        { frase: "Por sabedoria entendo a arte de tornar a vida mais agradável e feliz possível.", autor: "Arthur Schopenhauer" }, // 138
        { frase: "Contra os ataques é possível nos defendermos: contra o elogio não se pode fazer nada.", autor: "Sigmund Freud" }, // 139
        { frase: "É inútil dizer 'estamos a fazer o possível'. Precisamos de fazer o que é necessário.", autor: "Winston Churchill" }, // 140
        { frase: "Sem amor por si mesmo, o amor pelos outros também não é possível. O ódio por si mesmo é exatamente idêntico ao flagrante egoísmo e, no final, conduz ao mesmo isolamento cruel e ao mesmo desespero.", autor: "Hermann Hesse" }, // 141
        { frase: "O que mais desespera não é o impossível. Mas o possível não alcançado.", autor: "Robert Mallet" }, // 142
        { frase: "Nossas dúvidas são traidoras e nos fazem perder o que, com frequência, poderíamos ganhar, por simples medo de arriscar.", autor: "William Shakespeare" }, // 143
        { frase: "Até cortar os próprios defeitos pode ser perigoso. Nunca se sabe qual é o defeito que sustenta nosso edifício inteiro.", autor: "Clarice Lispector" }, // 144
        { frase: "Às vezes construímos sonhos em cima de grandes pessoas. O tempo passa e descobrimos que grandes mesmo eram os sonhos e as pessoas pequenas demais para torná-los reais!", autor: "Bob Marley" }, // 145
        { frase: "Renda-se, como eu me rendi. Mergulhe no que você não conhece como eu mergulhei. Não se preocupe em entender, viver ultrapassa qualquer entendimento.", autor: "Clarice Lispector" }, // 146
        { frase: "Todo mundo é capaz de dominar uma dor, exceto quem a sente.", autor: "William Shakespeare" }, // 147
        { frase: "A vantagem de ter péssima memória é divertir-se muitas vezes com as mesmas coisas boas como se fosse a primeira vez.", autor: "Friedrich Nietzsche" }, // 148
        { frase: "Não viva para que a sua presença seja notada, mas para que a sua falta seja sentida.", autor: "Bob Marley" }, // 149
        { frase: "Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa ser realizado.", autor: "Roberto Shinyashiki" }, // 150
        { frase: "Ser feliz sem motivo é a mais autêntica forma de felicidade.", autor: "Carlos Drummond de Andrade" }, // 151
        { frase: "Às vezes ouço passar o vento; e só de ouvir o vento passar, vale a pena ter nascido.", autor: "Fernando Pessoa" }, // 152
        { frase: "Purifica o teu coração antes de permitires que o amor entre nele, pois até o mel mais doce azeda num recipiente sujo.", autor: "Pitágoras" }, // 153
        { frase: "Só existem dois dias no ano que nada pode ser feito. Um se chama ontem e o outro se chama amanhã, portanto hoje é o dia certo para amar, acreditar, fazer e principalmente viver.", autor: "Dalai Lama" }, // 154
        { frase: "O sábio nunca diz tudo o que pensa, mas pensa sempre tudo o que diz.", autor: "Aristóteles" }, // 155
        { frase: "Não espere por uma crise para descobrir o que é importante em sua vida.", autor: "Platão" }, // 156
        { frase: "É mais fácil obter o que se deseja com um sorriso do que à ponta da espada.", autor: "William Shakespeare" }, // 157
        { frase: "Viver é a coisa mais rara do mundo. A maioria das pessoas apenas existe.", autor: "Oscar Wilde" }, // 158
        { frase: "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.", autor: "Oliver Wendell Holmes Sr." }, // 159
        { frase: "Não ligo que me olham da cabeça aos pés... porque nunca farão minha cabeça e nunca chegarão aos meus pés.", autor: "Bob Marley" }, // 160
        { frase: "Tão bom morrer de amor! E continuar vivendo...", autor: "Mario Quintana" }, // 161
        { frase: "O ignorante afirma, o sábio duvida, o sensato reflete.", autor: "Aristóteles" }, // 162
        { frase: "Imagine uma nova história para sua vida e acredite nela.", autor: "Paulo Coelho" }, // 163
        { frase: "Aquilo que se faz por amor está sempre além do bem e do mal.", autor: "Friedrich Nietzsche" }, // 164
        { frase: "Duas coisas são infinitas: o universo e a estupidez humana. Mas, em relação ao universo, ainda não tenho certeza absoluta.", autor: "Albert Einstein" }, // 165
        { frase: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.", autor: "Stubby Currence" }, // 166
        { frase: "Exige muito de ti e espera pouco dos outros. Assim, evitarás muitos aborrecimentos.", autor: "Confúcio" }, // 167
        { frase: "Não existe um caminho para a felicidade. A felicidade é o caminho.", autor: "Thich Nhat Hanh" }, // 168
        { frase: "Faça o que for necessário para ser feliz. Mas não se esqueça que a felicidade é um sentimento simples, você pode encontrá-la e deixá-la ir embora por não perceber sua simplicidade.", autor: "Martha Medeiros" }, // 169
        { frase: "O segredo é não correr atrás das borboletas... É cuidar do jardim para que elas venham até você.", autor: "D. Elhers" }, // 170
        { frase: "Embora ninguém possa voltar atrás e fazer um novo começo, qualquer um pode começar agora e fazer um novo fim.", autor: "James R. Sherman" }, // 171
        { frase: "As mais lindas palavras de amor são ditas no silêncio de um olhar.", autor: "Leonardo da Vinci" }, // 172
        { frase: "A saudade é o que faz as coisas pararem no tempo.", autor: "Mario Quintana" }, // 173
        { frase: "Não há fatos eternos, como não há verdades absolutas.", autor: "Friedrich Nietzsche" }, // 174
        { frase: "Perder tempo em aprender coisas que não interessam priva-nos de descobrir coisas interessantes.", autor: "Carlos Drummond de Andrade" }, // 175
        { frase: "Escolhe um trabalho de que gostes e não terás que trabalhar nem um dia na tua vida.", autor: "Confúcio" }, // 176
        { frase: "Tente mover o mundo, o primeiro passo será mover a si mesmo.", autor: "Platão" }, // 177
        { frase: "Não existe nada de completamente errado no mundo. Mesmo um relógio parado consegue estar certo duas vezes por dia.", autor: "Paulo Coelho" }, // 178
        { frase: "Se um dia tiver que escolher entre o mundo e o amor lembre-se: se escolher o mundo ficará sem o amor, mas se escolher o amor com ele você conquistará o mundo.", autor: "Albert Einstein" }, // 179
        { frase: "Pedras no caminho? Eu guardo todas. Um dia vou construir um castelo.", autor: "Nemo Nox" }, // 180
        { frase: "Para conseguir a amizade de uma pessoa digna é preciso desenvolvermos em nós mesmos as qualidades que naquela admiramos.", autor: "Sócrates" }, // 181
        { frase: "As pessoas entram em nossa vida por acaso, mas não é por acaso que elas permanecem.", autor: "Lilian Tonet" }, // 182
        { frase: "Se A é o sucesso, então A é igual a X mais Y mais Z. O trabalho é X; Y é o lazer; e Z é manter a boca fechada.", autor: "Albert Einstein" }, // 183
        { frase: "Quanto mais nos elevamos, menores parecemos aos olhos daqueles que não sabem voar.", autor: "Friedrich Nietzsche" }, // 184
        { frase: "Esquecer é uma necessidade. A vida é uma lousa, em que o destino, para escrever um novo caso, precisa de apagar o caso escrito.", autor: "Machado de Assis" }, // 185
        { frase: "Aja antes de falar e, portanto, fale de acordo com os seus atos.", autor: "Confúcio" }, // 186
        { frase: "Feliz aquele que transfere o que sabe e aprende o que ensina.", autor: "Cora Coralina" }, // 187
        { frase: "Se choras por não teres visto o pôr do sol, as lágrimas não te deixarão ver as estrelas.", autor: "Rabindranath Tagore" }, // 188
        { frase: "O importante não é vencer todos os dias, mas lutar sempre.", autor: "Waldemar Valle Martins" }, // 189
        { frase: "O que me preocupa não é o grito dos maus. É o silêncio dos bons.", autor: "Martin Luther King" }, // 190
        { frase: "A medida do amor é amar sem medida.", autor: "Santo Agostinho" }, // 191
        { frase: "A saudade é a nossa alma dizendo para onde ela quer voltar.", autor: "Rubem Alves" }, // 192
        { frase: "Amar não é olhar um para o outro, é olhar juntos na mesma direção.", autor: "Antoine de Saint-Exupéry" }, // 193
        { frase: "Pouca sinceridade é uma coisa perigosa, e muita sinceridade é absolutamente fatal.", autor: "Oscar Wilde" }, // 194
        { frase: "Seja humilde, pois até o sol com toda sua grandeza se põe e deixa a lua brilhar.", autor: "Bob Marley" }, // 195
        { frase: "Só se vê bem com o coração, o essencial é invisível aos olhos.", autor: "Antoine de Saint-Exupéry" }, // 196
        // Adicione os outros objetos de frases e autores aqui
    ];

    const carregarMensagem = () => {
        // Cancelando o timer anterior
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        const indiceAleatorio = Math.floor(Math.random() * mensagensMotivacionais.length);
        const mensagemSelecionada = mensagensMotivacionais[indiceAleatorio];
        setMensagem(mensagemSelecionada);
        setMostrarMensagem(true);

        // Configurando um novo timer
        timerRef.current = setTimeout(() => {
            setMensagem(mensagemInicial);
            setMostrarMensagem(true);
        }, 30000); // Redefine para a mensagem inicial após 30 segundos
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
