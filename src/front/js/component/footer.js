import React, { Component } from "react";
import homechefBG from "../../img/homechefBG.jpg"
import dan1 from "../../img/dan1.jpg"
import maiLinh1 from "../../img/maiLinh1.jpg"
import jose1 from "../../img/jose1.jpg"
export const Footer = () => (
	<footer className="border border-dark py-4 text-center brown-bg white-title">
		<p>
			<i className="far fa-copyright"></i> Copyright 2023 - <span className="title-font">HomeChef</span>
		</p>
		<p className="title-font">Created By:</p>
		<div className="container d-flex justify-content-center title-font">
			<div>
				<img className="img-footer me-2" src={`${dan1}`} />
				<p className="card-name">Dan</p>
			</div>
			<div>
				<img className="img-footer me-2" src={`${maiLinh1}`} />
				<p className="card-name">MaiLinh</p>
			</div>
			<div>
				<img className="img-footer" src={`${jose1}`} />
				<p className="card-name">Jose</p>
			</div>
		</div>
	</footer>
);









