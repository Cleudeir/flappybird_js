
console.log('Bem vindo Flappy Bird')
const sprites = new Image();
sprites.src = './sprites.png'
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

//Globais
let alternarTelas = false
let frame = 0
let count = 0
let sentido = true
let pontos = 0
let record = 0
//--

//Obejos
const score = {
    text: '', font: '20px serif', x:200, y:30,
}
const records = {
    text: ``, font: '20px serif', x:200, y:60,
}
const ceu = {
    cor:'#70c5ce', sX:0,sY:0,largura:canvas.width,altura:canvas.height
}
const person = {
    sX:0, sY:0, largura:33, altura:25, x:10, y:50, velocidade: 0,
}
const floor01 = {
    sX:0,sY:610, largura:320, altura:112, x:0, y:canvas.height-112, velocidade:1
}
const florr02 = {
    sX:0, sY:610, largura:320, altura:112, x:320, y:canvas.height-112, velocidade:1
}
const background01 = {
    sX:324, sY:520, largura:320, altura:204, x:0, y:canvas.height-204, velocidade:1
}
const background02 = {
    sX:324, sY:520, largura:320, altura:204, x:320, y:canvas.height-204, velocidade:1
}
const menu = {
    sX:134, sY:0, largura:174, altura:152, x:(canvas.width/2)-174/2, y:50
}
const pipeUP = {
    sX:52, sY:169, largura:52, altura:400, x:canvas.width, y:-360, type: 'up', colisao:0, ordem: 0
}
const pipeDown = {
    sX:0, sY:169, largura:52, altura:400, x:canvas.width, y:canvas.height-360, type: 'down', colisao:0, ordem: 0
}
const personTypeAnimation = [
    {sX:0,sY:0}, {sX:0,sY:26}, {sX:0,sY:51}
]
//Function draw
const drawText = (props)=>{
    pontos = parseInt(frame/10)
    score.text = `Pts: ${pontos}`
    ctx.font = props.font;
    ctx.fillStyle = 'white'
    ctx.fillText(props.text, props.x, props.y);
}
const drawObject =(props)=> {
    ctx.drawImage(
    sprites,
    props.sX,props.sY, //ponto inicio recorte image
    props.largura,props.altura, //tamango do recorte da image
    props.x, props.y, //ponto inicio render
    props.largura,props.altura, // area de render
    );
}
const drawMove =(props)=> {
    props.x = props.x - props.velocidade
    if(-props.x == props.largura){
    props.x = 320
    }
    ctx.drawImage(
    sprites,
    props.sX,props.sY, //ponto inicio recorte image
    props.largura,props.altura, //tamango do recorte da image
    props.x, props.y, //ponto inicio render
    props.largura,props.altura, // area de render
    );
}
const drawObstacle =(props)=> {
    const e = parseFloat(1.5 + frame/1200)
    props[0].x = parseInt(props[0].x - e)
    props[1].x = parseInt(props[1].x - e)
    let aleatorio = Math.ceil(-180*Math.random()-140)
    const render =(props)=>{
        if(parseInt(frame)==1){
            if(props.type=='up'){
                props.colisao = 400+props.y-2
                console.log('up',props.colisao)
            }
            else{
                props.colisao = props.y-20
                console.log('down',props.colisao)
            }
        }            
        if(props.x < -52){
            if(props.type=='up'){
                props.y =  aleatorio
                props.colisao = 400 + props.y-2
                console.log(props.colisao)
            }
            else{
                props.y = canvas.height + aleatorio
                props.colisao = props.y-20
                console.log(props.colisao)
            }
        }
        ctx.drawImage(
            sprites,
            props.sX,props.sY, //ponto inicio recorte image
            props.largura,props.altura, //tamango do recorte da image
            props.x, props.y, //ponto inicio render
            props.largura,props.altura, // area de render
            );
            if(props.ordem==0){
                if(props.x < -52){
                    props.x = 360
                    console.log(frame)
                }
            }
            if(props.ordem==1){
                if(props.x < -52){
                    props.x = 360
                    console.log(frame)
                }
            }        
    }
    render(props[0])
    render(props[1])
}
const drawPersonMove =(props)=> {
    if(frame%10==0){
        if(sentido == true){
            count++
        }
        else{
            count--
        }
        if(count==2){
            sentido = false
        }
        if(count==0){
            sentido = true
        }
     person.sY = personTypeAnimation[count].sY;
    }
    ctx.drawImage(
        sprites,
        props.sX,props.sY, //ponto inicio recorte image
        props.largura,props.altura, //tamango do recorte da image
        props.x, props.y, //ponto inicio render
        props.largura,props.altura, // area de render
        );
    
}
const drawColor = (props) =>{
    ctx.fillStyle = props.cor
    ctx.fillRect(props.sX,props.sY,props.largura,props.altura)
}
//-----
//Regras do Jogo
const reset = (props)=>{
if(pontos>record){
    record = pontos
    records.text = `Record: ${record}`
}
    alternarTelas = false
    person.y = 50
    person.velocidade = 0
    props[0].colisao= 0
    props[1].colisao= 0

    if(props[0].ordem===0){
        props[0].x=canvas.width
        props[1].x=canvas.width
    }
    frame = 0
}
const gravity =() =>{
    const gravidade = 0.1
    person.velocidade =  person.velocidade + gravidade
    person.y = person.y +  person.velocidade
}
const collision = (props)=>{    
    if(alternarTelas == true){
        if(person.y > canvas.height-122){
            reset(props)
        }
        console.log('colisao',props[0].colisao,props[1].colisao,person.y)
        if(props[0].x<40 && props[0].x>-30){
            if(person.y<=props[0].colisao){
                reset(props)
                console.log([props.colisao,person.y])
            }
            if(person.y>=props[1].colisao){
                reset(props)
                console.log([props.colisao,person.y])
            }
        }
    }
}
const pulo = ()=>{
    if(person.y > 20){
        person.y = person.y - 8
        person.velocidade = -2
    }   
}
window.addEventListener('click', ()=>{
    if(alternarTelas == false){
        alternarTelas=true;
        console.log('click',alternarTelas)
    }
    else{
        pulo()   
    }
})
//----  
//Telas
const homeScreen =()=>{       
    drawColor(ceu);
    drawObject(background01); drawObject(background02);
    drawObject(floor01); drawObject(florr02);
    drawObject(menu); 
}
const gamingScreen =()=>{   
    frame = frame + 1
    drawColor(ceu)
    drawMove(background01); drawMove(background02);
    drawObstacle([pipeUP,pipeDown]);
    drawMove(floor01); drawMove(florr02);
    drawText(score); drawText(records)
    drawPersonMove(person);
    collision([pipeUP,pipeDown])
    gravity()
}
//Start
const loop=()=>{    
    if(alternarTelas == false){
        homeScreen()
    }
    else{
        gamingScreen()
    }
    //Renderizar em loop
    requestAnimationFrame(loop)
}
loop()