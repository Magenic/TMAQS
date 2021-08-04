interface IElement{
    click : () => Promise<IElement>;
    type : (text: string) => Promise<IElement>;
    scrollIntoView : () => Promise<IElement>;
    searchElement : (selector: string) => Promise<IElement>;
}