import React, { useState } from 'react';
import EditorProvider from './EditorProvider';
import Canvas from './Canvas';
import Settings from './Settings';
import Toolbar from './Toolbar';
import classes from './../styles/App.module.scss';

function PaintApp() {
  return (
    <EditorProvider>
      <div className={classes.App}>
        <Toolbar />
        <Settings />
        <Canvas
          width={1000}
          height={600}
        />
      </div>
    </EditorProvider>
  );
}

export default PaintApp;
