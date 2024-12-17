export const currencyFormatter = (value: string) => {
    const valor = Number(value)
    const formatter = new Intl.NumberFormat('es-GT', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency: 'GTQ'
    })
    return formatter.format(valor)
  }

  export const dateFormatter = (fecha: Date) => {
    const date = new Date(fecha);
    const formattedDateTime = date.toLocaleString('es-GT', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });


    return formattedDateTime;

  }
  export const dateToString = (fecha: Date) => {

    const isoString = fecha.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;


  }
