function numRandom(){
    var num = Math.random()*100;
    num = parseInt(num);
    console.log(num);
    return num;
}



function checkNum(numUser,numRandom){
    if (numUser != numRandom){
        if (numUser < numRandom){
            alert("El numero es mayor");

        }else if (numUser > numRandom){
            alert("El numero es menor");
        }
    }
}

function win(numUser,numRandom){
    if (numUser == numRandom){
        return true;
    }
}