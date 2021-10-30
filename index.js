const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const start = () => {
    reader.question('Qual a altura (em linhas) da sua ampulheta? (Mínimo 21) ', (heigthString) => {
        const size = parseInt(heigthString);
    
        if(size >= 21) {
            return renderHourglass(size);
        }
        
        console.error("Você inseriu um valor inválido para este desenho :(")
    
        start();
    });
}

const renderHourglass = (size, step = 0) => {
    const baseTopHeight = 1;

    const glassHeight = size - (baseTopHeight * 2);

    const steps = Math.ceil(glassHeight / 2);

    const baseTop = renderBaseTop(size, baseTopHeight);

    const hourGlass = renderGlass(size, glassHeight, step);

    // render complete hourglass
    console.clear();
    console.log(`${baseTop}${hourGlass}${baseTop}`);

    // animated hourglass
    if(step < steps) {
        return setTimeout(() => {
            renderHourglass(size, step + 1);
        }, 250);
    }

    start();
}

const renderGlass = (size, height, step = 0) => {

    let line = height -2;

    let hourglasString = ``;
    
    for(let counter = 0; counter < height; counter++, line -=2) {
        let isFilled = false;

        if( (counter >= step && line > 0) ||
            ((height - counter) <= step && line < 0)
        ) isFilled = true;
        
        let lineString = renderGlassLine(size, line, isFilled);

        hourglasString = `${hourglasString}${lineString}\n`;
    }

    return hourglasString;
}

const renderGlassLine = (hourglassSize, glassSize, filled = false) => {
    let stringLine = "";

    let airArea = ((hourglassSize - Math.abs(glassSize) - 2) / 2);

    if(glassSize < 0) airArea += 1;
    
    for(var character = 0; character <= hourglassSize; character++){

        const isBorder = (character == (airArea)) || character == (hourglassSize - airArea -1);

        const isGlass = (character >= (airArea + 1)) && (character <= (hourglassSize - airArea -2));
        
        const isStick = character == 0 || character == (hourglassSize -1);

        stringLine = `${stringLine}${(isBorder || isStick || (isGlass && filled)) ? '#' : ' '}`;
    }

    return stringLine;
}

const renderBaseTop = (size, height) => {
    let lineString = ``;

    for(let line = 0; line < height; line++){
        lineString = `${lineString}${"#".repeat(size)}\n`
    }

    return lineString
} 


start();