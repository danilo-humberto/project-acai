import gsap from "gsap";
import {
  ClipboardList,
  CreditCard,
  Heart,
  LockKeyhole,
  MapPin,
  Phone,
  ShoppingBasket,
  Snowflake,
  User,
} from "lucide-react";
import { useEffect, useRef } from "react";
import {
  paymentMethods,
  SHOW_CASH_CHANGE_DETAILS,
} from "../../data/paymentMethods";
import type { OrderBuilder } from "../../hooks/useOrderBuilder";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatOrderPortions } from "../../utils/orderDisplay";
import { FinalizeOrderButton } from "./FinalizeOrderButton";

type OrderSummaryProps = {
  builder: OrderBuilder;
};

export function OrderSummary({ builder }: OrderSummaryProps) {
  const {
    order,
    selectedSize,
    selectedOrderType,
    selectedIceCreamFlavors,
    shouldChooseIceCreamFlavor,
    selectedFruits,
    selectedToppings,
    selectedSyrup,
    total,
    extraPortionsTotal,
    validation,
    isFinalizing,
    finalizeError,
    finalizeOrder,
  } = builder;
  const selectedPayment = paymentMethods.find(
    (payment) => payment.id === order.payment.method,
  );
  const summaryBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !summaryBodyRef.current) {
      return;
    }

    gsap.fromTo(
      summaryBodyRef.current,
      { y: 4 },
      { y: 0, duration: 0.24, ease: "power3.out" },
    );
  }, [
    total,
    order.sizeId,
    order.orderTypeId,
    order.iceCreamFlavorIds,
    order.payment.method,
    order.payment.needsChange,
    selectedFruits.length,
    selectedToppings.length,
    order.fruitSelections,
    order.toppingSelections,
    order.syrupSelection,
    selectedSyrup.id,
  ]);

  return (
    <aside
      data-summary
      className="hidden min-w-0 rounded-3xl bg-[var(--cream-50)] text-[var(--ink-900)] panel-shadow lg:block lg:self-start"
    >
      <div className="rounded-t-3xl bg-[linear-gradient(135deg,var(--plum-800),var(--berry-600))] px-5 py-4 text-[var(--cream-50)]">
        <div className="flex items-center gap-3">
          <ShoppingBasket size={22} />
          <h3 className="font-display text-2xl font-extrabold">Seu pedido</h3>
        </div>
      </div>

      <div ref={summaryBodyRef} className="space-y-4 p-4 sm:p-5">
        <SummaryLine
          label="Tamanho"
          value={selectedSize?.name ?? "Não selecionado"}
          price={selectedSize?.price}
          icon={<ClipboardList size={18} />}
        />
        <SummaryLine
          label="Tipo do pedido"
          value={selectedOrderType?.name ?? "Não selecionado"}
          icon={<ShoppingBasket size={18} />}
        />
        {shouldChooseIceCreamFlavor && (
          <SummaryLine
            label={
              selectedIceCreamFlavors.length > 1
                ? "Sabores do creme"
                : "Sabor do creme"
            }
            value={
              selectedIceCreamFlavors.map((flavor) => flavor.name).join(", ") ||
              "Não selecionado"
            }
            icon={<Snowflake size={18} />}
          />
        )}
        <SummaryLine
          label="Frutas"
          value={formatOrderPortions(selectedFruits, "Sem frutas")}
          icon={<Heart size={18} />}
        />
        <SummaryLine
          label="Guloseimas"
          value={formatOrderPortions(selectedToppings, "Sem guloseimas")}
          icon={<ShoppingBasket size={18} />}
        />
        <SummaryLine
          label="Calda"
          value={
            selectedSyrup.quantity > 0
              ? formatOrderPortions([selectedSyrup])
              : selectedSyrup.name
          }
          icon={<Heart size={18} />}
        />
        {extraPortionsTotal > 0 && (
          <SummaryLine
            label="Porções adicionais"
            value="R$ 0,50 por porção extra"
            price={extraPortionsTotal}
            icon={<ShoppingBasket size={18} />}
          />
        )}
        <SummaryLine
          label="Nome"
          value={order.customer.name.trim() || "Não informado"}
          icon={<User size={18} />}
        />
        <SummaryLine
          label="Telefone"
          value={order.customer.phone.trim() || "Não informado"}
          icon={<Phone size={18} />}
        />
        <SummaryLine
          label="Pagamento"
          value={selectedPayment?.name ?? "Não selecionado"}
          icon={<CreditCard size={18} />}
        />
        <SummaryLine
          label="Modalidade"
          value="Retirada no local"
          icon={<MapPin size={18} />}
        />
        {SHOW_CASH_CHANGE_DETAILS && order.payment.method === "cash" && (
          <SummaryLine
            label="Troco"
            value={
              order.payment.needsChange
                ? order.payment.changeFor || "Valor não informado"
                : "Não precisa"
            }
            icon={<CreditCard size={18} />}
          />
        )}

        <div className="rounded-2xl bg-[var(--cream-100)] p-4">
          <p className="text-sm font-extrabold">Observação</p>
          <p className="mt-1 text-sm leading-5 text-[var(--ink-700)]">
            {order.observation.trim() || "Sem observação."}
          </p>
        </div>

        {validation.isValid ? (
          <div className="rounded-2xl bg-[oklch(72%_0.14_126_/_12%)] p-4 text-sm font-bold leading-6 text-[var(--leaf-700)]">
            Pedido pronto para finalizar no site.
          </div>
        ) : (
          <div className="rounded-2xl bg-[var(--cream-100)] p-4">
            <p className="text-sm font-extrabold text-[var(--berry-600)]">
              Faltam dados obrigatórios
            </p>
            <p className="mt-1 text-sm leading-5 text-[var(--ink-700)]">
              {validation.errors[0]}
            </p>
          </div>
        )}

        <div className="summary-total flex items-center justify-between border-t border-[var(--cream-200)] pt-4">
          <span className="font-extrabold">Total estimado</span>
          <strong className="font-display text-3xl text-[var(--leaf-700)]">
            {formatCurrency(total)}
          </strong>
        </div>

        <FinalizeOrderButton
          validation={validation}
          isFinalizing={isFinalizing}
          finalizeError={finalizeError}
          onFinalize={finalizeOrder}
        />

        <div className="flex items-start gap-2 text-xs leading-5 text-[var(--ink-500)]">
          <LockKeyhole className="mt-0.5 shrink-0" size={14} />
          <span>
            Após finalizar, você receberá um código para acompanhar seu pedido.
          </span>
        </div>
      </div>
    </aside>
  );
}

type SummaryLineProps = {
  label: string;
  value: string;
  price?: number;
  icon: React.ReactNode;
};

function SummaryLine({ label, value, price, icon }: SummaryLineProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 text-[var(--plum-800)]">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold">{label}</p>
        <p className="break-words text-sm leading-5 text-[var(--ink-500)]">
          {value}
        </p>
      </div>
      {price !== undefined && (
        <span className="text-sm font-bold text-[var(--ink-700)]">
          {formatCurrency(price)}
        </span>
      )}
    </div>
  );
}
