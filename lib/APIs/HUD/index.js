/**
 * Created by Raymond on 2018/8/21.
 * @flow
 * @format
 */
import {NativeModules} from 'react-native'

const {FCRNProgressHUD} = NativeModules

export const HUD = {
	showWithStatus:(status:string='',mask:boolean=false)=>{
		FCRNProgressHUD.showWithStatus(status,mask)
	},
	showProgress:(progress:number=0,status:string='',mask:boolean=false)=>{
		FCRNProgressHUD.showProgress(progress,status,mask)
	},
	dismiss:()=>{
		FCRNProgressHUD.dismiss()
	},
	dismissWithDelay:(delay:number=0)=>{
		FCRNProgressHUD.dismissWithDelay(delay)
	},
	showInfoWithStatus:(status:string='',mask:boolean=false)=>{
		FCRNProgressHUD.showInfoWithStatus(status,mask)
	},
	showSuccessWithStatus:(status:string='',mask:boolean=false)=>{
		FCRNProgressHUD.showSuccessWithStatus(status,mask)
	},
	showErrorWithStatus:(status:string='',mask:boolean=false)=>{
		FCRNProgressHUD.showErrorWithStatus(status,mask)
	},
}