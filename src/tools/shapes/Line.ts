import Tool from "../Tool";
import { IStyleArg } from "../Tool";

export default class Line extends Tool {
  setStyle(style: IStyleArg) {
    super.setStyle(style);
    if (!style.lineWeight) this.style.lineWeight = 2;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.xs, this.ys);
    ctx.lineTo(this.xf, this.yf);
    if (this.style.lineColor) ctx.strokeStyle = this.style.lineColor;
    ctx.lineWidth = this.style.lineWeight;
    ctx.stroke();
  }
}
