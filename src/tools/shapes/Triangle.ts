import Tool from "../Tool";

export default class Triangle extends Tool {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    if(this.style.lineColor) ctx.strokeStyle = this.style.lineColor;
    if(this.style.fillColor) ctx.fillStyle = this.style.fillColor;
    ctx.lineWidth = this.style.lineWeight;
    ctx.moveTo(this.xs, this.yf);
    ctx.lineTo(this.xs + (this.xf - this.xs)/2, this.ys);
    ctx.lineTo(this.xf, this.yf);
    ctx.lineTo(this.xs, this.yf);
    ctx.lineTo(this.xs + (this.xf - this.xs)/2, this.ys)
    ctx.fill();
    if(this.style.lineWeight){
      ctx.stroke();
    }
  }
}
