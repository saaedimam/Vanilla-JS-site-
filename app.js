const e = React.createElement;

function Header(){
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);
  const links = [
    {href:'#about', text:'About'},
    {href:'#work', text:'Work'},
    {href:'#services', text:'Services'},
    {href:'#contact', text:'Contact'}
  ];
  return e('header', {className:'site-header'},
    e('div', {className:'container header-row'},
      e('a', {className:'brand', href:'./'},
        e('img', {src:'./favicon.png', alt:'Brand', className:'brand-mark'}),
        e('span', {className:'brand-name'}, 'Kattali Textile Ltd')
      ),
      e('nav', {className:'nav', 'aria-label':'Primary'},
        links.map(l => e('a', {key:l.href, href:l.href}, l.text))
      ),
      e('button', {
        id:'menuBtn',
        className:'icon-btn',
        type:'button',
        'aria-label': open ? 'Close menu' : 'Open menu',
        'aria-expanded': open ? 'true' : 'false',
        'aria-controls':'mobileNav',
        onClick: () => setOpen(!open)
      },
        e('span', {className:'bar'}),
        e('span', {className:'bar'}),
        e('span', {className:'bar'})
      )
    ),
    e('nav', {
      id:'mobileNav',
      className:'mobile-nav',
      hidden: !open,
      'aria-label':'Mobile'
    },
      [
        e('a', {href:'#about'}, 'About'),
        e('a', {href:'#work'}, 'Work'),
        e('a', {href:'#services'}, 'Services'),
        e('a', {href:'#contact', className:'btn btn-accent'}, 'Get Quote')
      ]
    )
  );
}

function Hero(){
  return e('section', {className:'hero'},
    e('div', {className:'container hero-inner'},
      [
        e('h1', null, [
          'Colorful, stylish, modern. ',
          e('span', {className:'badge'}, 'Vanilla JS')
        ]),
        e('p', null, 'Fast, accessible, and easy to maintain—built by Saaed Imam.'),
        e('a', {className:'btn btn-primary', href:'#work'}, 'See Work')
      ]
    )
  );
}

function Cards(){
  const cards = [
    {cls:'bg-rose', text:'Factory Floor (add image later)'},
    {cls:'bg-teal', text:'Quality Control (add image later)'},
    {cls:'bg-amber', text:'Product Collage (add image later)'}
  ];
  return e('section', {className:'section'},
    e('div', {className:'container grid'},
      cards.map(c => e('figure', {key:c.text, className:`card img-cover ${c.cls}`},
        e('figcaption', null, c.text)
      ))
    )
  );
}

function Footer(){
  const year = new Date().getFullYear();
  return e('footer', {className:'site-footer'},
    e('div', {className:'container'},
      e('p', null, [
        '© ', e('span', {id:'year'}, year.toString()), ' KTL • StitchOS — Built by Saaed Imam'
      ])
    )
  );
}

function App(){
  return e(React.Fragment, null,
    e(Header),
    e(Hero),
    e(Cards),
    e(Footer)
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(App));
