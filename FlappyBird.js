
//kaboom()

//kaboom({global:true, background:black})
loadSprite('bean', 'bird.png')
loadSprite('pipe','pipe.jpeg')

setGravity(600)

let highscore=0

scene('game',()=>{

let player = add([
  scale(0.2),
  sprite('bean'),
  pos(50, width()/2),
  area(),
  body(),
  'player'
  //solid()
  ])
//bean.jump()
onClick(() => {
  player.jump(300)
  //addKaboom(mousePos())
})

function randompipe(){
  offset=rand(100,-100)
  add([
    sprite('pipe'),
    body({isStatic:true}),
    area(),
    'pipe',
 
    pos(width()-20,height()/2+offset+200),
    {passed:false}
    ])
  add([
    sprite('pipe'),
    body({isStatic:true}),
    area(),
    pos(width()-20,-(-offset+200)),
    'pipe',
    
    ])
}

onUpdate('pipe', (pipe) =>{
  pipe.move(-160,0)
if (score>=highscore){
    highscore=score}
  //passed = false
  
  if (pipe.passed==false && player.pos.x>pipe.pos.x){
    //go('gameover')
    pipe.passed=true
    score+=1
    scoretext.text=score
  };
  if (player.pos.y>=height()-5 || player.pos.y<=3) {
    
    go('gameover',score,highscore)
  } 
});

loop(1.5, ()=>{
  randompipe()
})

let score=0

const scoretext=add([
  text(score),
  pos(width()/5,100)])
//randompipe()

player.onCollide('pipe',() =>{
  go('gameover',score,highscore)
})
  
})

scene('gameover', (score,highscore)=>{
  
  
  add([
    text('Game over\n'+'Score '+score +'\n'+'Highscore '+highscore)])
  onClick(()=>{
    
    go('game')
  })
})
go('game')
