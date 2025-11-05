export interface IApiBrand {
    id: number,
    // По идеи тут должен быть int. Во избежание возможных ошибок оставляем string
    sort: string,
    title: string,
    code: string,
}