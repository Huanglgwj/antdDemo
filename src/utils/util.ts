export function formatDate(val: string | number, fmt: string[] = ['Y', 'M', 'D']): string {
    // 时间戳转换时间
    if (!val) {
        return '';
    }
    const date = new Date(parseInt(val.toString()) * 1000);
    const unit: objectKey = { Y: '-', M: '-', D: ' ', h: ':', m: ':', s: '' };
    const returnData: objectKey = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1,
        D: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
    };
    const backArray = fmt.map((name) => {
        let value: string | number = Number(returnData[name]);
        value = value > 10 ? value : `0${value}`;
        value = value + unit[name];
        return value;
    });
    return backArray.join('');
}
/**
 * setStorage:设置localstorage缓存
 */
export function setStorage(name: string, value: any, time: number = 30): void {
    //获取过期时间的时间戳值和当前的时间戳
    const [days, nowTime] = [parseFloat(time.toString()) * 84000000, new Date().getTime()];
    //expires是过期时间
    localStorage.setItem(
        name,
        JSON.stringify({
            value: value,
            expires: nowTime + days,
        }),
    );
}
// 获取缓存数据
export function getStorage(name: string): any {
    let storageString = localStorage.getItem(name);
    //如果未设置该缓存或没有值，直接返回空串
    if (storageString == null || storageString.length <= 0) {
        return '';
    }
    try {
        // 把缓存字符串转为对象、获取当前时间
        let [storageObj, nowTime] = [JSON.parse(storageString), new Date().getTime()];
        // 如果缓存对象不存在或为空，或者对象设置了时间值并且时间值小于当前时间(即已过期)，此时清除缓存
        if (!storageObj || (storageObj.expires != undefined && storageObj.expires < nowTime)) {
            cleanStorage(name);
            return null;
        } else {
            // 如果有值且时间未过期，则返回值，如果没有value则没有设置过期时间，此时不是对象，直接返回缓存字符串
            if (storageObj.value === undefined) {
                return storageString;
            } else {
                return storageObj.value;
            }
        }
    } catch (error) {
        return storageString;
    }
}
// 清除缓存
export function cleanStorage(name: string): void {
    localStorage.removeItem(name);
}
/** setSessionStorage:设置缓存
 * @param {String} name：设置的名字
 * @param {*} value：设置的值
 * */
export function setSessionStorage(name: string, value: any): void {
    value = typeof value === 'string' ? value : JSON.stringify(value);
    sessionStorage.setItem(name, value);
}
/** getSessionStorage:获取缓存
 * @param {String} name：设置的名字
 * @return 返回session值
 * */
export function getSessionStorage(name: string): any {
    let value = sessionStorage.getItem(name) || '';
    try {
        value = JSON.parse(value);
    } catch (error) {}
    return value;
}
/**
 * cleanStorage:清除缓存
 * @param name：清除的名字
 * */
export function cleanSessionStorage(name: string): void {
    sessionStorage.removeItem(name);
}
// 复制
export function copyText(txt: string, success = function () {}) {
    if (document.getElementById('copy-text')) {
        return document.getElementById('copy-text');
    }
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', txt);
    input.setAttribute('id', 'copy-text');
    input.setAttribute('style', 'position:absolute;left:9000px;');
    document.body.appendChild(input);
    let copyHtml: any = document.getElementById('copy-text');
    copyHtml.select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    success();
}
// 加
export function floatAdd(arg1: any, arg2: any) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

// 减
export function floatSub(arg1: any, arg2: any) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    // 动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 乘
export function floatMul(arg1: any, arg2: any) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split('.')[1].length;
    } catch (e) {}
    try {
        m += s2.split('.')[1].length;
    } catch (e) {}
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}

// 除
export function floatDiv(arg1: any, arg2: any) {
    var t1 = 0,
        t2 = 0,
        r1,
        r2;
    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) {}
    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) {}

    r1 = Number(arg1.toString().replace('.', ''));

    r2 = Number(arg2.toString().replace('.', ''));
    const subNum: number = Number(floatSub(t2, t1));
    return (r1 / r2) * Math.pow(10, subNum);
}
// 系统的金额都是分，转为元
export function changeMenyUnit(number: string | number) {
    return floatDiv(number, 100);
}
// 防抖
export class Debounced {
    /**
     * @param func 需要包装的函数
     * @param delay 延迟时间，单位ms
     */
    public use = (func: Function, delay: number = 500): Function => {
        let timer: any = null;
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };
}
// 节流
export class Throttle {
    private timer: number | undefined;
    private stop: boolean = false;
    private death: boolean = false;
    /**
     * @param func 需要包装的函数
     * @param delay 延迟时间，单位ms
     * @param immediate 是否默认执行一次(第一次不延迟)
     */
    public use(func: Function, delay: number = 500, immediate: boolean = false): Function {
        let flag = true;
        const self: any = this;
        return (...args: any) => {
            if (this.death) {
                func.apply(this, args);
                return;
            }
            if (this.stop) {
                func.apply(this, args);
                return;
            }
            if (immediate) {
                func.apply(this, args);
                immediate = false;
                return;
            }
            if (!flag) {
                return;
            }
            flag = false;
            self.timer = setTimeout(() => {
                func.apply(this, args);
                flag = true;
            }, delay);
        };
    }

    // 销毁
    public destroy() {
        this.death = true;
        this.stop = true;
        if (!!this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    }
    // 开启
    public open() {
        if (!this.death) {
            this.stop = false;
        }
    }
    // 关闭
    public close() {
        this.stop = true;
    }
}
