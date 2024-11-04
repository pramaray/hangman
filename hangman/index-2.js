const getData = async () => {
    const wordSize = Math.floor(Math.random() * 5 + 5);
    const url = `https://random-word-api.herokuapp.com/word?length=${wordSize}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        const word = json[0];
        console.log(word)

        Array.from(word).forEach((letter) => {
            document.getElementById('rec2').innerHTML += getLetterHTMLString(letter.toUpperCase());
        })        
    } catch (error) {
        console.error(error.message);
    }
}

const getLetterHTMLString = (letter) => {
    return (
        `<div class="letter-container letter-container-${letter}">
            <div class="letter hidden letter-${letter}">${letter}</div>
            <div class="blank">_</div>
        </div>`
    )     
}

const handleKeyInput = (key) => {
    const letters = Array.from(document.getElementsByClassName(`letter-${key}`))
    if (letters.length === 0) {
        console.log('WRONG GUESS!');
        Array.from(document.getElementsByClassName('blank')).forEach(blank => {
            blank.classList.add('red');
            setTimeout(() => {
                blank.classList.remove('red');
            }, 1000)
        })
        document.getElementById(key).classList.add('guessed');
        document.getElementById(key).classList.add('red');
    } else {
        console.log('CORRECT GUESS!');
        letters.forEach(letter => letter.classList.remove('hidden'));
        
        Array.from(document.getElementsByClassName(`letter-container-${key}`)).forEach(letterContainer => {
            letterContainer.classList.add('green');
            setTimeout(() => {
                letterContainer.classList.remove('green');
            }, 1000)
            document.getElementById(key).classList.add('guessed');
            document.getElementById(key).classList.add('green');
        })

        if ((Array.from(document.getElementsByClassName('hidden'))).length === 0) {
            console.log("WIN!");
            Array.from(document.getElementsByClassName('letter-container')).forEach(blank => {
                blank.classList.add('win-green');
            })
            document.removeEventListener("keydown", handleKeydown);
            Array.from(document.getElementsByClassName("key")).forEach(key => {
                key.removeEventListener("click", key.f);
            })
        }
    }
}

const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    if (key >= 'A' && key <= 'Z') {
        handleKeyInput(key);
    } else {
        console.log('NOT_LETTER');
    }
};

Array.from(document.getElementsByClassName("key")).forEach(key => {
    key.addEventListener("click", key.f = () => {handleKeyInput(key.id)});
})

document.addEventListener("keydown", handleKeydown);
getData();