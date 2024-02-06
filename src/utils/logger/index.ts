export const log = (msg: string) => {
  if (import.meta.env.VITE_DEBUG) console.log(msg);
};

export default log;
