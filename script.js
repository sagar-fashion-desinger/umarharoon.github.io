const menuBtn=document.querySelector('.menu-btn');const nav=document.querySelector('#navLinks');if(menuBtn){menuBtn.addEventListener('click',()=>{nav.classList.toggle('open')})}document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>{if(window.innerWidth<=900)nav.classList.remove('open')}));const galleryItems=[...document.querySelectorAll('.gallery-item')];const lightbox=document.querySelector('#galleryLightbox');const lightboxImage=document.querySelector('#lightboxImage');let currentImage=0;function showImage(index){currentImage=(index+galleryItems.length)%galleryItems.length;const item=galleryItems[currentImage];lightboxImage.src=item.dataset.full;lightboxImage.alt=item.querySelector('img').alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}galleryItems.forEach((item,index)=>item.addEventListener('click',()=>showImage(index)));document.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);document.querySelector('.lightbox-prev')?.addEventListener('click',()=>showImage(currentImage-1));document.querySelector('.lightbox-next')?.addEventListener('click',()=>showImage(currentImage+1));lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(!lightbox?.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')showImage(currentImage-1);if(e.key==='ArrowRight')showImage(currentImage+1)});
/* Category navigation and sub-category product browser */
const categoryData={
  bridal:{
    title:"Bridal Collection",
    intro:"Elegant bridal looks crafted for the moments that deserve something unforgettable.",
    subs:{
      "Bridal Dresses":[["Bridal Signature","assets/bridal.jpg.jpg","A refined bridal design with couture detailing."]],
      "Walima":[["Walima Edit","assets/bridal.jpg.jpg","Elegant silhouettes for your reception celebration."]],
      "Custom Bridal":[["Custom Bridal Couture","assets/custom.jpg.jpg","A made-to-measure bridal look created around your vision."]]
    }
  },
  formal:{
    title:"Formal Collection",
    intro:"Polished formalwear with graceful silhouettes and refined finishing.",
    subs:{
      "Formal Dresses":[["Formal Signature","assets/formal.jpg.jpg","A timeless formal look for special occasions."]],
      "Party Wear":[["Party Edit","assets/formal.jpg.jpg","Contemporary occasionwear with an elegant finish."]],
      "Evening Wear":[["Evening Edit","assets/formal.jpg.jpg","Sophisticated evening styling for memorable events."]]
    }
  },
  maxis:{
    title:"Maxis Collection",
    intro:"Flowing, feminine maxis designed for effortless elegance.",
    subs:{
      "Maxi Dresses":[["Signature Maxi","assets/maxi.jpg.jpg","A graceful maxi silhouette with statement detail."]],
      "Party Maxis":[["Party Maxi Edit","assets/maxi.jpg.jpg","An elevated maxi for celebrations and occasions."]],
      "Custom Maxis":[["Custom Maxi","assets/custom.jpg.jpg","A personalized maxi designed to your preferred style."]]
    }
  },
  shirts:{
    title:"Shirts Collection",
    intro:"Modern shirts that balance everyday ease with Sagar's signature detail.",
    subs:{
      "Designer Shirts":[["Signature Shirt","assets/shirts.jpg.jpg","A polished shirt design with refined detailing."]],
      "Formal Shirts":[["Formal Shirt Edit","assets/shirts.jpg.jpg","A sophisticated shirt for elevated occasions."]],
      "Custom Shirts":[["Custom Shirt","assets/custom.jpg.jpg","A shirt tailored around your preferred fit and finish."]]
    }
  }
};
const collectionsNav=document.querySelector('.collections-nav');
const collectionsTrigger=document.querySelector('.collections-trigger');
const collectionsMenu=document.querySelector('#collectionsMenu');
const categoryBrowser=document.querySelector('#categoryProducts');
const categoryTitle=document.querySelector('#categoryTitle');
const categoryIntro=document.querySelector('#categoryIntro');
const subcategoryTabs=document.querySelector('#subcategoryTabs');
const productGrid=document.querySelector('#productGrid');
function openCategoryBrowser(key){
  const category=categoryData[key]; if(!category)return;
  categoryTitle.textContent=category.title;
  categoryIntro.textContent=category.intro;
  subcategoryTabs.innerHTML='';
  Object.keys(category.subs).forEach((sub,index)=>{
    const tab=document.createElement('button');
    tab.type='button'; tab.className='subcategory-tab'+(index===0?' active':'');
    tab.textContent=sub; tab.addEventListener('click',()=>renderProducts(key,sub,tab));
    subcategoryTabs.appendChild(tab);
  });
  renderProducts(key,Object.keys(category.subs)[0],subcategoryTabs.firstElementChild);
  categoryBrowser.classList.add('open');
  categoryBrowser.setAttribute('aria-hidden','false');
  collectionsNav?.classList.remove('open');
  collectionsTrigger?.setAttribute('aria-expanded','false');
  categoryBrowser.scrollIntoView({behavior:'smooth',block:'start'});
}
function renderProducts(key,sub,activeTab){
  const products=categoryData[key].subs[sub]||[];
  subcategoryTabs.querySelectorAll('.subcategory-tab').forEach(t=>t.classList.remove('active'));
  activeTab?.classList.add('active');
  productGrid.innerHTML=products.map((p,i)=>'<article class="product-card"><img src="'+p[1]+'" alt="'+p[0]+'"><div class="product-info"><small>'+sub.toUpperCase()+'</small><h3>'+p[0]+'</h3><p>'+p[2]+'</p><a class="product-order" href="https://wa.me/923185484406?text=Hi%20Sagar%20Fashion%20Designer%2C%20I%27m%20interested%20in%20'+encodeURIComponent(p[0])+'.%20Please%20share%20details." target="_blank" rel="noopener noreferrer">Ask on WhatsApp <span>→</span></a></div></article>').join('');
}
collectionsTrigger?.addEventListener('click',e=>{e.stopPropagation();const open=collectionsNav.classList.toggle('open');collectionsTrigger.setAttribute('aria-expanded',String(open))});
collectionsMenu?.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>openCategoryBrowser(btn.dataset.category)));
document.querySelectorAll('.collection-card[data-category]').forEach(card=>card.addEventListener('click',e=>{e.preventDefault();openCategoryBrowser(card.dataset.category)}));
document.querySelector('.category-close')?.addEventListener('click',()=>{categoryBrowser.classList.remove('open');categoryBrowser.setAttribute('aria-hidden','true')});
document.addEventListener('click',e=>{if(collectionsNav&&!collectionsNav.contains(e.target)){collectionsNav.classList.remove('open');collectionsTrigger?.setAttribute('aria-expanded','false')}});
