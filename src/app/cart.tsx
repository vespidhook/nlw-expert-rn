import { Header } from "@/components/header";
import { useCartStore } from "@/stores/cart-store";
import { ScrollView, Text, View } from "react-native";
import { Product } from "@/components/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";

export default function Cart() {
  const cartStore = useCartStore();

  const total = formatCurrency(cartStore.products.reduce((total, product ) => total + product.price * product.quantity, 0));

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <ScrollView>
        {cartStore.products.length > 0 ? (       
          <View className="p-5 flex-1">
            {
              cartStore.products.map((product) => (
                <Product key={product.id} data={product} />
              ))}
          </View>
        ) : (
          <Text className="font-body text-slate-400 text-center my-8">Seu carrinho esta vazio.</Text>
        )}

        <View className="flex-row gap-2 items-center mt-5 mb-4">
          <Text className="text-white text-xl font-subtitle">Total:</Text>
          <Text className="text-lime-400 text-2xl font-subtitle">{total}</Text>
        </View>

        <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, numero e complemento" />
      </ScrollView>
    </View>
  )
}