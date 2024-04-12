export function PriceFormat(amount) {
    const parts = parseFloat(amount).toFixed(2).split(".");
    const decimals = parts[1];
    const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return formattedInteger + "." + decimals ;
}