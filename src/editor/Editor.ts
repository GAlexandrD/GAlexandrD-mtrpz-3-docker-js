import Brush from '../tools/Brush';
import Rect from '../tools/shapes/Rect';
import Tool from '../tools/Tool';

interface ICoords {
  xs: number;
  ys: number;
  xf: number;
  yf: number;
}

export default class Editor {
  private xs: number = 0;
  private xf: number = 0;
  private ys: number = 0;
  private yf: number = 0;
  private currentImage: HTMLImageElement = new Image();
  private unDoList: string[] = [];
  private reDoList: string[] = [];
  currentTool: Tool = new Brush();
  isDrawing: boolean = false;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  chooseTool(tool: Tool) {
    this.currentTool = tool;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    canvas.addEventListener('mousedown', this.onMouseDown);
    canvas.addEventListener('mousemove', this.onMouseMove);
    canvas.addEventListener('mouseup', this.onMouseUp);
    this.currentImage.src = canvas.toDataURL();
  }

  redrawCanvas() {
    if (!this.currentImage.src) return;
    if (!this.canvas) return;
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx?.drawImage(this.currentImage, 0, 0);
  }

  onMouseDown(e: MouseEvent) {
    if (!this.canvas) return;
    if (!this.currentTool) return;
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = true;
    this.ctx?.beginPath();
    const target: any = e.target;
    const [x, y] = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop];
    this.xs = x;
    this.ys = y;
  }
  onMouseMove(e: MouseEvent) {
    if (!this.canvas) return;
    if (!this.ctx) return;
    if (!this.isDrawing) return;
    const target: any = e.target;
    const [x, y] = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop];
    this.xf = x;
    this.yf = y;
    this.draw();
  }

  onMouseUp(e: MouseEvent) {
    if (!this.canvas) return;
    this.isDrawing = false;
    this.unDoList.push(this.currentImage.src);
    this.reDoList = [];
    const img = this.canvas.toDataURL();
    this.currentImage.src = img;
  }

  draw(tool?: Tool, coords?: ICoords) {
    if (!this.canvas) return;
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.restoreImage();
    if (tool && coords) {
      tool.set(coords.xs, coords.ys, coords.xf, coords.yf);
      tool.draw(this.ctx as CanvasRenderingContext2D);
    } else {
      this.currentTool.set(this.xs, this.ys, this.xf, this.yf);
      this.currentTool.draw(this.ctx as CanvasRenderingContext2D);
    }
  }

  restoreImage() {
    if (!this.canvas) return;
    const [height, width] = [this.canvas.height, this.canvas.width];
    this.ctx?.drawImage(this.currentImage, 0, 0, width, height);
  }

  reDo() {
    if (!this.canvas) return;
    const imgSrc = this.reDoList.pop();
    if (!imgSrc) return;
    this.currentImage.src = imgSrc;
    this.unDoList.push(this.canvas.toDataURL());
    this.currentImage.onload = () => {
      if (!this.canvas) return;
      const ctx = this.canvas.getContext('2d');
      const [height, width] = [this.canvas.height, this.canvas.width];
      ctx?.clearRect(0, 0, width, height);
      ctx?.drawImage(this.currentImage, 0, 0, width, height);
    };
  }

  unDo() {
    if (!this.canvas) return;
    const imgSrc = this.unDoList.pop();
    if (!imgSrc) return;
    this.currentImage.src = imgSrc;
    this.reDoList.push(this.canvas.toDataURL());
    this.currentImage.onload = () => {
      if (!this.canvas) return;
      const ctx = this.canvas.getContext('2d');
      const [height, width] = [this.canvas.height, this.canvas.width];
      ctx?.clearRect(0, 0, width, height);
      ctx?.drawImage(this.currentImage, 0, 0, width, height);
    };
  }
}
