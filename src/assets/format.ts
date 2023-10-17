export default function dateFormat(date: string) {
    let dateF = date.split('-');
    return dateF[2] + '-' + dateF[1] + '-' + dateF[0];
}