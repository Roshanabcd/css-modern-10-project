const c = document.querySelector('#c');
const ctx = c.getContext('2d');

const dpr = Math.min(2, window.devicePixelRatio);

c.width = window.innerWidth * dpr;
c.height = window.innerHeight * dpr;

c.style.imageRendering = 'pixelated';
c.style.width = '100vw';
c.style.height = '100vh';

const palette = [
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0',
]

const points = []

const createPoint = (x, y, color) => ({
  x, y, color
})

for (let i = 0; i < 500; i++) {
    points.push(createPoint(
      Math.random() * c.width,
      Math.random() * c.height,
      Math.floor(Math.random() * palette.length) % palette.length
    ))
}

const mouse = { x: c.width / 2, y: c.height / 2 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function getAngle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  const theta = Math.atan2(dy, dx); // range (-PI, PI]
  return theta;
}

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, c.width, c.height)

const drawWind = (time) => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, c.width, c.height)
  
  const cx = c.width / 2
  const cy = c.height / 2
  
  for (let i = 0; i < points.length; i++) {
    const point = points[i]
    const p = i / points.length
    const mx = (mouse.x * dpr) + Math.cos(p * Math.PI * 2) * 50
    const my = (mouse.y * dpr) + Math.sin(p * Math.PI * 2) * 50
    
    const mouseAngle = getAngle(point.x, point.y, mx, my) - Math.PI / 2
    
    const angle = mouseAngle + (Math.sin((i * 100 + time) / 1000) * i / 500)
    
    ctx.fillStyle = palette[point.color]
    ctx.fillStyle = palette[Math.floor((angle * 3) + (i / 10)) % palette.length] + '33'
    
    for (let p = 5; p > 0; p-=0.5) {
      ctx.beginPath()
      ctx.arc(point.x, point.y, p, 0, Math.PI * 2)
      ctx.fill()
      
      point.x = (point.x + Math.cos(angle) * 3)
    
      if (point.x > c.width) {
        point.x = 0
      } else if (point.x < 0) {
        point.x = c.width
      }

      point.y = (point.y + Math.sin(angle) * 3)

      if (point.y > c.height) {
        point.y = 0
      } else if (point.y < 0) {
        point.y = c.height
      }
    }
    
    point.x = (point.x - Math.cos(angle) * 20)
    
      if (point.x > c.width) {
        point.x = 0
      } else if (point.x < 0) {
        point.x = c.width
      }

      point.y = (point.y - Math.sin(angle) * 20)

      if (point.y > c.height) {
        point.y = 0
      } else if (point.y < 0) {
        point.y = c.height
      }
  }
}

const animate = (time) => {
  requestAnimationFrame(animate);
  
  drawWind(time)
}

window.addEventListener('resize', () => {
  c.width = window.innerWidth * dpr;
  c.height = window.innerHeight * dpr;
})

animate(0);