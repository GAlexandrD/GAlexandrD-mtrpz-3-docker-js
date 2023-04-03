import Tool from './Tool';
import { IStyleArg } from './Tool';



export default class Brush extends Tool {
  setStyle(style: IStyleArg): void {
    super.setStyle(style);
    if (!style.lineWeight) this.style.lineWeight = 2;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineTo(this.xf, this.yf);
    ctx.lineWidth = this.style.lineWeight;
    if (this.style.lineColor) ctx.strokeStyle = this.style.lineColor;
    ctx.stroke();
  }
}
