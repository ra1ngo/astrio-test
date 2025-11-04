export interface IApiBrand {
    id: number,
    sort: string,   // Бэкендеры опять чето напутали, тут должен быть int. Во избежание возможных ошибок оставляем string
    title: string,
    code: string,
}