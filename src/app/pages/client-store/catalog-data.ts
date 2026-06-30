export interface Slide {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly tag: string;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly image: string;
  readonly price: number;
  readonly oldPrice?: number;
  readonly rating: number;
  readonly description: string;
  readonly specs: readonly string[];
}

export interface CartItem extends Product {
  readonly quantity: number;
}

export interface CategoryLink {
  readonly label: string;
  readonly route: string;
  readonly category: string;
  readonly badge?: 'SALE' | 'NEW';
}

export const CATEGORY_LINKS: readonly CategoryLink[] = [
  { label: 'Tazas', route: '/categorias/tazas', category: 'Tazas Personalizadas' },
  { label: 'Camisetas', route: '/categorias/camisetas', category: 'Camisetas del Mundial' },
  { label: 'Futbol Sublimado', route: '/categorias/uniformes-futbol', category: 'Uniformes Completos de Futbol', badge: 'SALE' },
  { label: 'Calentadores', route: '/categorias/calentadores', category: 'Calentadores Personalizados', badge: 'NEW' },
] as const;

export const SLIDES: readonly Slide[] = [
  { title: 'Camisetas personalizadas', description: 'Nombre, numero y estilo listo para vivir cada partido.', image: 'assets/danizz-camiseta-argentina.png', tag: 'Deportiva' },
  { title: 'Tazas sublimadas', description: 'Recuerdos, fotos y personajes favoritos impresos con color intenso.', image: 'assets/danizz-taza-foto.png', tag: 'Regalos' },
  { title: 'Uniformes deportivos', description: 'Conjuntos completos para clubes, equipos barriales y academias.', image: 'assets/danizz-uniforme-futbol.png', tag: 'Equipo' },
  { title: 'Calentadores personalizados', description: 'Prendas comodas, resistentes y preparadas para tu identidad.', image: 'assets/danizz-calentador.png', tag: 'Coleccion' },
  { title: 'Productos promocionales', description: 'Termos, detalles y articulos corporativos para destacar tu marca.', image: 'assets/danizz-termo-personalizado.png', tag: 'Marca' },
];

export const PRODUCTS: readonly Product[] = [
  { id: 'p1', name: 'Camiseta Argentina personalizada', category: 'Camisetas del Mundial', image: 'assets/danizz-camiseta-argentina.png', price: 22, oldPrice: 27.5, rating: 4.9, description: 'Camiseta celeste y blanca con nombre, numero y estilo mundialista.', specs: ['Tela deportiva dry fit', 'Nombre y numero incluidos', 'Acabado sublimado', 'Tallas S a XL'] },
  { id: 'p7', name: 'Camiseta Ecuador amarilla', category: 'Camisetas del Mundial', image: 'assets/danizz-camiseta-ecuador-amarilla.png', price: 21.5, oldPrice: 26, rating: 4.8, description: 'Jersey amarillo de seleccion con patrones sutiles y personalizacion.', specs: ['Tela ligera deportiva', 'Numero frontal o posterior', 'Nombre incluido', 'Secado rapido'] },
  { id: 'p8', name: 'Camiseta Ecuador azul', category: 'Camisetas del Mundial', image: 'assets/danizz-camiseta-ecuador-azul.png', price: 21.5, rating: 4.8, description: 'Camiseta azul de seleccion con textura grafica y acabado premium.', specs: ['Diseno de seleccion', 'Logo o escudo personalizado', 'Tallas juveniles y adulto', 'Sublimacion total'] },
  { id: 'p9', name: 'Camiseta Francia azul', category: 'Camisetas del Mundial', image: 'assets/danizz-camiseta-francia.png', price: 23, rating: 4.7, description: 'Camiseta azul tipo polo deportivo con detalles de seleccion.', specs: ['Cuello tipo polo', 'Tela respirable', 'Nombre opcional', 'Acabado de alta definicion'] },
  { id: 'p20', name: 'Camiseta Brasil amarilla', category: 'Camisetas del Mundial', image: 'assets/danizz-camiseta-brasil.png', price: 22.5, oldPrice: 28, rating: 4.9, description: 'Camiseta amarilla inspirada en Brasil lista para personalizar.', specs: ['Color amarillo intenso', 'Numero a eleccion', 'Nombre incluido', 'Tela deportiva'] },
  { id: 'p21', name: 'Camiseta Portugal negra', category: 'Camisetas del Mundial', image: 'assets/danizz-camiseta-portugal.png', price: 24, oldPrice: 29.99, rating: 4.9, description: 'Camiseta negra con vista frontal y posterior para nombre y dorsal.', specs: ['Vista frontal y posterior', 'Dorsal personalizado', 'Detalles dorados', 'Ideal para hinchas'] },
  { id: 'p2', name: 'Uniforme completo de futbol', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-uniforme-futbol.png', price: 32.5, oldPrice: 39.99, rating: 4.8, description: 'Camiseta y short sublimados para equipos completos.', specs: ['Camiseta + short', 'Escudo y sponsors', 'Tela respirable', 'Pedidos por equipo'] },
  { id: 'p12', name: 'Uniforme premium con patrocinadores', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-camiseta-mundial.png', price: 36.99, oldPrice: 44, rating: 4.9, description: 'Uniforme completo con espacios para logos de sponsors y numeracion.', specs: ['Sublimacion completa', 'Logos incluidos', 'Numeracion por jugador', 'Diseno profesional'] },
  { id: 'p27', name: 'Uniforme sublimado beige infantil', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-uniforme-bugs-beige.png', price: 31.99, rating: 4.8, description: 'Kit beige con short negro, medias y arte animado para equipos infantiles.', specs: ['Camiseta + short + medias', 'Nombre y numero', 'Arte sublimado', 'Tallas infantiles'] },
  { id: 'p28', name: 'Uniforme Brasil grafico', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-uniforme-brasil-cristo.png', price: 34.5, oldPrice: 39.99, rating: 4.9, description: 'Conjunto gris y negro con ilustracion de Brasil, short a juego y numero destacado.', specs: ['Camiseta + short', 'Grafica completa', 'Numero incluido', 'Tela deportiva'] },
  { id: 'p29', name: 'Uniforme negro dorado premium', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-uniforme-negro-dorado.png', price: 36.99, rating: 4.9, description: 'Uniforme negro con detalles dorados, escudo aplicado y acabado elegante.', specs: ['Camiseta + short', 'Detalles dorados', 'Escudo personalizado', 'Acabado premium'] },
  { id: 'p30', name: 'Uniforme blanco azul geometrico', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-uniforme-blanco-azul.png', price: 30.5, rating: 4.7, description: 'Conjunto blanco con figuras azules, numeracion frontal y short sublimado.', specs: ['Camiseta + short', 'Patron geometrico', 'Numeracion incluida', 'Tela ligera'] },
  { id: 'p31', name: 'Uniforme gris rayado sublimado', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-uniforme-rayado-gris.png', price: 32.99, rating: 4.8, description: 'Uniforme gris con franjas negras, diseno de club y short coordinado.', specs: ['Camiseta + short', 'Franjas sublimadas', 'Logo del equipo', 'Pedido por tallas'] },
  { id: 'p3', name: 'Calentador deportivo personalizado', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador.png', price: 45, rating: 4.7, description: 'Chaqueta y pantalon con diseno de club o marca.', specs: ['Chaqueta con cierre', 'Pantalon deportivo', 'Personalizacion lateral', 'Ideal para clubes'] },
  { id: 'p32', name: 'Calentador negro con rojo', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador-negro-rojo.png', price: 46.5, rating: 4.8, description: 'Conjunto negro con paneles rojos en chaqueta y pantalon para entrenamiento diario.', specs: ['Chaqueta con capucha', 'Pantalon jogger', 'Detalles rojos', 'Tela comoda'] },
  { id: 'p33', name: 'Calentador verde deportivo', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador-verde-negro.png', price: 47.99, oldPrice: 54, rating: 4.8, description: 'Calentador negro y verde con cierre frontal y pantalon coordinado.', specs: ['Chaqueta deportiva', 'Pantalon con franja', 'Colores de equipo', 'Ideal para clubes'] },
  { id: 'p34', name: 'Calentador negro con blanco', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador-negro-blanco.png', price: 49.5, rating: 4.9, description: 'Conjunto negro con cortes blancos y lineas reflectivas para un estilo moderno.', specs: ['Cierre completo', 'Lineas laterales', 'Bolsillos funcionales', 'Uso deportivo'] },
  { id: 'p35', name: 'Calentador negro con naranja', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador-negro-naranja.png', price: 48.75, rating: 4.7, description: 'Set negro con acentos naranja y gris, pensado para presentacion o viaje.', specs: ['Chaqueta + pantalon', 'Detalles en mangas', 'Bolsillos con cierre', 'Acabado elegante'] },
  { id: 'p36', name: 'Calentador negro minimal', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador-negro-minimal.png', price: 50.25, oldPrice: 58, rating: 4.9, description: 'Calentador negro minimalista con marcas blancas y pantalon de corte moderno.', specs: ['Diseno sobrio', 'Pantalon ajustado', 'Detalles blancos', 'Personalizable'] },
  { id: 'p4', name: 'Taza magica con fotografia', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-foto.png', price: 8.5, oldPrice: 10, rating: 4.9, description: 'Taza sensible al calor con fotografia o mensaje especial.', specs: ['Ceramica 11 oz', 'Efecto magico', 'Foto a color', 'Caja opcional'] },
  { id: 'p5', name: 'Taza anime sublimada', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-anime.png', price: 7.99, rating: 4.8, description: 'Taza blanca sublimada con ilustraciones de alta definicion.', specs: ['Ceramica blanca', 'Impresion HD', 'Apta para regalos', 'Diseno envolvente'] },
  { id: 'p16', name: 'Taza pareja personalizada', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-foto.png', price: 9.25, rating: 4.9, description: 'Taza con foto familiar, dedicatoria o collage para fechas especiales.', specs: ['Foto principal', 'Texto personalizado', 'Ceramica premium', 'Vista previa digital'] },
  { id: 'p17', name: 'Taza coleccion anime', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-anime.png', price: 8.25, oldPrice: 9.5, rating: 4.8, description: 'Taza con ilustracion envolvente para personajes, equipos o series favoritas.', specs: ['Impresion envolvente', 'Colores intensos', 'Apta para regalo', 'Diseno a pedido'] },
  { id: 'p22', name: 'Taza pirata anime', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-luffy.png', price: 8.75, rating: 4.9, description: 'Taza blanca con personaje de sombrero de paja y fondo tipo manga en escala de grises.', specs: ['Ceramica 11 oz', 'Diseno anime', 'Fondo estilo manga', 'Sublimacion envolvente'] },
  { id: 'p23', name: 'Tazas dinosaurios personalizadas', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-dinosaurios.png', price: 15.5, oldPrice: 18, rating: 4.8, description: 'Par de tazas con dinosaurios tiernos y espacio para agregar nombres o frases.', specs: ['Set de 2 tazas', 'Texto personalizado', 'Ilustracion infantil', 'Ideal para parejas'] },
  { id: 'p24', name: 'Tazas de carreras personalizadas', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-cars.png', price: 15.99, rating: 4.8, description: 'Duo de tazas con autos de carrera, nombres grandes y detalles deportivos.', specs: ['Set de 2 tazas', 'Nombre incluido', 'Tema de carreras', 'Color de alta definicion'] },
  { id: 'p25', name: 'Taza anime ninja', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-anime-ninja.png', price: 8.99, oldPrice: 10.5, rating: 4.9, description: 'Taza con arte ninja de tonos rojo y negro, perfecta para fans del anime.', specs: ['Ceramica blanca', 'Arte anime premium', 'Colores intensos', 'Tambien disponible en termo'] },
  { id: 'p26', name: 'Tazas duo gato y raton', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-tom-jerry.png', price: 16.25, rating: 4.7, description: 'Set de tazas complementarias con personajes clasicos en colores gris y naranja.', specs: ['Set de 2 tazas', 'Diseno complementario', 'Acabado brillante', 'Regalo divertido'] },
  { id: 'p6', name: 'Termo personalizado', category: 'Tazas Personalizadas', image: 'assets/danizz-termo-personalizado.png', price: 14.75, oldPrice: 18, rating: 4.6, description: 'Termo metalico con diseno, nombre o imagen corporativa para regalo o marca.', specs: ['Termo metalico', 'Alta durabilidad', 'Diseno personalizado', 'Uso corporativo'] },
  { id: 'p18', name: 'Botella deportiva sublimada', category: 'Tazas Personalizadas', image: 'assets/danizz-termo-personalizado.png', price: 13.5, rating: 4.7, description: 'Botella personalizada con logo, nombre o ilustracion para eventos.', specs: ['Acabado brillante', 'Logo corporativo', 'Uso deportivo', 'Pedido por unidad'] },
  { id: 'p19', name: 'Kit termo personalizado', category: 'Tazas Personalizadas', image: 'assets/danizz-termo-personalizado.png', price: 24.99, oldPrice: 30, rating: 4.8, description: 'Set personalizado para marca, activaciones y regalos especiales.', specs: ['Termo personalizado', 'Diseno de marca', 'Empaque opcional', 'Cotizacion por volumen'] },
];

export const FEATURED_PRODUCTS: readonly Product[] = [
  PRODUCTS.find((product) => product.id === 'p1')!,
  PRODUCTS.find((product) => product.id === 'p7')!,
  PRODUCTS.find((product) => product.id === 'p8')!,
  PRODUCTS.find((product) => product.id === 'p2')!,
  PRODUCTS.find((product) => product.id === 'p12')!,
  PRODUCTS.find((product) => product.id === 'p3')!,
  PRODUCTS.find((product) => product.id === 'p4')!,
  PRODUCTS.find((product) => product.id === 'p5')!,
  PRODUCTS.find((product) => product.id === 'p22')!,
] as const;

export function uniqueProductsByImage(products: readonly Product[]): Product[] {
  const images = new Set<string>();

  return products.filter((product) => {
    if (images.has(product.image)) return false;

    images.add(product.image);
    return true;
  });
}

export const PRODUCT_CATEGORIES = ['Todos', ...CATEGORY_LINKS.map((item) => item.category)] as const;
