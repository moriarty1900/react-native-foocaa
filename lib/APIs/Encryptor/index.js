/**
 * Created by Raymond on 2018/8/21.
 * @flow
 * @format
 */
import {NativeModules} from 'react-native'

const {EncryptModule} = NativeModules

export const Encryptor = {
	encrypt:(text:string='',key:string='')=>{
		return EncryptModule.encrypt(text,key)
	},
	dencrypt:(text:string='',key:string='')=>{
		return EncryptModule.dencrypt(text,key)
	},

}