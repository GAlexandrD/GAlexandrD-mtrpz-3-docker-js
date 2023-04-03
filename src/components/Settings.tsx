import React, { useEffect, useState, MutableRefObject, useRef } from 'react';
import classes from '../styles/Settings.module.scss';
import { useEditor } from './EditorProvider';

function Settings() {
  const {tool} = useEditor();
  const COLOR_NONE = 'RGBA(255,255,255,0)';
  const [lineColor, setLineColor] = useState('#000000');
  const [fillColor, setFillColor] = useState(COLOR_NONE);
  const [isFillEnable, setIsFillEnable] = useState(false);
  const [lineWeight, setLineWeight] = useState('2');
  const fillTextRef = useRef() as MutableRefObject<HTMLSpanElement>;
  useEffect(() => {
    tool.setStyle({ lineColor, fillColor, lineWeight: +lineWeight });
  }, [lineColor, fillColor, lineWeight, tool]);
  useEffect(() => {
    if (fillColor !== COLOR_NONE) {
      setIsFillEnable(true);
      fillTextRef.current.classList.remove(classes.fillColorDisable);
    }
    if (!isFillEnable && fillColor !== COLOR_NONE) {
      fillTextRef.current.classList.add(classes.fillColorDisable);
      setFillColor(COLOR_NONE);
    }
  }, [fillColor]);

  const fillHandler = () => {
    if (!isFillEnable) {
      fillTextRef.current.classList.remove(classes.fillColorDisable);
      setFillColor('#ffffff');
    } else {
      fillTextRef.current.classList.add(classes.fillColorDisable);
      setFillColor(COLOR_NONE);
    }
    setIsFillEnable(!isFillEnable);
  };
  return (
    <div className={classes.settings}>
      <div className={classes.option + ' ' + classes.optionLine}>
        line
        <input
          value={lineColor}
          onChange={(e) => setLineColor(e.target.value)}
          className={classes.colorInput}
          type={'color'}
        />
      </div>
      <div className={classes.option}>
        <span
          ref={fillTextRef}
          onClick={fillHandler}
          className={classes.fillColorDisable}
        >
          fill
        </span>
        <input
          value={fillColor}
          onChange={(e) => setFillColor(e.target.value)}
          className={classes.colorInput}
          type={'color'}
        />
      </div>
      <div className={classes.option}>
        weight
        <input
          value={lineWeight}
          onChange={(e) => setLineWeight(e.target.value)}
          className={classes.lineWeight_input}
          type="number"
        />
      </div>
    </div>
  );
}

export default Settings;
