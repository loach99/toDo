declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const value: any;
  export default value;
}
