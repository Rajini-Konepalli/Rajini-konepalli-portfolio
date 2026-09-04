// TOGGLE SOCIAL ICONS

const toggleBtn = document.getElementById('toggleBtn');
const socialIcons = document.getElementById('socialIcons');

let opened = false;

toggleBtn.addEventListener('click', () => {

    if(opened === false){

        socialIcons.classList.add('active');
        toggleBtn.innerHTML = '×';
        opened = true;

    } else {

        socialIcons.classList.remove('active');
        toggleBtn.innerHTML = '+';
        opened = false;

    }

});



// CURSOR EFFECT

const cursor = document.querySelector('.cursor');
const cursorBlur = document.querySelector('.cursor-blur');

window.addEventListener('mousemove',(e)=>{

    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    cursorBlur.style.left = e.clientX + 'px';
    cursorBlur.style.top = e.clientY + 'px';

});

// SCROLL REVEAL

const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }

    });

});

const hiddenElements = document.querySelectorAll('.card, .project-box');

hiddenElements.forEach((el)=> observer.observe(el));

// THREE JS 3D BACKGROUND

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
alpha:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

document.getElementById('bg-animation')
.appendChild(renderer.domElement);

const particlesGeometry = new THREE.BufferGeometry();

const particlesCount = 3000;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++){

    posArray[i] = (Math.random() - 0.5) * 15;

}

particlesGeometry.setAttribute(
'position',
new THREE.BufferAttribute(posArray,3)
);

const particlesMaterial = new THREE.PointsMaterial({
size:0.02,
color:'#2563eb'
});

const particlesMesh = new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particlesMesh);

camera.position.z = 5;

function animate(){

    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.0008;
    particlesMesh.rotation.x += 0.0003;

    renderer.render(scene,camera);

}

animate();

window.addEventListener('resize',()=>{

    renderer.setSize(window.innerWidth,window.innerHeight);

    camera.aspect =
    window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

});




const cards = document.querySelectorAll('.card, .project-box');

cards.forEach((card)=>{

    card.addEventListener('mousemove',(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 18;
        const rotateY = (x - rect.width / 2) / 18;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)`;

    });

    card.addEventListener('mouseleave',()=>{

        card.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';

    });

});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll',()=>{

    let current = '';

    sections.forEach((section)=>{

        const sectionTop = section.offsetTop;

        if(pageYOffset >= sectionTop - 200){
            current = section.getAttribute('id');
        }

    });

    navLinks.forEach((link)=>{

        link.classList.remove('active');

        if(link.getAttribute('href') === '#' + current){
            link.classList.add('active');
        }

    });

});