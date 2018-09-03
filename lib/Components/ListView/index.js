/**
 * Created by Raymond on 2017/6/28.
 * @format
 * @flow
 */

import * as React from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator, ViewPropTypes} from 'react-native'
import Theme from '../../theme'

type ListViewProps = {
	...FlatList.propTypes,
	onLoadMore?:Function,
	loadingMore?:boolean,
	loadMoreText?:string,
	normalText?:string,
	showSeparator?:boolean,
	keyExtractor?:Function,
	style:ViewPropTypes.style,
}

type ListViewState = {
	listHeight:number,
	contentHeight:number
}

export default class ListView extends React.PureComponent<ListViewProps,ListViewState> {

	static defaultProps = {
		normalText:'上拉加载更多',
		loadMoreText:'加载更多.....',
		showSeparator:true,
		keyExtractor:(item:{} | string, index:number) => {
			return 'index' + index
		},
	}

	state = {
		listHeight:0,
		contentHeight:0
	}

	onScrollEndDrag = (e: Object) => {
		const {nativeEvent} = e
		const {contentHeight,listHeight} = this.state
		const {loadingMore} = this.props
		if (listHeight >= contentHeight){
		if (nativeEvent.contentOffset.y >= 30 && loadingMore === false){
				this.props.onLoadMore()
			}
		} else {
			if ((nativeEvent.contentOffset.y >= contentHeight - listHeight + 30)  && loadingMore === false){
				this.props.onLoadMore()
			}
		}
	}

	onContentSizeChange = (contentWidth:number, contentHeight:number) =>{
		this.setState({
			contentHeight
		})
	}

	onListLayout = (e: Object) => {
		this.setState({
			listHeight: e.nativeEvent.layout.height,
		})
	}

  render() {
    const {onLoadMore,keyExtractor,showSeparator,ListFooterComponent,style}=this.props
    let loadMoreProps = {}
    let separator = {}
    if (showSeparator){
      separator = {ItemSeparatorComponent:this.separator}
    }

    if (onLoadMore){
      loadMoreProps = {
      	ListFooterComponent:this.renderLoadMoreFooter,
      }
    }else if(ListFooterComponent){
      loadMoreProps={ListFooterComponent}
    }
    if (onLoadMore){
			return (
				<FlatList
					keyExtractor={keyExtractor}
					{...separator}
					style={[Theme.List.wrap,style]}
					{...this.props}
					{...loadMoreProps}
					onScrollEndDrag={this.onScrollEndDrag}
					onContentSizeChange={this.onContentSizeChange}
					onLayout={this.onListLayout}
				/>
			)
		} else {
			return (
				<FlatList
					keyExtractor={keyExtractor}
					style={[Theme.List.wrap,style]}
					{...separator}
					{...this.props}
					{...loadMoreProps}
				/>
			)
		}

  }

  separator = () => {
    return <View style={{ height: 1, backgroundColor: '#e5e5e5' }} />
  }

  renderLoadMoreFooter = () =>{
    const {loadingMore,loadMoreText,normalText,ListFooterComponent,data}=this.props
    return (
			<View style={{flex:1,flexDirection:'column'}}>
				{ListFooterComponent && ListFooterComponent()}
				{data.length !== 0  && (
					<View style={styles.footer}>
						<ActivityIndicator animating={loadingMore === true} />
						<Text style={loadingMore ? [styles.footerTitle,Theme.List.footer,{marginLeft: 10}] : [styles.footerTitle,Theme.List.footer,{ marginLeft: -10}]}>
							{loadingMore ? loadMoreText : normalText}
						</Text>
					</View>
				)}
			</View>
    )
  }

}

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    height: 40,
  },
	footerTitle:{
		fontSize: 15,
		color: 'gray',
	},
})
