export default function dateFormat(date: string) {
    const dateF = date.split('-');
    return dateF[2] + '-' + dateF[1] + '-' + dateF[0];
}