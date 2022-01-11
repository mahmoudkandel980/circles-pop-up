let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d')

let mouse = {
    x: undefined,
    y: undefined
}
let maxRadius = 40;
let minRadius = 1 + Math.random() * 5;

let colorAray = ['#F2F2F2', '#BFBFBF', '#8C8C8C', '#595959', '#404040', '#6E7474',
    '#DCDEDA', '#08171C', '#4B5663', '#3F5358', '#474544', '#E1DBD9', '#C7BFBD',
    '#4D4B4A', '#918C8A', '#555C6C', '#2C393F', '#142020', '#CCCCC0', '#E7F0F2',
    '#A6A6A6', '#262626', '#F2F2F2', '#8C8C8C', '#595959', '#B3B3B3', '#737373',
    '#FFFFFF'];

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorAray[Math.ceil(Math.random() * colorAray.length)]

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            c.strokeStyle = `white`;
            c.stroke();
            c.fill()
            c.fillStyle = this.color;
        };
        this.update = function () {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
                mouse.y - this.y < 50 && mouse.y - this.y > -50
                && this.radius < maxRadius) {
                this.radius += 1
            } else if (this.radius > this.minRadius) {
                this.radius -= 1
            }
            this.draw()
        };
    }
}

let circleArray = [];


function init() {
    circleArray.length = 0

    for (let i = 0; i < innerWidth; i++) {
        let radius = 5 * Math.random() + 1;
        let x = Math.random() * (innerWidth - 2 * radius) + radius;
        let y = Math.random() * (innerHeight - 2 * radius) + radius;
        let dx = 2 * (Math.random() - 0.5);
        let dy = 2 * (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(1, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}

init()
animate();