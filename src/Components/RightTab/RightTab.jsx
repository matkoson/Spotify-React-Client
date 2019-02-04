import React from 'react';

export default function RightTab(props){
	return(
		<div className="right-tab">
			<ul
				onClick={e => props.handleNavClick(e, "right")}
				className="right-tab__right-nav"
			>
				<li className="right-tab__right-nav__element right-tab__right-nav__element--clicked">
					FEATURED
            </li>
				<li className="right-tab__right-nav__element">PODCASTS</li>
				<li className="right-tab__right-nav__element">CHARTS</li>
				<li className="right-tab__right-nav__element">GENRES & MOODS</li>
				<li className="right-tab__right-nav__element">NEW RELEASES</li>
				<li className="right-tab__right-nav__element">DISCOVER</li>
			</ul>
			{props.children}
		</div>
	);
}