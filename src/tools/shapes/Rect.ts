import Tool from "../Tool";

export default class Rect extends Tool {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    if(this.style.lineColor) ctx.strokeStyle = this.style.lineColor;
    if(this.style.fillColor) ctx.fillStyle = this.style.fillColor;
    ctx.lineWidth = this.style.lineWeight;
    ctx.fillRect(this.xs, this.ys, this.xf - this.xs, this.yf - this.ys);
    if(this.style.lineWeight){
      ctx.strokeRect(this.xs, this.ys, this.xf - this.xs, this.yf - this.ys);
    }
  }
}
