import { LogoMark } from "./LogoMark";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--cream-50)] py-8 text-[var(--ink-700)]">
      <Container className="flex flex-col items-start justify-between gap-5 border-t border-[var(--cream-200)] pt-7 sm:flex-row sm:items-center">
        <LogoMark className="[&>span:last-child]:text-[var(--ink-900)]" />
        <p className="text-sm">
          © {year} Helio3Tech. Todos os direitos reservados.
        </p>
        <p className="text-sm font-bold text-[var(--leaf-700)]">
          Feito com carinho para cada copo.
        </p>
      </Container>
    </footer>
  );
}
