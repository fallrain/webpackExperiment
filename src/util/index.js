export default {
  getUrlVal(name) {
    /* 获取url参数 */
    const urlArgs = window.location.href;
    if (urlArgs) {
      const reg = new RegExp(`${name}=([^&]+)`);
      const results = urlArgs.match(reg);
      if (results) {
        return results[1];
      }
    }
  },
};
