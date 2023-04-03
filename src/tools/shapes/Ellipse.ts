import Tool from "../Tool";

export default class Ellipse extends Tool {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    const rx = Math.abs(this.xf - this.xs)/2;
    const ry = Math.abs(this.yf - this.ys)/2;
    const xCenter = this.xs + (this.xf-this.xs)/2;
    const yCenter = this.ys + (this.yf-this.ys)/2;
    ctx.ellipse(xCenter, yCenter, rx, ry, Math.PI, 0, 2*Math.PI);
    if(this.style.lineColor) ctx.strokeStyle = this.style.lineColor;
    if(this.style.fillColor) ctx.fillStyle = this.style.fillColor;
    ctx.lineWidth = this.style.lineWeight;
    ctx.fill();
    if(this.style.lineWeight){
      ctx.stroke();
    }
    }
}
