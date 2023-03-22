import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import "../CSS/about.css"
function About() {
	return (
		<Container>
			<Row>
				<div className="jumbotron jumbotron-fluid mb-0">
					<Container>
						<h1 className="display-4 pb-0 pb-sm-0 pb-md-0 mb-2 text-center">About Me</h1>
					</Container>
				</div>
			</Row>
			{/* Image of me and a paragraph next to the picture built in Bootstrap */}
			<Row>
				<Col xs={8} sm={6} md={6} lg={3} className="center mx-auto mb-lg-5 mb-m-4 mb-3 container-inner">
				<div className="card-about">
      <div className="circle" >
        <img src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/245625347_594575868553698_8305783887965382870_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=PbEMMCPXRWEAX8ymGVj&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfCCMQHKTOiisKvUklIsHltsfgOxvMsP63chQaTwsa5aWA&oe=640C8C61" alt="duy" className="logo"/>
      </div>
      <div className="content">
        <h4> Junior: ReactJS
        </h4>
        <h4>Tran The Duy</h4>
        
      </div>
      <img src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/328239532_1307641313114862_2564654742004553681_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ohkKmR1tFZMAX99GN7c&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfAxy3QTUnUkaWAfQavGfzUe_EIwX3JDqVfpVhrrx7JhGQ&oe=640CE707" alt="duy" className="product_img"/>
    </div>
				</Col>

				<Col xs={12} sm={6} md={6} className="text-center my-auto" id="about">
					<p>
                    My name is Tran The Duy, and I currently reside in Ho Chi Minh City. I have over 1 years of experience in various types of coding. I am currently enrolled at a coding boot camp at the VTC academy Institute of Technologyto solidify my foundational knowledge of development.
					</p>
					<p>
						I have experience in front-end web development, working with technologies like Bootstrap,
						CSS, HTML, JavaScript, JSON, Node.JS, and various other modern development
						media.
					</p>
				</Col>
			</Row>
		</Container>
	);
}

export default About;