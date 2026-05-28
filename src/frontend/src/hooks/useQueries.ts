import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type Product = {
  id: string;
  name: string;
  description: string;
  images: Array<{ getDirectURL(): string }>;
  price: bigint;
  currency: string;
  specifications: Array<[string, string]>;
  isAvailable: boolean;
};

export type ShoppingItem = {
  currency: string;
  productName: string;
  productDescription: string;
  priceInCents: bigint;
  quantity: bigint;
};

// Products Query
export function useGetProducts() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

// Stripe Configuration Check
export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<boolean>({
    queryKey: ["stripeConfigured"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isStripeConfigured();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

// Checkout Session Creation (for future e-commerce)
export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl,
    }: {
      items: ShoppingItem[];
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.createCheckoutSession(
        items,
        successUrl,
        cancelUrl,
      );
      return JSON.parse(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

// Contact Form Submission
export function useSubmitContactForm() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({
      email,
      message,
    }: { email: string; message: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContactForm(email, message);
    },
  });
}
