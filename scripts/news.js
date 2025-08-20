(function(){
  async function loadNews(){
    const list = document.getElementById('news-list');
    if(!list) return;
    list.innerHTML = '<li class="card">Loading…</li>';
    try{
      const posts = await window.API.fetchNews();
      list.innerHTML = '';
      posts.forEach(p => {
        const li = document.createElement('li');
        li.className = 'card reveal';
        const h3 = document.createElement('h3');
        h3.textContent = p.title;
        const para = document.createElement('p');
        para.textContent = p.body;
        li.appendChild(h3);
        li.appendChild(para);
        list.appendChild(li);
      });
      if(window.KTL && typeof KTL.observeReveals === 'function'){
        KTL.observeReveals();
      }
    }catch(err){
      list.innerHTML = '<li class="card">Failed to load news.</li>';
    }
  }
  window.KTL = Object.assign(window.KTL || {}, { loadNews });
})();
