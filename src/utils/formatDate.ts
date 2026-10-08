export const formatDate = (fecha: Date) => {
    return new Intl.DateTimeFormat("es-MX", {
        dateStyle: "full"
    }).format(fecha);
};