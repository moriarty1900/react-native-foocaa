/**
 * Created by Raymond on 2017/8/29.
 * @format
 * @flow
 */

import * as React from "react";
import { View, StyleSheet,TextInput,Text } from "react-native";
import {withBaseListItem} from './base'
import type {BaseItemProps} from './base'

type InputItemProps = {
	extra?:React.Node | string,
	extraTextStyle?:Text.propTypes.style,
  ...TextInput.propTypes,
	inputStyle?:TextInput.propTypes.style,
}

class InputItem extends React.PureComponent<InputItemProps & BaseItemProps> {

  static defaultProps = {
		placeholder:'请输入内容'
  }

  render(){
    const {style,extra,extraTextStyle,inputStyle,...other}=this.props
    return (
      <View style={[styles.container,style]}>
        <TextInput {...other} style={[styles.input,inputStyle]} />
        {typeof(extra) ===  'string' ? <Text style={[styles.extra,extraTextStyle]}>{extra}</Text> : typeof(extra) ===  'function' ? extra() : extra}
      </View>
    )
  }

}

export default withBaseListItem(InputItem)


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white",
    flexDirection:'row',
      alignItems:'center',
  },
  input:{
    height:25,
    flex:1,
  },
  extra:{
    color:'gray',
    marginLeft:5
  }

});