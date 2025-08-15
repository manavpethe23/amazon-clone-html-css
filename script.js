
// Amazon Clone - Basic Interactivity
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', () => {
    // --- Persisted cart count ---
    const CART_KEY = 'cartCount';
    const cartBadge = $('#cart-count');
    const getCount = () => parseInt(localStorage.getItem(CART_KEY) || '0', 10);
    const setCount = (n) => {
      localStorage.setItem(CART_KEY, String(n));
      if (cartBadge) cartBadge.textContent = String(n);
    };
    setCount(getCount());

    // --- Toast helper ---
    let toastTimer = null;
    const toast = (msg) => {
      const t = document.createElement('div');
      t.className = 'toast';
      t.textContent = msg;
      document.body.appendChild(t);
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        t.remove();
      }, 1800);
    };

    // --- Add to cart on "See More" click ---
    $$('.see-more').forEach((el) => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', (e) => {
        const box = el.closest('.box');
        const name = box ? $('h4', box)?.textContent?.trim() : 'Item';
        const next = getCount() + 1;
        setCount(next);
        toast(`${name} added to cart`);
      });
    });

    // --- Search filter (press Enter or click icon) ---
    const searchInput = $('.search-input');
    const searchIcon = $('.search-icon');
    const doFilter = () => {
      const term = (searchInput?.value || '').trim().toLowerCase();
      const boxes = $$('.box');
      if (!term){
        // show all
        boxes.forEach(b => b.style.display = '');
        return;
      }
      boxes.forEach((b) => {
        const title = $('h4', b)?.textContent?.toLowerCase() || '';
        b.style.display = title.includes(term) ? '' : 'none';
      });
    };
    if (searchInput){
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doFilter();
      });
    }
    if (searchIcon){
      searchIcon.addEventListener('click', doFilter);
    }

    // --- Back to top ---
    const backTop = $('.foot-panel1');
    if (backTop){
      const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
      backTop.addEventListener('click', goTop);
      backTop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goTop();
        }
      });
    }

    // --- Mobile menu toggle ---
    const menuBtn = $('.panel-icon');
    const menu = $('.panel-ops');
    if (menuBtn && menu){
      menuBtn.style.cursor = 'pointer';
      menuBtn.addEventListener('click', () => {
        menu.classList.toggle('open');
      });
      document.addEventListener('click', (e) => {
        // close if clicking outside
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)){
          menu.classList.remove('open');
        }
      });
    }
  });
})();
