import React, {
  FC,
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import classes from '../styles/Toolbar.module.scss';
import Brush from '../tools/Brush';
import Ellipse from '../tools/shapes/Ellipse';
import Line from '../tools/shapes/Line';
import Rect from '../tools/shapes/Rect';
import Triangle from '../tools/shapes/Triangle';
import { useEditor } from './EditorProvider';

const Toolbar: FC = () => {
  const { editor, changeTool } = useEditor();
  const [clicked, setClicked] = useState<HTMLDivElement>();
  const brushBtnRef = useRef() as MutableRefObject<HTMLDivElement>;
  const rectBtnRef = useRef() as MutableRefObject<HTMLDivElement>;
  const ellipseBtnRef = useRef() as MutableRefObject<HTMLDivElement>;
  const lineBtnRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triangleBtnRef = useRef() as MutableRefObject<HTMLDivElement>;
  const toolsBtns = [brushBtnRef, rectBtnRef, lineBtnRef, ellipseBtnRef, triangleBtnRef];
  const chooseTool: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    for (const tool of toolsBtns) {
      if (target.parentElement === tool.current) {
        clicked?.classList.remove(classes.toolbar__btn_chosen);
        tool.current.classList.add(classes.toolbar__btn_chosen);
        setClicked(tool.current);
      }
    }
  };
  useEffect(() => {
    setClicked(brushBtnRef.current);
    brushBtnRef.current.classList.add(classes.toolbar__btn_chosen);
  }, []);
  return (
    <div className={classes.toolbar} onClick={chooseTool}>
      <div
        ref={brushBtnRef}
        className={classes.toolbar__btn}
        onClick={() => changeTool(new Brush())}
      >
        <img
         draggable={false}
          className={classes.toolbar__img}
          src="./assets/img/brush.png"
          alt=""
        />
      </div>
      <div
        ref={rectBtnRef}
        className={classes.toolbar__btn}
        onClick={() => changeTool(new Rect())}
      >
        <img
        draggable={false}
          className={classes.toolbar__img}
          src="./assets/img/rect.png"
          alt=""
        />
      </div>
      <div
        ref={ellipseBtnRef}
        className={classes.toolbar__btn}
        onClick={() => changeTool(new Ellipse())}
      >
        <img
         draggable={false}
          className={classes.toolbar__img}
          src="./assets/img/ellipse.png"
          alt=""
        />
      </div>
      <div
        ref={lineBtnRef}
        className={classes.toolbar__btn}
        onClick={() => changeTool(new Line())}
      >
        <img
         draggable={false}
          className={classes.toolbar__img}
          src="./assets/img/line.png"
          alt=""
        />
      </div>
      <div
        ref={triangleBtnRef}
        className={classes.toolbar__btn}
        onClick={() => changeTool(new Triangle())}
      >
        <img
         draggable={false}
          className={classes.toolbar__img}
          src="./assets/img/triangle.png"
          alt=""
        />
      </div>
      <div className={classes.container__do}>
        <div>
          <button
            className={classes.toolbar__btn_do}
            onClick={() => editor.unDo()}
          >
            <span>unDo</span>
          </button>
        </div>
        <div>
          <button
            className={classes.toolbar__btn_do}
            onClick={() => editor.reDo()}
          >
            <span>reDo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
