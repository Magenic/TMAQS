interface IDriver{
   getDriver : () => Promise<IDriver>;
   navigateToUrl : (url: string) => Promise<IDriver>;
   close : () => Promise<void>;
   scrollIntoView : (selector: string) => Promise<IDriver>;
   url : () => Promise<string>;
   waitForTimeout : (ms: number) => Promise<void>;
}