export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  badge?: 'bestseller' | 'seasonal' | 'new';
}

export const signatureCakes: Product[] = [
  {
    id: 1,
    name: 'Velvet Noir Cake',
    description: 'Dark chocolate layers with salted caramel buttercream and gold leaf',
    price: '$68',
    category: 'Signature Cake',
    image: 'https://images.pexels.com/photos/9271569/pexels-photo-9271569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'bestseller',
  },
  {
    id: 2,
    name: 'Rose Petal Layer Cake',
    description: 'Vanilla sponge with rosewater cream and fresh rose petals',
    price: '$72',
    category: 'Signature Cake',
    image: 'https://images.pexels.com/photos/19221013/pexels-photo-19221013.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    badge: 'new',
  },
  {
    id: 3,
    name: 'Citrus Blossom Torte',
    description: 'Meyer lemon curd, Italian meringue, and candied citrus',
    price: '$58',
    category: 'Signature Cake',
    image: 'https://images.pexels.com/photos/18565655/pexels-photo-18565655.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    badge: 'seasonal',
  },
];

export const pastries: Product[] = [
  {
    id: 4,
    name: 'Butter Croissant',
    description: 'Classic French croissant with 72 hand-folded layers of pure butter',
    price: '$4.50',
    category: 'Pastry',
    image: 'https://images.pexels.com/photos/3850376/pexels-photo-3850376.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'bestseller',
  },
  {
    id: 5,
    name: 'Almond Croissant',
    description: 'Twice-baked with almond frangipane cream and toasted almonds',
    price: '$5.50',
    category: 'Pastry',
    image: 'https://images.pexels.com/photos/30853716/pexels-photo-30853716.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    id: 6,
    name: 'Pain au Chocolat',
    description: 'Flaky pastry rolled with premium Belgian dark chocolate',
    price: '$5.00',
    category: 'Pastry',
    image: 'https://images.pexels.com/photos/31228825/pexels-photo-31228825.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    id: 7,
    name: 'Raspberry Danish',
    description: 'Puff pastry with vanilla custard and fresh raspberries',
    price: '$5.50',
    category: 'Pastry',
    image: 'https://images.pexels.com/photos/29039083/pexels-photo-29039083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'seasonal',
  },
];

export const breads: Product[] = [
  {
    id: 8,
    name: 'Sourdough Boule',
    description: 'Wild-yeast fermented for 48 hours with a deep, tangy crumb',
    price: '$9.00',
    category: 'Artisan Bread',
    image: 'https://images.pexels.com/photos/30767845/pexels-photo-30767845.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'bestseller',
  },
  {
    id: 9,
    name: 'Rustic Country Loaf',
    description: 'Stone-milled wheat flour with a crisp golden crust',
    price: '$8.00',
    category: 'Artisan Bread',
    image: 'https://images.pexels.com/photos/30903776/pexels-photo-30903776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    id: 10,
    name: 'Olive Focaccia',
    description: 'Italian-style flatbread with kalamata olives, rosemary, and sea salt',
    price: '$10.00',
    category: 'Artisan Bread',
    image: 'https://images.pexels.com/photos/3851050/pexels-photo-3851050.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    badge: 'new',
  },
  {
    id: 11,
    name: 'Walnut Rye',
    description: 'Dark rye with toasted walnuts and a hint of honey',
    price: '$9.50',
    category: 'Artisan Bread',
    image: 'https://images.pexels.com/photos/30767541/pexels-photo-30767541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
];

export const desserts: Product[] = [
  {
    id: 12,
    name: 'Cinnamon Pecan Rolls',
    description: 'Soft brioche swirls with brown sugar and cream cheese glaze',
    price: '$6.00',
    category: 'Sweet Treat',
    image: 'https://images.pexels.com/photos/27244307/pexels-photo-27244307.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'bestseller',
  },
  {
    id: 13,
    name: 'Chocolate Ganache Tart',
    description: 'Buttery shortcrust filled with single-origin chocolate ganache',
    price: '$7.50',
    category: 'Sweet Treat',
    image: 'https://images.pexels.com/photos/20586595/pexels-photo-20586595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 14,
    name: 'Berry Muffins',
    description: 'Blackberry and blueberry bursting from a tender vanilla crumb',
    price: '$4.50',
    category: 'Sweet Treat',
    image: 'https://images.pexels.com/photos/17890893/pexels-photo-17890893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'new',
  },
  {
    id: 15,
    name: 'Flaky Fruit Pastries',
    description: 'Seasonal fruit wrapped in golden layers of delicate puff pastry',
    price: '$5.50',
    category: 'Sweet Treat',
    image: 'https://images.pexels.com/photos/29185236/pexels-photo-29185236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'seasonal',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Elena M.',
    role: 'Wedding Client',
    text: 'Crumb & Crust created the most stunning wedding cake we could have imagined. Each tier was a work of art, and the flavors were even more beautiful than the design.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James T.',
    role: 'Regular Customer',
    text: 'Their sourdough is the reason I wake up early on Saturday mornings. The 48-hour ferment creates a flavor that is absolutely unmatched anywhere in the city.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophie R.',
    role: 'Birthday Celebration',
    text: 'Every pastry tastes like it was made just for you. The almond croissants transport me to Paris, and the attention to detail in their custom cakes is extraordinary.',
    rating: 5,
  },
];

export const galleryImages = [
  { url: 'https://images.pexels.com/photos/30667454/pexels-photo-30667454.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', alt: 'Bakery display with fresh pastries' },
  { url: 'https://images.pexels.com/photos/3756050/pexels-photo-3756050.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', alt: 'Baker rolling dough' },
  { url: 'https://images.pexels.com/photos/7525107/pexels-photo-7525107.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', alt: 'Decorating a cake' },
  { url: 'https://images.pexels.com/photos/20002837/pexels-photo-20002837.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', alt: 'Fresh croissants cooling' },
  { url: 'https://images.pexels.com/photos/30667452/pexels-photo-30667452.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', alt: 'Cozy bakery window' },
  { url: 'https://images.pexels.com/photos/7447277/pexels-photo-7447277.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', alt: 'Chef serving pastries' },
  { url: 'https://images.pexels.com/photos/9329433/pexels-photo-9329433.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Sponge cakes on display' },
  { url: 'https://images.pexels.com/photos/34364452/pexels-photo-34364452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'German pastries with icing' },
];
