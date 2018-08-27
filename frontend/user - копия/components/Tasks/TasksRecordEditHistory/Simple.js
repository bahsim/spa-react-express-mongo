import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

import General 	from './General';

var Signal = createReactClass({
	componentDidUpdate() {
		if (!this.refs.info.hidden) {
			this.onClick()
		}
	},
	mouseHover(ref,color) {
		if (!this.refs.info.hidden) {return}
		this.refs[ref].style.backgroundColor = color;
	},
	onClick() {
		this.refs.info.hidden = !this.refs.info.hidden;
		if (this.refs.info.hidden) {
			this.refs.block.style.backgroundColor = '#f5f5f5';
			this.refs.fullBlock.style.border = '';
			this.refs.fullBlock.style.borderRadius = '';
			this.refs.fullBlock.style.padding = '';
			this.refs.block.style.margin = '';
		} else {
			this.refs.block.style.backgroundColor = '#d9edf7';
			this.refs.fullBlock.style.border = '1px solid #ccc';
			this.refs.fullBlock.style.borderRadius = '5px';
			this.refs.fullBlock.style.padding = '3px 3px 3px 3px';
			this.refs.block.style.margin = '0px 0px 0px 0px';
		}
	},
	render: function() {
		const styleFieldLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleBlock = {
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'3px 3px 3px 3px',
			cursor: 'pointer',
			marginBottom: '3px'
		}
		const styleTableRowC = {
			fontSize:'18px',
			textAlign:'center'
		}
		const styleTableRowL = {
			fontSize:'18px',
			textAlign:'left'
		}
		return (
			<div ref="fullBlock"
					onMouseEnter={() => this.mouseHover('block','#f5f5f5')}
					onMouseLeave={() => this.mouseHover('block','white')}
			>
				<div className="row" ref="block" style={{padding:'8px',borderTop:'1px solid #ddd',cursor:'pointer'}}
					onClick={() => this.onClick()}
				>
					<div className="col-md-2" style={styleTableRowC}>
						{this.props.record.time}
					</div>
					<div className="col-md-10" style={styleTableRowL}>
						{this.props.record.view}
					</div>
				</div>
				<div ref="info" hidden>
					<br/>
					<General record={this.props.record}/>
					<br/>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	//
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	//
})

export default connect(mapStateToProps, mapDispatchToProps)(Signal);
