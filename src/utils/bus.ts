class Bus {
  list: { [key: string]: Array<Function> };
  constructor() {
    this.list = {}
  }
  // 订阅
  $on(name: string, fn: Function) {
    this.list[name] = this.list[name] || [];
    this.list[name].push(fn)

  }
  // 发布
  $emit(name: string, data?: any) {
    if (this.list[name]) {
      this.list[name].forEach((fn: Function) => {
        fn(data);
      });
    }
  }
  // 取消
  $off(name: string) {
    if (this.list[name]) {
      delete this.list[name];
    }
  }
}

export default new Bus()