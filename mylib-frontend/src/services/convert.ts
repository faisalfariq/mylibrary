export const formatRupiah = (amount: number | null): string => {
    if(!amount) return '';
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(amount);
};