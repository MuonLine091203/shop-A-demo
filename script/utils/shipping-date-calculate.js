import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'


export function DateCalculate(option) {
  const today = dayjs();
  const deliveryDate = today.add(option, 'days');
  const deliveryHTML = deliveryDate.format('dddd, MMMM D');
  return deliveryHTML
}