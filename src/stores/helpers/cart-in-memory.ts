import { ProductProps } from '@/utils/data/products';
import { ProductCartProps } from '../cart-store';

export function add(product: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = product.find(({ id }) => id === newProduct.id);

  if (existingProduct) {
    return product.map((product) => product.id === existingProduct.id
    ? { ...product, quantity: product.quantity + 1 }
    : product)
  }

  return [...product, { ...newProduct, quantity: 1 }]
}