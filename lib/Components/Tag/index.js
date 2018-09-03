/**
 * Created by Raymond on 2018/8/24.
 * @format
 * @flow
 */

import React, {PureComponent} from 'react';
import {StyleSheet, View,ViewPropTypes,Text} from 'react-native';
import FCButton from '../Button'

type TagProps = {
	select:boolean,
	onSelect?:Function,
	onClose?:Function,
	normalWrapStyle?:ViewPropTypes.style,
	selectWrapStyle?:ViewPropTypes.style,
	normalTextStyle?:Text.propTypes.style,
	selectTextStyle?:Text.propTypes.style,
	children:string
};

export default class Tag extends PureComponent<TagProps> {
	render() {
		const {children,selectWrapStyle,normalWrapStyle,onSelect,select,selectTextStyle,normalTextStyle,onClose} = this.props
		const currentStyle = select ? [styles.selectStyle,selectWrapStyle,styles.buttonStyle] : [styles.normalStyle,normalWrapStyle,styles.buttonStyle]
		const currentTextStyle = select ? [styles.selectTextStyle,selectTextStyle] : [styles.normalTextStyle,normalTextStyle]
		return (
			<View style={styles.container}>
				<FCButton style={currentStyle} textStyle={currentTextStyle} onPress={onSelect} disabled={!onSelect}>{children}</FCButton>
				{onClose && <FCButton imageStyle={styles.deleteImageStyle} onPress={onClose} style={styles.deleteButton} source={require('./resources/delete.png')}/>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding:10,
	},
	buttonStyle:{
		height:30
	},
	selectStyle:{
		backgroundColor:'#4386e5',
		paddingVertical:3
	},
	selectTextStyle:{
		color:'#fff'
	},
	normalStyle:{
		paddingVertical:3,
		backgroundColor:'#fff',
		borderWidth:1,
		borderColor:'#e5e5e5'
	},
	normalTextStyle:{
		color:'gray'
	},
	deleteButton:{
		position:'absolute',
		right:2,
		top:2,
		height:20,
		width:20,
		borderRadius:10,
		backgroundColor:'transparent'
	},
	deleteImageStyle:{
		resizeMode:'repeat'
	}
});
