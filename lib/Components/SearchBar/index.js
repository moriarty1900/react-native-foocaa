/**
 * Created by Raymond on 2018/8/31.
 * @format
 * @flow
 */

import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,TextInput,Platform,Image,Keyboard} from 'react-native';
import FCButton from '../Button'

type SearchBarProps = {
	...TextInput.propTypes,
	onClear:Function,
};

type SearchBarState = {
	isFocus:boolean,
}

export default class SearchBar extends PureComponent<SearchBarProps,SearchBarState> {

	static defaultProps = {
		placeholder:'请输入搜索内容',
		clearButtonMode:'never'
	}

	inputRef = React.createRef()

	state = {
		isFocus:false
	}

	_setInputRef = (ref) =>{
		this.inputRef = ref
	}

	_onClear = (onClear) =>{
		const {onChangeText} = this.props
		if (Platform.OS === 'ios') {
			this.inputRef.setNativeProps({ text: ' ' });
		}
		setTimeout(() => {
			this.inputRef.setNativeProps({ text: '' });
		},5)
		Keyboard.dismiss()
		onClear && onClear()
		onChangeText && onChangeText('')
	}

	_onBlur = (e) =>{
		const {onBlur} = this.props
		this.setState({
			isFocus:false
		})
		onBlur && onBlur(e)
	}

	_onFocus = (e) =>{
		const {onFocus} = this.props
		this.setState({
			isFocus:true
		})
		onFocus && onFocus(e)
	}

	render() {
		const {onClear,clearButtonMode,...other} = this.props
		return (
			<View style={styles.container}>
				<TextInput style={styles.input} {...other} clearButtonMode={'never'}  onBlur={this._onBlur} onFocus={this._onFocus} ref={this._setInputRef}/>
				{this._renderSearchIcon()}
				{this._renderClearButton(onClear,clearButtonMode)}
			</View>
		);
	}

	_renderClearButton = (onClear,clearButtonMode) =>{
		const {isFocus} = this.state
		const button = (
			<FCButton onPress={this._onClear.bind(this,onClear)} imageStyle={{resizeMode:'repeat'}} source={require('./resources/delete.png')} style={styles.clearButton}/>
		)
		switch (clearButtonMode) {
			case 'while-editing':
				return isFocus ?  button : null
			case 'unless-editing':
				return !isFocus ?  button : null
			case 'always':
				return button
			default:
				return null
		}
	}

	_renderSearchIcon = () =>{
		return(
			<Image style={styles.icon} source={require('./resources/search.png')}/>
		)
	}

}

const styles = StyleSheet.create({
	container:{
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#e5e5e5',
		padding:5
	},
	input: {
		flex:1,
		backgroundColor:'#fff',
		height:40,
		paddingHorizontal:30,
		fontSize:15
	},
	icon:{
		height:20,
		width:20,
		position:'absolute',
		left:10,
	},
	clearButton:{
		height:20,
		width:20,
		backgroundColor:'transparent',
		borderRadius:10,
		position:'absolute',
		right:10
	}
});
