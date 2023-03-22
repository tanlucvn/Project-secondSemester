import React from 'react'
import '../CSS/delivery.css'


export default function Delivery() {
  return (
    <div className="container-delivery">
    <div className="card">
      <div className="face face1">
        <div className="content">
        <i className="fas fa-user-tie	"></i>          
          <h3>Register</h3>
        </div>
      </div>
      <div className="face face2">
        <div className="content">
          <p>Click the "Shop Now" button to register an account now to become a member and receive many offers from Men's</p>
          <a href="#" type="button">Read More</a>
        </div>
      </div>
   </div>
   
   <div className="card">
      <div className="face face1">
        <div className="content">
     <i className="fas fa-route"></i>               <h3>Delivery</h3>
        </div>
      </div>
      <div className="face face2">
        <div className="content">
          <p>Fast delivery, shipping to all areas in cooperation with many delivery units</p>
          <a href="#" type="button">Read More</a>
        </div>
      </div>
   </div>
   
   
   <div className="card">
      <div className="face face1">
        <div className="content">
          <i className="	far fa-comments"></i>
           <h3>Comment</h3>
        </div>
      </div>
      <div className="face face2">
        <div className="content">
          <p> Dedicated customer care team always answer questions</p>
          <a href="#" type="button">Read More</a>
        </div>
      </div>
   </div>
   
   
   
   
   
   
 </div>
  )
}
