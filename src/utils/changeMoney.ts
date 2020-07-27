import {divide,format} from 'mathjs'
// 项目的金额都是分，转为元
const changeMoney = (number:number|string)=>{
    const returnNumber:number = Number(format(divide(Number(number),100),14))
    return !isNaN(returnNumber)?returnNumber:''
}
export default changeMoney