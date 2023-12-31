const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d'); ;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// ctx.fillStyle ='red';
console.log(ctx);
const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
gradient.addColorStop(0,'white');
gradient.addColorStop(0.5,'blue');
gradient.addColorStop(1,'magenta');
ctx.fillStyle = gradient;

class Particle{
    constructor(effect){
        this.effect = effect;
        this.radius=15;
        this.x = this.radius + Math.random()*(this.effect.width-this.radius*2);
        this.y = this.radius + Math.random()*(this.effect.height-this.radius*2);
        this.vx = Math.random()*4-2;
        this.vy = Math.random()*4-2;
        
    }
    draw(context){
        context.fillStyle='hsl('+this.x*0.5+',100%,50%)';
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI*2);
        context.fill();
        context.stroke();
    }
    update(){
        this.x += this.vx;
        if(this.x>this.effect.width-this.radius||this.x<this.radius)this.vx*=-1
        this.y+=this.vy;
        if(this.y>this.effect.height-this.radius||this.y<this.radius)this.vy*=-1
    }

}

class Effect{
    
    createParticles(){
            for(let i=0;i<this.numofparticles;i++){
                this.particles.push(new Particle(this));
            }
        }
        constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles=[];
        this.numofparticles = 200;
        this.createParticles();
    }
    handleParticles(context){
        this.particles.forEach(particle=>{
            particle.draw(context);
            particle.update();
        });

    }
    


}
const effect= new Effect(canvas);
// console.log(effect);


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();