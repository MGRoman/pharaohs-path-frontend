import { budgets, type Budget } from "@/data/content";
import { useTranslate } from "@/i18n";

export function useBudgetLabel() {
  const { t, formatPrice } = useTranslate();
  return (key: Budget) => {
    const range: { min?: number; max?: number } = budgets[key];
    return t(`budgets.${key}`, {
      min: range.min === undefined ? "" : formatPrice(range.min),
      max: range.max === undefined ? "" : formatPrice(range.max),
    });
  };
}
