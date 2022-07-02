
//entradas
let boton = document.getElementById('boton');
let byte1 = document.getElementById('byte1');
let byte2 = document.getElementById('byte2');
let byte3 = document.getElementById('byte3');
let byte4 = document.getElementById('byte4');
let byte5 = document.getElementById('byte5');
//respuestas
let red = document.getElementById("red");
let subred = document.getElementById("subred");
let broadcast = document.getElementById("broadcast");
let primerip = document.getElementById("primeraip");
let ultimoip = document.getElementById("ultimaip");
let direciiones = document.getElementById("ipdisponibles");
//adicionales

let bitsclase = 0
let clase ="";
let mascaradered = []

const  binario = (numero) => {
    let bin = (numero%2).toString(); //12
    while (numero > 1) { //1
        numero = parseInt(numero /2) //3
        bin =  (numero%2).toString() + (bin)
    };

    if (bin.length < 8) {
        
        let tamaño = bin.length
        for (let index = 0; index < 8-tamaño; index++) {
            bin = "0"+ bin  
        }
    }

    return bin
}

const decimal = (binario) =>{
    let arr = [...binario]
    let result = 0
    for (let index = 0; index < arr.length; index++) {
        result += Math.pow(2, arr.length-(index+1))* arr[index]
     }
    return parseInt(result)

}

const conjuncion = (byte1,byte2,octal,modo) =>{
    let array1 = [...byte1]
    let array2 = []
    let array3 = []
    //convertimos el quinto byte en binario

        for (let index = 0; index < parseInt(byte2); index++) {
            array2.push('1')  
        }
        
        for (let index = 0; index < 32-parseInt(byte2); index++) {
            array2.push('0')  
        }
        mascaradered = array2
    let res = ""
      
    switch (octal) {
        case 1:
            array3 = array2.slice(0,8);
            break;
        case 2:
            array3 = array2.slice(8,16);
            break;
        case 3:
            array3 = array2.slice(16,24);
            break;
        case 4:
            array3 = array2.slice(24,32);
            break;
    }

    //ejecución del modo
    switch (modo) {
        case 1:
            for (let index = 0; index < 8; index++) {
                if (array1[index]===array3[index] && array1[index]=="1") {
                    res = res + 1
                }else {
                    res = res + 0
                }
            }
        break;

        case 2:
            for (let index = 0; index < 8; index++) {

                if (array3[index]=="0") {
                    res = res + 1
                }else {
                    res = res + array1[index]
                }
            }
           
        break;

    }


    return res
}

const fsubred = (bits) =>{
    
 switch (bits) {
    case 8:
        subred.value = decimal(conjuncion(binario(byte1.value),byte5.value,1,1)) +"."+ decimal(conjuncion(binario(byte2.value),byte5.value,2,1)) + "." + decimal(conjuncion(binario(byte3.value),byte5.value,3,1)) + "." + decimal(conjuncion(binario(byte4.value),byte5.value,4,1))
        break;
     case 16:
        subred.value = decimal(conjuncion(binario(byte1.value),byte5.value,1,1)) +"."+ decimal(conjuncion(binario(byte2.value),byte5.value,2,1)) + "." + decimal(conjuncion(binario(byte3.value),byte5.value,3,1)) + "." + decimal(conjuncion(binario(byte4.value),byte5.value,4,1))
        break;
    case 24:
        subred.value = decimal(conjuncion(binario(byte1.value),byte5.value,1,1)) +"."+ decimal(conjuncion(binario(byte2.value),byte5.value,2,1)) + "." + decimal(conjuncion(binario(byte3.value),byte5.value,3,1)) + "." + decimal(conjuncion(binario(byte4.value),byte5.value,4,1))
        break;

}
}

const fbroadcast = (bits) =>{
    let difbits = parseInt(byte5.value)-bits
    let result = 0;
    // con clase

        switch (bits) {
            case 8:
                broadcast.value = decimal(conjuncion(binario(byte1.value),byte5.value,1,2)) +"."+ decimal(conjuncion(binario(byte2.value),byte5.value,2,2)) + "." + decimal(conjuncion(binario(byte3.value),byte5.value,3,2)) + "." + decimal(conjuncion(binario(byte4.value),byte5.value,4,2))
                break;
             case 16:
                broadcast.value = decimal(conjuncion(binario(byte1.value),byte5.value,1,2)) +"."+ decimal(conjuncion(binario(byte2.value),byte5.value,2,2)) + "." + decimal(conjuncion(binario(byte3.value),byte5.value,3,2)) + "." + decimal(conjuncion(binario(byte4.value),byte5.value,4,2))
                break;
            case 24:
                broadcast.value = decimal(conjuncion(binario(byte1.value),byte5.value,1,2)) +"."+ decimal(conjuncion(binario(byte2.value),byte5.value,2,2)) + "." + decimal(conjuncion(binario(byte3.value),byte5.value,3,2)) + "." + decimal(conjuncion(binario(byte4.value),byte5.value,4,2))
                break;
    
        }

}

const primeraip = () =>{

    let arr = subred.value.split(".")
    let res = "";
    arr[3]= parseInt(arr[3])+1
    for (let index = 0; index < 4; index++) {
        if (index===3) {
            res = res + arr[index] 
        } else {
            res = res + arr[index] + "."
        }
        
    }
    primerip.value = res;
}

const ultimaip = () =>{

    let arr = broadcast.value.split(".")
    let res = "";
    arr[3]= parseInt(arr[3])-1
    for (let index = 0; index < 4; index++) {
        if (index===3) {
            res = res + arr[index] 
        } else {
            res = res + arr[index] + "."
        }
        
    }
    ultimoip.value = res;
}

const direccionesdisponibles =()=>{

    let res = 0;
    for (let index = 0; index < mascaradered.length; index++) {
        if (mascaradered[index]==='0') {
            res ++
        }
    }
    direciiones.value = (Math.pow(2,res))-2;

}

boton.addEventListener("click",(e)=>{
    if(byte1.value ==="" || byte2.value ==="" || byte3.value ==="" || byte4.value ==="" || byte5.value ===""  ){
        return alert("Llene todos los datos pimero");
    }
    if (parseInt(byte5.value) >30 || parseInt(byte5.value) <1 ) {
        byte5.value='20';
        return alert("El prefijo de red debe ser menor a 30 y mayor a 1");
    }

    let primeros8 = parseInt(byte1.value)

    if (primeros8<128) {
        bitsclase=8;
        clase = byte1.value + ".0.0.0 / clase A"
    }
    if (primeros8>127 && primeros8<192) {
        bitsclase=16;
        clase = byte1.value + "." + byte2.value + ".0.0 / clase B"
    }
    if (primeros8>191) {
        bitsclase=24;
        clase = byte1.value + "." + byte2.value + "."+byte3.value+ ".0 / clase C"
    }
    red.value=clase
    fsubred(bitsclase)
    fbroadcast(bitsclase)
    primeraip();
    ultimaip();
    direccionesdisponibles();
})



