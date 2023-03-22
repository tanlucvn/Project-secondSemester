import React from "react";
import "../CSS/advertisement.css";

export default function Advertisement() {
  return (
    <div>
      <div id='app'>
        <div className='title'>
          <div className='title-inner'>
            <div className='cafe'>
              <div className='cafe-inner'>Sale Up to 50% off</div>
            </div>
            <div className='mozart'>
              <div className='mozart-inner'>from 6/3 to the end of 9/3</div>
            </div>
          </div>
        </div>

        <div className='image silder-h'>
          <img
            src='https://i.pinimg.com/564x/29/3b/c1/293bc1035c33de31f92bbb1ae4047816.jpg'
            alt=''
          />
        </div>
      </div>
    </div>
  );
}
