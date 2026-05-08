const makeRoute = () => {
    const url = '#';
    const fn = (() => url) as any;
    fn.url = Object.assign(() => url, { toString: () => url });
    fn.form = () => ({});
    fn.toString = () => url;
    return fn;
};

export const updateLanguage = makeRoute();
export const index = makeRoute();
export const create = makeRoute();
export const finalize = makeRoute();
export const start = makeRoute();
export const duplicate = makeRoute();
export const edit = makeRoute();
export const show = makeRoute();
export const destroy = makeRoute();
export const apply = makeRoute();

export default new Proxy({}, { 
  get: () => makeRoute() 
});
