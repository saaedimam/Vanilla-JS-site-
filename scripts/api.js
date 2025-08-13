(function(){
  const cfg = window.CONFIG || {};
  async function fetchNews(){
    try{
      const res = await fetch(cfg.NEWS_API_URL);
      if(!res.ok) throw new Error('Network response was not ok');
      return await res.json();
    }catch(err){
      console.error('News fetch failed', err);
      throw err;
    }
  }
  window.API = { fetchNews };
})();
