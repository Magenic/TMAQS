interface IDriver{
   getDriver : () => Promise<IDriver>;
   navigateToUrl : (url: string) => Promise<IDriver>;
   close : () => Promise<IDriver>;
   scrollIntoView : (selector: string) => Promise<IDriver>;
   url : () => Promise<string>;
   sleep : (ms: number) => Promise<IDriver>;
   searchElement : (selector: string) => Promise<IElement>;
}