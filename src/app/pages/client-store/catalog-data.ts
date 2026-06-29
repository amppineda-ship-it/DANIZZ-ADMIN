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
  { label: 'Promociones', route: '/categorias/promociones', category: 'Promocionales' },
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
  { id: 'p10', name: 'Uniforme de futbol barrial', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-uniforme-futbol.png', price: 29.99, rating: 4.7, description: 'Kit para equipos barriales con escudo, dorsal y sponsor principal.', specs: ['Camiseta y short', 'Dorsal incluido', 'Escudo del equipo', 'Pedido desde 6 unidades'] },
  { id: 'p11', name: 'Uniforme infantil sublimado', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-uniforme-futbol.png', price: 27.5, rating: 4.8, description: 'Uniforme para academias y escuelas deportivas con tallas infantiles.', specs: ['Tallas infantiles', 'Tela suave', 'Colores a eleccion', 'Ideal academias'] },
  { id: 'p12', name: 'Uniforme premium con patrocinadores', category: 'Uniformes Completos de Futbol', image: 'assets/danizz-camiseta-mundial.png', price: 36.99, oldPrice: 44, rating: 4.9, description: 'Uniforme completo con espacios para logos de sponsors y numeracion.', specs: ['Sublimacion completa', 'Logos incluidos', 'Numeracion por jugador', 'Diseno profesional'] },
  { id: 'p3', name: 'Calentador deportivo personalizado', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador.png', price: 45, rating: 4.7, description: 'Chaqueta y pantalon con diseno de club o marca.', specs: ['Chaqueta con cierre', 'Pantalon deportivo', 'Personalizacion lateral', 'Ideal para clubes'] },
  { id: 'p13', name: 'Calentador blanco de entrenamiento', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador.png', price: 48.5, oldPrice: 55, rating: 4.8, description: 'Conjunto blanco y negro con detalles graficos para entrenamiento o viaje.', specs: ['Chaqueta + pantalon', 'Bolsillos laterales', 'Nombre del equipo', 'Cierre frontal'] },
  { id: 'p14', name: 'Calentador para club deportivo', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador.png', price: 52, rating: 4.9, description: 'Calentador institucional para presentacion de clubes y academias.', specs: ['Colores del club', 'Escudo aplicado', 'Tela comoda', 'Pedido por tallas'] },
  { id: 'p15', name: 'Calentador personalizado juvenil', category: 'Calentadores Personalizados', image: 'assets/danizz-calentador.png', price: 42.75, rating: 4.6, description: 'Conjunto deportivo juvenil con nombre, numero o insignia del equipo.', specs: ['Tallas juveniles', 'Diseno lateral', 'Tela flexible', 'Uso diario'] },
  { id: 'p4', name: 'Taza magica con fotografia', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-foto.png', price: 8.5, oldPrice: 10, rating: 4.9, description: 'Taza sensible al calor con fotografia o mensaje especial.', specs: ['Ceramica 11 oz', 'Efecto magico', 'Foto a color', 'Caja opcional'] },
  { id: 'p5', name: 'Taza anime sublimada', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-anime.png', price: 7.99, rating: 4.8, description: 'Taza blanca sublimada con ilustraciones de alta definicion.', specs: ['Ceramica blanca', 'Impresion HD', 'Apta para regalos', 'Diseno envolvente'] },
  { id: 'p16', name: 'Taza pareja personalizada', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-foto.png', price: 9.25, rating: 4.9, description: 'Taza con foto familiar, dedicatoria o collage para fechas especiales.', specs: ['Foto principal', 'Texto personalizado', 'Ceramica premium', 'Vista previa digital'] },
  { id: 'p17', name: 'Taza coleccion anime', category: 'Tazas Personalizadas', image: 'assets/danizz-taza-anime.png', price: 8.25, oldPrice: 9.5, rating: 4.8, description: 'Taza con ilustracion envolvente para personajes, equipos o series favoritas.', specs: ['Impresion envolvente', 'Colores intensos', 'Apta para regalo', 'Diseno a pedido'] },
  { id: 'p6', name: 'Termo promocional personalizado', category: 'Promocionales', image: 'assets/danizz-termo-personalizado.png', price: 14.75, oldPrice: 18, rating: 4.6, description: 'Termo metalico con diseno, nombre o imagen corporativa.', specs: ['Termo metalico', 'Alta durabilidad', 'Diseno personalizado', 'Uso corporativo'] },
  { id: 'p18', name: 'Botella deportiva sublimada', category: 'Promocionales', image: 'assets/danizz-termo-personalizado.png', price: 13.5, rating: 4.7, description: 'Botella promocional con logo, nombre o ilustracion para eventos.', specs: ['Acabado brillante', 'Logo corporativo', 'Uso deportivo', 'Pedido por unidad'] },
  { id: 'p19', name: 'Kit promocional empresarial', category: 'Promocionales', image: 'assets/danizz-termo-personalizado.png', price: 24.99, oldPrice: 30, rating: 4.8, description: 'Set personalizado para marca, activaciones y regalos corporativos.', specs: ['Termo personalizado', 'Diseno de marca', 'Empaque opcional', 'Cotizacion por volumen'] },
];

export const PRODUCT_CATEGORIES = ['Todos', ...CATEGORY_LINKS.map((item) => item.category)] as const;
