// main.js

// ====== Navigation ======
const startBtn = document.getElementById('startBtn');
if(startBtn){
  startBtn.addEventListener('click', ()=> window.location.href='problem.html');
}

// ====== Problem Form Submission ======
const problemForm = document.getElementById('problemForm');
if(problemForm){
  problemForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const name = encodeURIComponent(document.getElementById('name').value);
    const email = encodeURIComponent(document.getElementById('email').value);
    const problem = encodeURIComponent(document.getElementById('problem').value);

    // AI Book Recommendation
    const recommendation = getAIRecommendation(decodeURIComponent(problem));

    // Show loading message
    const resultDiv = document.getElementById('result');
    if(resultDiv){
      resultDiv.innerHTML = '<div class="loading">Analyzing your problem and finding perfect book...</div>';
    }

    // Build URL parameters
    const params = new URLSearchParams({
      name: name,
      email: email,
      problem: problem,
      bookTitle: recommendation.title,
      bookAuthor: recommendation.author,
      bookReason: recommendation.reason,
      bookPrice: recommendation.price
    });

    // Redirect to checkout page with parameters
    window.location.href = `checkout.html?${params.toString()}`;
  });
}

// ====== AI Book Recommendation Function ======
function getAIRecommendation(problem) {
  const problemLower = problem.toLowerCase();
  const recommendations = [
    { title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", reason: "Perfect for developing structured habits and personal effectiveness", price: 24.99 },
    { title: "Atomic Habits", author: "James Clear", reason: "Ideal for building small, consistent changes that lead to big results", price: 19.99 },
    { title: "Mindset: The New Psychology of Success", author: "Carol Dweck", reason: "Excellent for transforming your approach to challenges and learning", price: 22.99 },
    { title: "Deep Work", author: "Cal Newport", reason: "Perfect for improving focus and productivity in a distracted world", price: 21.99 },
    { title: "The Power of Habit", author: "Charles Duhigg", reason: "Great for understanding and changing behavioral patterns", price: 20.99 }
  ];

  if (problemLower.includes('procrastinat') || problemLower.includes('focus') || problemLower.includes('productiv')) {
    return recommendations[1]; // Atomic Habits
  } else if (problemLower.includes('habit') || problemLower.includes('routine') || problemLower.includes('discipline')) {
    return recommendations[0]; // 7 Habits
  } else if (problemLower.includes('mindset') || problemLower.includes('thinking') || problemLower.includes('belief')) {
    return recommendations[2]; // Mindset
  } else if (problemLower.includes('deep work') || problemLower.includes('concentrat') || problemLower.includes('distract')) {
    return recommendations[3]; // Deep Work
  } else {
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  }
}

// ====== Tabs Indicator ======
const tabs = document.querySelectorAll('.tab-link');
const indicator = document.querySelector('.tab-indicator');

function updateIndicator(targetTab) {
  if (!targetTab || !indicator) return;
  const tabRect = targetTab.getBoundingClientRect();
  const parentRect = targetTab.parentElement.getBoundingClientRect();
  indicator.style.width = `${tabRect.width}px`;
  indicator.style.transform = `translateX(${tabRect.left - parentRect.left}px)`;
}

tabs.forEach(tab => {
  tab.addEventListener('mouseenter', () => updateIndicator(tab));
  tab.addEventListener('mouseleave', () => {
    const activeTab = document.querySelector('.tab-link.active') || document.querySelector('.tab-link');
    updateIndicator(activeTab);
  });
});

window.addEventListener('load', () => {
  const activeTab = document.querySelector('.tab-link.active') || document.querySelector('.tab-link');
  updateIndicator(activeTab);
});

window.addEventListener('resize', () => {
  const activeTab = document.querySelector('.tab-link.active') || document.querySelector('.tab-link');
  updateIndicator(activeTab);
});

// ====== Hero Box Glow Animation ======
const heroBox = document.querySelector('.hero-box');
if(heroBox){
  setInterval(()=>{
    heroBox.style.boxShadow = `0 0 30px rgba(106,92,255,0.7),0 0 50px rgba(0,212,255,0.7)`;
  }, 200);
}

// ====== Particle Background ======
const canvas = document.getElementById('particles');
if(canvas){
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particlesArray = [];
  class Particle{
    constructor(){
      this.x = Math.random()*canvas.width;
      this.y = Math.random()*canvas.height;
      this.size = Math.random()*3+1;
      this.speedX = Math.random()*1-0.5;
      this.speedY = Math.random()*1-0.5;
    }
    update(){ this.x+=this.speedX; this.y+=this.speedY; this.edges(); }
    edges(){ 
      if(this.x>canvas.width) this.x=0;
      if(this.x<0) this.x=canvas.width;
      if(this.y>canvas.height) this.y=0;
      if(this.y<0) this.y=canvas.height;
    }
    draw(){
      ctx.fillStyle = '#6a5cff';
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fill();
    }
  }

  for(let i=0;i<100;i++) particlesArray.push(new Particle());

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(animate);
  }
  animate();
}

window.addEventListener('load', ()=> document.body.classList.add('loaded'));

// ====== Checkout Page Data Loading ======
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);

  const name = urlParams.get('name');
  const email = decodeURIComponent(urlParams.get('email') || '');
  const problem = decodeURIComponent(urlParams.get('problem') || '');
  const bookTitle = decodeURIComponent(urlParams.get('bookTitle') || '');
  const bookAuthor = decodeURIComponent(urlParams.get('bookAuthor') || '');
  const bookReason = decodeURIComponent(urlParams.get('bookReason') || '');
  const bookPrice = urlParams.get('bookPrice');

  const userNameEl = document.getElementById('userName');
  const userEmailEl = document.getElementById('userEmail');
  const problemTextEl = document.getElementById('problemText');
  const recommendedBookEl = document.getElementById('recommendedBook');
  const protocolPriceEl = document.getElementById('protocolPrice');

  if(userNameEl) userNameEl.textContent = name;
  if(userEmailEl) userEmailEl.textContent = email;
  if(problemTextEl) problemTextEl.textContent = problem;
  if(recommendedBookEl) recommendedBookEl.innerHTML = `
    <h3>${bookTitle}</h3>
    <p class="author">by ${bookAuthor}</p>
    <p class="reason">${bookReason}</p>
    <p class="price">$${bookPrice}</p>
  `;
  if(protocolPriceEl) protocolPriceEl.textContent = `$${(parseFloat(bookPrice) + 25).toFixed(2)}`;
});

// ====== Complete Purchase Function ======
function completePurchase() {
  // Get the total amount from the checkout page
  const protocolPriceEl = document.getElementById('protocolPrice');
  const totalAmount = protocolPriceEl ? parseFloat(protocolPriceEl.textContent.replace('$', '')) : 52.98;
  
  // Redirect to payment page with price parameter
  window.location.href = `payment.html?price=${totalAmount.toFixed(2)}`;
}