/**
 * Created by Raymond on 2017/6/28.
 * @format
 * @flow
 */
import * as React from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	SafeAreaView
} from 'react-native'

export const FCPageHolderStatus = {
	loading: 0,
	success: 1,
	empty: 2,
	networkError: 3,
}


type PageHolderProps = {
	title?:string,// 标题
	detail?:string,// 详情
	status:number,// 状态FCPageHolderStatus
	onPress?:Function,// 状态为2、3时点击屏幕的事件
	children:React.Node
}

export default class PageHolder extends React.PureComponent<PageHolderProps> {

	onPress = (event?:Function) => {
		event && event()
	}

	render() {
		let content
		const {status,detail,title,onPress,...other} = this.props
		switch (status) {
			case FCPageHolderStatus.loading:
				content = (
					<View style={styles.subContainer}>
						<ActivityIndicator animating size="large"/>
					</View>
				)
				break
			case FCPageHolderStatus.success:
				content = this.props.children
				break
			case FCPageHolderStatus.empty:
				content = this.renderErrorStatus(detail,title?title:'暂无数据',onPress,require('./images/no_data.png'))
				break
			case FCPageHolderStatus.networkError:
				content = this.renderErrorStatus(detail,title?title:'Wi-Fi和移动数据已断开',onPress,require('./images/no_net.png'))
				break
		}
		return (
			<SafeAreaView style={styles.container} {...other}>
				{content}
			</SafeAreaView>
		)
	}

	renderErrorStatus = (detail:?string,title:?string,onPress?:Function,source:number | {}) =>{
		return (
			<TouchableOpacity
				style={styles.subContainer}
				activeOpacity={1}
				onPress={this.onPress.bind(this,onPress)}
			>
				<Image
					style={styles.image}
					source={source}
				/>
				<Text style={styles.title}>{title}</Text>
				{detail ? <Text style={styles.detail}>{detail}</Text> : null}
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#fff'
	},
	subContainer:{
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: 'black',
		fontSize: 18,
		marginTop: 15,
	},
	detail: {
		color: 'gray',
		fontSize: 15,
		marginTop: 10,
	},
	image:{
		width: 100,
		height: 100
	}
})
