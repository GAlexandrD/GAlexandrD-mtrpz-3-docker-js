export interface IStyle {
  fillColor: string;
  lineWeight: number;
  lineColor: string;
}

export interface IStyleArg {
  fillColor?: string;
  lineWeight?: number;
  lineColor?: string;
}

export default abstract class Tool {
  xs: number = 0;
  ys: number = 0;
  yf: number = 0;
  xf: number = 0;
  style: IStyle = { fillColor: '', lineWeight: 2, lineColor: '#000000' };
  abstract draw(ctx: CanvasRenderingContext2D): void;
  setStyle(style: IStyleArg): void {
    if (style.lineColor !== undefined) this.style.lineColor = style.lineColor;
    if (style.lineWeight !== undefined)
      this.style.lineWeight = style.lineWeight;
    if (style.fillColor !== undefined) this.style.fillColor = style.fillColor;
  }
  set(xs: number, ys: number, xf: number, yf: number): void {
    this.xs = xs;
    this.xf = xf;
    this.ys = ys;
    this.yf = yf;
  }
}
