const SEGUNDOS = 60000;
const MINUTOS = 3600000;
const HORAS = 86400000;

export const elapsedTime = (init: number, fin: number) => {
    if(!init || !fin) return "0 seg";
    const elapsedTime = fin - init;
    let elapsedTimeString = "";
    if( elapsedTime < SEGUNDOS){
        elapsedTimeString = Math.floor( elapsedTime / 1000) + " seg.";
    }
    else if( elapsedTime < MINUTOS ){
        elapsedTimeString = Math.floor( elapsedTime / 1000 / 60) + " min."
    }
    else if( elapsedTime < HORAS ){
        elapsedTimeString = Math.floor( elapsedTime / 1000 / 60 / 60) + " hrs."
    }
    else{
        const a = Math.floor( elapsedTime / 1000 / 60 / 60 / 24)
        elapsedTimeString = a > 1 ? a + " días." : a + " día."
    };
    return elapsedTimeString;
};