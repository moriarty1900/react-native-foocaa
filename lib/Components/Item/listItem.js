/**
 * Created by Raymond on 2017/8/29.
 * @format
 * @flow
 */

import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { withBaseListItem} from './base'
import type {BaseProps} from './base'

type Props = {
	extra?:React.Node | string,
	extraTextStyle?:Text.propTypes.style,
}

class ListItem extends React.PureComponent<Props & BaseProps> {

  render(){
    const {extra,style,extraTextStyle}=this.props
    return (
      <View style={[styles.container,style]}>
        {typeof(extra) ===  'string' ? <Text style={[styles.extra,extraTextStyle]}>{extra}</Text> : typeof(extra) ===  'function' ? extra() : extra}
      </View>
    )
  }

}

export default withBaseListItem(ListItem)


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white",
    justifyContent:'center',
    alignItems:'flex-end'
  },
  extra:{
    color:'gray'
  }

});