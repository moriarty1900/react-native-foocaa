/**
 * Created by fookii on 17/5/31.
 */

import React,{PureComponent} from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, FlatList,ActivityIndicator,Platform} from 'react-native'

export default class FCListView extends PureComponent {

  constructor(props){
    super(props)
		this.state = {
			listHeight:0,
			contentHeight:0
		}
  }

	onScrollEndDrag = ({nativeEvent}) => {
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

	onContentSizeChange = (contentWidth, contentHeight) =>{
    this.setState({
			contentHeight
    })
  }

	onListLayout = e => {
		this.setState({
			listHeight: e.nativeEvent.layout.height,
		})
	}

  render() {
    const {onLoadMore,keyExtractor,showSeparator,imageCacheProviderProps,ListFooterComponent,data}=this.props
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
    const {loadingMore,loadMoreText,normalText,ListFooterComponent,pageSize,data}=this.props
    return (
			<View style={{flex:1,flexDirection:'column'}}>
				{ListFooterComponent && ListFooterComponent()}
				{data.length !== 0  && (
					<View style={styles.footer}>
						<ActivityIndicator animating={loadingMore === true} />
						<Text
							style={
								loadingMore ? styles.footerTitleLoading : styles.footerTitleNormal
							}
						>
							{loadingMore ? loadMoreText : normalText}
						</Text>
					</View>
				)}
			</View>
    )
  }

}

FCListView.propTypes = {
  onLoadMore:PropTypes.func,
  loadingMore:PropTypes.bool,
  loadMoreText:PropTypes.string,
  normalText:PropTypes.string,
  showSeparator:PropTypes.bool,
  pageSize:PropTypes.number,
  imageCacheProviderProps:PropTypes.object
}

FCListView.defaultProps = {
  normalText:'上拉加载更多',
  loadMoreText:'加载更多.....',
  showSeparator:true,
  pageSize:20,
  keyExtractor:(item, index) => {
    return 'index' + index + item
  },
  imageCacheProviderProps:{
    ttl:60,
    numberOfConcurrentPreloads:0,
  }
}

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    height: 40,
  },
  footerTitleLoading: {
    marginLeft: 10,
    fontSize: 15,
    color: 'gray',
  },
  footerTitleNormal: {
    fontSize: 15,
    color: 'gray',
    marginLeft: -10,
  },
})
