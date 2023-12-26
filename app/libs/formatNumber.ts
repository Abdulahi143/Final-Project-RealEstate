// utils/formatNumber.ts
export function formatNumberWithSpaces(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  